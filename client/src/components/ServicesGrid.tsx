import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { searchPlaces, type PlaceResult } from "@/lib/googlePlaces";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Clock, MapPin, X, Phone, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceQuery = searchParams.get("service");
  const serviceLabel = searchParams.get("label");
  
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch places when service query changes
  useEffect(() => {
    if (!serviceQuery) {
      setPlaces([]);
      setVisibleCount(0);
      return;
    }

    const fetchPlaces = async () => {
      setLoading(true);
      setError(null);
      setPlaces([]);
      setVisibleCount(0);

      try {
        const results = await searchPlaces(serviceQuery, 16);
        setPlaces(results);
        
        // Start revealing cards one by one after data loads
        if (results.length > 0) {
          setLoadingMore(true);
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setVisibleCount(count);
            if (count >= results.length) {
              clearInterval(interval);
              setLoadingMore(false);
            }
          }, 150); // 150ms delay between each card
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [serviceQuery]);

  // Generate skeleton cards for loading state
  const renderSkeletonCards = () => {
    return Array.from({ length: 16 }).map((_, index) => (
      <Card key={`skeleton-${index}`} className="overflow-hidden">
        <Skeleton className="h-40 w-full" />
        <CardContent className="p-4 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </CardContent>
      </Card>
    ));
  };

  // Format phone number for display
  const formatPhoneNumber = (phone: string | null): string => {
    if (!phone) return "";
    return phone;
  };

  // Render a single place card
  const renderPlaceCard = (place: PlaceResult, index: number) => {
    return (
      <motion.div
        key={place.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.05,
          ease: "easeOut" 
        }}
        className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer group"
      >
        <Card className="h-full">
        {/* Photo */}
        <div className="relative h-40 overflow-hidden bg-muted">
          {place.photoUrl ? (
            <img
              src={place.photoUrl}
              alt={place.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <MapPin className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          
          {/* Open/Closed Badge */}
          {place.openNow !== null && (
            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
              place.openNow 
                ? 'bg-green-500/90 text-white' 
                : 'bg-red-500/90 text-white'
            }`}>
              {place.openNow ? 'Open' : 'Closed'}
            </div>
          )}

          {/* Rating Badge */}
          {place.rating > 0 && (
            <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium bg-black/70 text-white flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {place.rating.toFixed(1)}
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Name */}
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {place.name}
          </h3>

          {/* Address */}
          <p className="text-xs text-muted-foreground line-clamp-2">
            {place.address}
          </p>

          {/* Contact Details */}
          <div className="space-y-1 pt-1">
            {/* Phone Number */}
            {place.phoneNumber && (
              <a 
                href={`tel:${place.phoneNumber}`}
                className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="w-3 h-3" />
                <span className="line-clamp-1">{formatPhoneNumber(place.phoneNumber)}</span>
              </a>
            )}

            {/* Website */}
            {place.website && (
              <a 
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="w-3 h-3" />
                <span className="line-clamp-1 flex items-center gap-1">
                  Visit Website
                  <ExternalLink className="w-2 h-2" />
                </span>
              </a>
            )}
          </div>

          {/* Rating and Hours */}
          <div className="flex items-center justify-between pt-2 border-t">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{place.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({place.userRatingsTotal})</span>
            </div>

            {/* Opening Hours */}
            {place.openingHours.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span className="hidden sm:inline">
                  {place.openNow !== null ? (place.openNow ? 'Open now' : 'Closed') : 'Check hours'}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </motion.div>
    );
  };

  // Close the services view
  const handleClose = () => {
    setSearchParams({});
  };

  // Don't render anything if no service is selected
  if (!serviceQuery) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {serviceLabel ? decodeURIComponent(serviceLabel) : 'Services'}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {loading 
                ? 'Searching for services...' 
                : `${places.length} top-rated services found`}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleClose}
            className="rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Loading State with Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderSkeletonCards()}
          </div>
        )}

        {/* Services Grid - 4 columns */}
        {!loading && !error && places.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {places.map((place, index) => renderPlaceCard(place, index))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && places.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No services found</h2>
            <p className="text-muted-foreground">
              We couldn't find any services matching "{decodeURIComponent(serviceQuery)}" in your area.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesGrid;
