/* eslint-disable @typescript-eslint/no-explicit-any */
const API_KEY = "AIzaSyDSS1tC9xS_uX2nw-kBqqpuRIYnHkj7y1A";

export interface PlaceResult {
  id: string;
  name: string;
  rating: number;
  userRatingsTotal: number;
  photoUrl: string | null;
  openNow: boolean | null;
  openingHours: string[];
  address: string;
  phoneNumber: string | null;
  website: string | null;
  placeId: string;
}

let mapDiv: HTMLDivElement | null = null;
let service: any = null;
let mapsLoaded = false;
let loadingPromise: Promise<void> | null = null;

function loadGoogleMapsScript(): Promise<void> {
  if (mapsLoaded) return Promise.resolve();
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    if ((window as any).google?.maps?.places) {
      mapsLoaded = true;
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      mapsLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });

  return loadingPromise;
}

function getService(): any {
  if (service) return service;
  if (!mapDiv) {
    mapDiv = document.createElement("div");
    mapDiv.style.display = "none";
    document.body.appendChild(mapDiv);
  }
  const g = (window as any).google;
  service = new g.maps.places.PlacesService(mapDiv);
  return service;
}

// Get place details including phone and website
async function getPlaceDetails(placeId: string): Promise<{ phoneNumber: string | null; website: string | null }> {
  const svc = getService();
  const g = (window as any).google;

  return new Promise((resolve) => {
    const request = {
      placeId,
      fields: ['formatted_phone_number', 'website', 'opening_hours', 'rating', 'user_ratings_total'],
    };

    svc.getDetails(request, (place: any, status: string) => {
      if (status === g.maps.places.PlacesServiceStatus.OK) {
        resolve({
          phoneNumber: place.formatted_phone_number || null,
          website: place.website || null,
        });
      } else {
        resolve({ phoneNumber: null, website: null });
      }
    });
  });
}

export async function searchPlaces(query: string, maxResults = 16): Promise<PlaceResult[]> {
  await loadGoogleMapsScript();
  const svc = getService();
  const g = (window as any).google;

  return new Promise((resolve, reject) => {
    svc.textSearch({ query }, async (results: any[], status: string) => {
      if (status !== g.maps.places.PlacesServiceStatus.OK || !results) {
        if (status === g.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          resolve([]);
          return;
        }
        reject(new Error(`Places API error: ${status}`));
        return;
      }

      // Process each place and get additional details
      const places: PlaceResult[] = [];
      for (const place of results.slice(0, maxResults)) {
        let photoUrl: string | null = null;
        if (place.photos && place.photos.length > 0) {
          photoUrl = place.photos[0].getUrl({ maxWidth: 400, maxHeight: 300 });
        }

        // Get additional details (phone, website)
        let phoneNumber: string | null = null;
        let website: string | null = null;

        if (place.place_id) {
          try {
            const details = await getPlaceDetails(place.place_id);
            phoneNumber = details.phoneNumber;
            website = details.website;
          } catch {
            // Keep null if details fail
          }
        }

        places.push({
          id: place.place_id || Math.random().toString(36),
          name: place.name || "Unknown",
          rating: place.rating || 0,
          userRatingsTotal: place.user_ratings_total || 0,
          photoUrl,
          openNow: place.opening_hours?.isOpen?.() ?? null,
          openingHours: place.opening_hours?.weekday_text || [],
          address: place.formatted_address || "",
          phoneNumber,
          website,
          placeId: place.place_id || "",
        });
      }

      resolve(places);
    });
  });
}
