import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  ChevronRight, 
  Clock3, 
  CheckCircle2, 
  Wrench,
  Car,
  Home,
  Heart,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth, useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

interface Booking {
  id: string;
  service_name: string;
  provider_name: string;
  provider_address: string | null;
  provider_phone: string | null;
  booking_date: string;
  booking_time: string;
  status: string;
  amount: number | null;
  payment_status: string | null;
  created_at: string;
}

const getServiceIcon = (serviceName: string) => {
  const name = serviceName.toLowerCase();
  if (name.includes("car") || name.includes("vehicle") || name.includes("bike")) return <Car className="w-5 h-5" />;
  if (name.includes("home") || name.includes("cleaning") || name.includes("plumb") || name.includes("elect")) return <Home className="w-5 h-5" />;
  if (name.includes("health") || name.includes("medical") || name.includes("doctor")) return <Heart className="w-5 h-5" />;
  if (name.includes("beauty") || name.includes("salon") || name.includes("spa")) return <Star className="w-5 h-5" />;
  if (name.includes("food") || name.includes("restaurant") || name.includes("cater")) return <ShoppingBag className="w-5 h-5" />;
  return <Wrench className="w-5 h-5" />;
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-500/10 text-green-600 border-green-200";
    case "pending":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
    case "cancelled":
      return "bg-red-500/10 text-red-600 border-red-200";
    case "completed":
      return "bg-blue-500/10 text-blue-600 border-blue-200";
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-200";
  }
};

const getPaymentColor = (status: string | null) => {
  switch (status?.toLowerCase()) {
    case "paid":
      return "text-green-600";
    case "pending":
      return "text-yellow-600";
    case "failed":
      return "text-red-600";
    default:
      return "text-gray-500";
  }
};

const Dashboard = () => {
  const { isSignedIn, userId, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Show loading while auth is checking
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  useEffect(() => {
    if (!isSignedIn) navigate("/");
  }, [isSignedIn]);

  useEffect(() => {
    if (userId) fetchBookings();
  }, [userId]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId!)
      .order("created_at", { ascending: false });
    setBookings((data as Booking[]) || []);
    setLoading(false);
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    pending: bookings.filter(b => b.status === "pending").length,
    completed: bookings.filter(b => b.status === "completed").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
  };

  const totalSpent = bookings.reduce((acc, b) => acc + (b.amount || 0), 0);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-pulse space-y-4 p-6">
          <div className="h-32 bg-slate-200 rounded-xl"></div>
          <div className="grid grid-cols-4 gap-4">
            <div className="h-24 bg-slate-200 rounded-xl"></div>
            <div className="h-24 bg-slate-200 rounded-xl"></div>
            <div className="h-24 bg-slate-200 rounded-xl"></div>
            <div className="h-24 bg-slate-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xl font-semibold">
                  {user?.fullName?.[0]?.toUpperCase() || user?.firstName?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Welcome back! 👋
                </h1>
                <p className="text-slate-500">Here's what's happening with your bookings</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/services")}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-200"
            >
              Book New Service
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Bookings</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-violet-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Clock3 className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Total Spent Card */}
        {totalSpent > 0 && (
          <Card className="border-0 shadow-lg shadow-slate-200/50 bg-gradient-to-r from-violet-600 to-purple-600 text-white mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 font-medium mb-1">Total Amount Spent</p>
                  <p className="text-3xl font-bold">₹{totalSpent.toLocaleString()}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bookings Section */}
        <Card className="border-0 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Your Bookings</CardTitle>
                <CardDescription>Manage and track all your service bookings</CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">
                {bookings.length} Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No bookings yet</h3>
                <p className="text-slate-500 mb-6">Start by booking your first service</p>
                <Button 
                  onClick={() => navigate("/services")}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                >
                  Browse Services
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="group p-4 bg-slate-50/50 hover:bg-slate-50 rounded-xl border border-slate-100 hover:border-violet-200 transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Service Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform">
                        {getServiceIcon(booking.service_name)}
                      </div>

                      {/* Service Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900 truncate">{booking.service_name}</h3>
                          <Badge className={`${getStatusColor(booking.status)} border shrink-0`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{booking.provider_name}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {booking.booking_date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {booking.booking_time}
                          </span>
                          {booking.provider_address && (
                            <span className="flex items-center gap-1 truncate max-w-[200px]">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{booking.provider_address}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Amount & Payment */}
                      <div className="flex flex-col items-end gap-2">
                        {booking.amount && (
                          <div className="text-right">
                            <p className="text-lg font-bold text-slate-900">₹{booking.amount}</p>
                            <p className={`text-xs ${getPaymentColor(booking.payment_status)}`}>
                              {booking.payment_status || "No payment"}
                            </p>
                          </div>
                        )}
                        {booking.provider_phone && (
                          <a 
                            href={`tel:${booking.provider_phone}`}
                            className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {booking.provider_phone}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Booking ID */}
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-xs text-slate-400">
                        Booking ID: {booking.id.slice(0, 8).toUpperCase()} • 
                        Booked on {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card 
            className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
            onClick={() => navigate("/services")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Home className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Home Services</p>
                <p className="text-xs text-slate-500">Book now</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
            onClick={() => navigate("/services")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Car className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Vehicle Services</p>
                <p className="text-xs text-slate-500">Book now</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
            onClick={() => navigate("/services")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Health Services</p>
                <p className="text-xs text-slate-500">Book now</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
            onClick={() => navigate("/services")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Beauty & Spa</p>
                <p className="text-xs text-slate-500">Book now</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
