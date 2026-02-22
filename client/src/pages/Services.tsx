import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Clock, MapPin, ArrowLeft, Menu, Home, Car, Heart, Sparkles, CalendarDays, Banknote, AlertTriangle, Phone, Globe, ExternalLink, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceCategories, type ServiceItem } from "@/components/sidebar/SidebarData";
import SidebarWithCategories from "@/components/sidebar/SidebarWithCategories";
import type { Tables } from "@/integrations/supabase/types";
import { generateMockProviders, type MockServiceProvider } from "@/lib/mockServiceData";
import BookingDialog from "@/components/BookingDialog";
import type { PlaceResult } from "@/lib/googlePlaces";

// Type for service provider from Supabase
type ServiceProvider = Tables<"service_providers">;

// Simple icon set - clean icons
const categoryIcons = [
  { Icon: Home, label: "Home Services" },
  { Icon: Car, label: "Vehicle Services" },
  { Icon: Heart, label: "Health Services" },
  { Icon: Sparkles, label: "Spa & Wellness" },
  { Icon: CalendarDays, label: "Appointments" },
  { Icon: Banknote, label: "Finance Services" },
  { Icon: AlertTriangle, label: "Travel & Emergency" },
];

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceQuery = searchParams.get("service");
  const serviceLabel = searchParams.get("label");
  const catIndex = searchParams.get("cat");
  
  const [providers, setProviders] = useState<MockServiceProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [iconIndex, setIconIndex] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<MockServiceProvider | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [clickedCardId, setClickedCardId] = useState<string | null>(null);

  // Get category name from index
  const getCategoryName = () => {
    if (catIndex) {
      const index = parseInt(catIndex);
      if (!isNaN(index) && serviceCategories[index]) {
        return serviceCategories[index].title;
      }
    }
    return "Services";
  };

  // Simple icon cycling
  useEffect(() => {
    if (!serviceQuery) {
      const interval = setInterval(() => {
        setIconIndex((prev) => (prev + 1) % categoryIcons.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [serviceQuery]);

  const handleSelectItem = (item: ServiceItem, catIndex: number) => {
    setSearchParams({
      service: item.query,
      label: item.label,
      cat: catIndex.toString()
    });
  };

  // Fetch providers from Supabase first, fallback to mock data
  useEffect(() => {
    if (!serviceLabel) {
      setProviders([]);
      setVisibleCount(0);
      return;
    }

    const fetchProviders = async () => {
      setLoading(true);
      setError(null);
      setProviders([]);
      setVisibleCount(0);

      try {
        // First try to fetch from Supabase
        const subCategory = serviceLabel;
        
        const { data, error: fetchError } = await supabase
          .from("service_providers")
          .select("*")
          .ilike("sub_category", `%${subCategory}%`)
          .order("rating", { ascending: false });

        if (fetchError) {
          console.log("Supabase fetch error, using mock data:", fetchError.message);
        }
        
        // If we have data from Supabase, use it
        if (data && data.length > 0) {
          // Convert Supabase data to our format
          const convertedProviders: MockServiceProvider[] = data.map((provider: ServiceProvider) => ({
            id: provider.id,
            name: provider.name,
            address: provider.address || "",
            phone_number: provider.phone_number || "",
            photo_url: provider.photo_url || "",
            rating: provider.rating || 0,
            review_count: provider.review_count || 0,
            is_open: provider.is_open ?? true,
            opening_time: provider.opening_time || "09:00",
            closing_time: provider.closing_time || "20:00",
            sub_category: provider.sub_category || subCategory,
            category: provider.category || getCategoryName(),
            website: provider.website || undefined
          }));
          
          setProviders(convertedProviders);
        } else {
          // Fallback to mock data for Bhilai/Durg/Chhattisgarh
          console.log("No data from Supabase, using mock data for Bhilai/Durg");
          const categoryName = getCategoryName();
          const mockData = generateMockProviders(serviceLabel, categoryName);
          setProviders(mockData);
        }
        
        // Animate cards appearing one by one
        const providerData = (data && data.length > 0) 
          ? (data.length > 8 ? data.slice(0, 8) : data)
          : providers.length > 0 
            ? providers 
            : generateMockProviders(serviceLabel, getCategoryName());
        
        if (providerData.length > 0) {
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setVisibleCount(count);
            if (count >= Math.min(providerData.length, 12)) {
              clearInterval(interval);
            }
          }, 100);
        }
      } catch (err) {
        console.log("Error fetching data, using mock data:", err);
        // Fallback to mock data on any error
        const categoryName = getCategoryName();
        const mockData = generateMockProviders(serviceLabel, categoryName);
        setProviders(mockData);
        
        let count = 0;
        const interval = setInterval(() => {
          count++;
          setVisibleCount(count);
          if (count >= mockData.length) {
            clearInterval(interval);
          }
        }, 100);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [serviceLabel, catIndex]);

  const renderSkeletonCards = () => {
    return Array.from({ length: 8 }).map((_, index) => (
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

  const renderProviderCard = (provider: MockServiceProvider, index: number) => {
    const isVisible = index < visibleCount;
    
    return (
      <motion.div
        key={provider.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.03 }}
      >
        <Card 
          className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group"
          onClick={() => {
            setClickedCardId(provider.id);
            setSelectedProvider(provider);
            setBookingDialogOpen(true);
          }}
        >
          <div className="relative h-40 overflow-hidden bg-muted">
            {provider.photo_url ? (
              <img
                src={provider.photo_url}
                alt={provider.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <MapPin className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            
            {provider.is_open !== null && (
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                provider.is_open ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
              }`}>
                {provider.is_open ? 'Open' : 'Closed'}
              </div>
            )}

            {/* Rating Badge */}
            {provider.rating > 0 && (
              <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium bg-black/70 text-white flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {provider.rating.toFixed(1)}
              </div>
            )}
          </div>

          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
              {provider.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {provider.address}
            </p>

            {/* Contact Details */}
            <div className="space-y-1">
              {/* Phone Number */}
              {provider.phone_number && (
                <a 
                  href={`tel:${provider.phone_number}`}
                  className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-3 h-3" />
                  <span className="line-clamp-1">{provider.phone_number}</span>
                </a>
              )}

              {/* Website */}
              {provider.website && (
                <a 
                  href={provider.website}
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

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{provider.rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({provider.review_count})</span>
              </div>
              {provider.opening_time && provider.closing_time && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>
                    {provider.is_open !== null ? (provider.is_open ? 'Open now' : 'Closed') : 'Check hours'}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons - Show only when card is clicked */}
            <div className={`flex gap-2 pt-2 ${clickedCardId === provider.id ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1 text-xs h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  if (provider.phone_number) {
                    window.open(`tel:${provider.phone_number}`, "_blank");
                  }
                }}
              >
                <Phone className="w-3 h-3" /> Contact Now
              </Button>
              <Button
                size="sm"
                className="flex-1 gap-1 text-xs h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProvider(provider);
                  setBookingDialogOpen(true);
                }}
              >
                <Calendar className="w-3 h-3" /> Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const handleClose = () => {
    setSearchParams({});
  };

  const showCategorySelection = !serviceLabel;
  const CurrentIcon = categoryIcons[iconIndex];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 flex-shrink-0 border-r border-border bg-background fixed left-0 top-0 h-screen overflow-hidden">
        <SidebarWithCategories onSelectItem={(item) => {
          const catIndex = serviceCategories.findIndex(cat => 
            cat.items.some(i => i.label === item.label)
          );
          handleSelectItem(item, catIndex >= 0 ? catIndex : 0);
        }} />
      </aside>

      <div className="flex-1 ml-64 flex flex-col">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Back to Home</span>
              </Link>
            </div>
            
            {serviceLabel && (
              <Button variant="outline" size="sm" onClick={handleClose}>
                <Menu className="w-4 h-4 mr-2" />
                All Categories
              </Button>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {showCategorySelection ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center py-12"
            >
              {/* Title first */}
              <h2 className="text-2xl font-bold mb-6">Choose a Service</h2>
              
              {/* Bigger icon - simple faded style */}
              <div className="mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={iconIndex}
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 rounded-full bg-muted flex items-center justify-center shadow-xl"
                  >
                    <CurrentIcon.Icon className="w-10 h-10 text-foreground" />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Service name below icon */}
              <motion.p 
                key={iconIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-base text-foreground mb-6"
              >
                {CurrentIcon.label}
              </motion.p>
              
              {/* Select category text at bottom */}
              <p className="text-muted-foreground max-w-md">
                Select a category from the sidebar to browse service providers in Bhilai, Durg, Chhattisgarh.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">
                    {serviceLabel ? decodeURIComponent(serviceLabel) : 'Services'}
                  </h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    {loading ? 'Loading services...' : `${providers.length} service providers found in Bhilai, Durg, Chhattisgarh`}
                  </p>
                </div>
              </div>

              {error && (
                <div className="text-center py-12">
                  <p className="text-destructive mb-4">{error}</p>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              )}

              {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {renderSkeletonCards()}
                </div>
              )}

              {!loading && !error && providers.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {providers.map((provider, index) => renderProviderCard(provider, index))}
                </div>
              )}

              {!loading && !error && providers.length === 0 && (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No services found</h2>
                  <p className="text-muted-foreground">
                    We couldn't find any service providers for "{decodeURIComponent(serviceLabel)}".
                    <br />
                    <span className="text-sm">Please try another category.</span>
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>

      {/* Booking Dialog */}
      {selectedProvider && (
        <BookingDialog
          place={{
            name: selectedProvider.name,
            address: selectedProvider.address,
            formatted_phone_number: selectedProvider.phone_number,
            photos: selectedProvider.photo_url ? [{ getUrl: () => selectedProvider.photo_url }] : [],
            rating: selectedProvider.rating,
            opening_hours: {
              is_open: selectedProvider.is_open
            },
            place_id: selectedProvider.id,
            user_ratings_total: selectedProvider.review_count,
            photoUrl: selectedProvider.photo_url,
            openNow: selectedProvider.is_open,
            website: selectedProvider.website,
            geometry: {
              location: {
                lat: () => 0,
                lng: () => 0
              }
            }
          } as unknown as PlaceResult}
          serviceName={serviceLabel ? decodeURIComponent(serviceLabel) : "Service"}
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
        />
      )}
    </div>
  );
};

export default Services;
