import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Phone, CreditCard, Check, PartyPopper } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAuth, useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { PlaceResult } from "@/lib/googlePlaces";

// Available time slots (when user wants the service)
const timeOptions = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM",
];

// Duration options with simple pricing (pay only for time booked)
const durationOptions = [
  { duration: 30, label: "30 min", price: 199 },
  { duration: 60, label: "1 hour", price: 349 },
  { duration: 90, label: "1.5 hours", price: 499 },
  { duration: 120, label: "2 hours", price: 649 },
  { duration: 180, label: "3 hours", price: 899 },
];

interface BookingDialogProps {
  place: PlaceResult | null;
  serviceName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "actions" | "calendar" | "confirm" | "success";

interface DurationOption {
  duration: number;
  label: string;
  price: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const BookingDialog = ({ place, serviceName, open, onOpenChange }: BookingDialogProps) => {
  const [step, setStep] = useState<Step>("actions");
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<DurationOption | null>(null);
  const [loading, setLoading] = useState(false);
  const { isSignedIn, userId, isLoaded } = useAuth();
  const { user } = useUser();
  const { toast } = useToast();

  const resetState = () => {
    setStep("actions");
    setDate(undefined);
    setSelectedTime("");
    setSelectedDuration(null);
    setLoading(false);
  };

  const handleClose = (val: boolean) => {
    if (!val) resetState();
    onOpenChange(val);
  };

  // Show loading while auth is checking
  if (!isLoaded) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const handleContact = () => {
    if (place) {
      window.open(`tel:${place.name}`, "_blank");
    }
    toast({ title: "Contact", description: `Contact ${place?.name} directly for inquiries.` });
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });
  };

  const handleConfirmBooking = async () => {
    if (!isSignedIn || !userId || !date || !selectedTime || !selectedDuration || !place) return;
    setLoading(true);

    try {
      // Get the exact price for selected duration
      const finalAmount = selectedDuration?.price || 199;
      
      // Create Razorpay order - send exact amount (Razorpay will handle paise conversion)
      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        "create-razorpay-order",
        {
          body: {
            amount: finalAmount, // Exact amount - no multiplication
            currency: "INR",
            receipt: `booking_${Date.now()}`,
            notes: { 
              service: serviceName, 
              provider: place.name, 
              time: selectedTime,
              duration: selectedDuration?.label,
              price: finalAmount
            },
          },
        }
      );

      if (orderError || !orderData?.order_id) {
        throw new Error(orderError?.message || "Failed to create order");
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Failed to load Razorpay");

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Any Where Door",
        description: `Booking: ${serviceName} - ${place.name}`,
        order_id: orderData.order_id,
        prefill: {
          name: user?.fullName || user?.firstName || "",
          email: user?.emailAddresses?.[0]?.emailAddress || "",
          contact: user?.phoneNumbers?.[0]?.phoneNumber || "",
        },
        handler: async (response: any) => {
          // Payment success → save booking
          await supabase.from("bookings").insert({
            user_id: userId,
            service_name: serviceName,
            provider_name: place.name,
            provider_address: place.address,
            booking_date: format(date, "yyyy-MM-dd"),
            booking_time: `${selectedTime} (${selectedDuration?.label})`,
            payment_id: response.razorpay_payment_id,
            payment_status: "paid",
            amount: selectedDuration?.price || 199,
            status: "confirmed",
          });
          setStep("success");
          setLoading(false);
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
      setLoading(false);
    }
  };

  if (!place) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">{place.name}</DialogTitle>
        </DialogHeader>

        {/* Step: Actions */}
        {step === "actions" && (
          <div className="space-y-3 pt-2">
            <p className="text-sm text-muted-foreground">{place.address}</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2" onClick={handleContact}>
                <Phone className="w-4 h-4" /> Contact Now
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={() => {
                  if (!isSignedIn) {
                    toast({ title: "Login Required", description: "Please login first to book a service.", variant: "destructive" });
                    return;
                  }
                  setStep("calendar");
                }}
              >
                <CreditCard className="w-4 h-4" /> Book
              </Button>
            </div>
          </div>
        )}

        {/* Step: Calendar + Time */}
        {step === "calendar" && (
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {date && (
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Select Time (When)</label>
                <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto mb-3">
                  {timeOptions.map((t) => (
                    <Button
                      key={t}
                      variant={selectedTime === t ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {date && selectedTime && (
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Select Duration (How Long)</label>
                <div className="grid grid-cols-2 gap-2">
                  {durationOptions.map((opt) => (
                    <Button
                      key={opt.duration}
                      variant={selectedDuration?.duration === opt.duration ? "default" : "outline"}
                      size="sm"
                      className="text-xs justify-between"
                      onClick={() => setSelectedDuration(opt)}
                    >
                      <span>{opt.label}</span>
                      <span className="font-bold">₹{opt.price}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {date && selectedTime && selectedDuration && (
              <div className="mt-4 bg-primary/10 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    📅 {format(date, "MMM d")} at {selectedTime}
                  </span>
                  <span className="text-lg font-bold">
                    ₹{selectedDuration.price}
                  </span>
                </div>
              </div>
            )}

            {date && selectedTime && selectedDuration && (
              <Button className="w-full gap-2 mt-4" onClick={() => setStep("confirm")}>
                <Check className="w-4 h-4" /> Continue - Pay ₹{selectedDuration.price}
              </Button>
            )}
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && (
          <div className="space-y-4 pt-2">
            <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
              <p><span className="font-medium">Service:</span> {serviceName}</p>
              <p><span className="font-medium">Provider:</span> {place.name}</p>
              <p><span className="font-medium">Date:</span> {date && format(date, "PPP")}</p>
              <p><span className="font-medium">Time:</span> {selectedTime}</p>
              <p><span className="font-medium">Duration:</span> {selectedDuration?.label}</p>
              <p className="text-lg font-bold"><span className="font-medium">Amount:</span> ₹{selectedDuration?.price}</p>
            </div>
            <Button className="w-full" onClick={handleConfirmBooking} disabled={loading}>
              {loading ? "Processing..." : `Yes, I confirm — Pay ₹${selectedDuration?.price}`}
            </Button>
          </div>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="text-center space-y-4 py-6">
            <PartyPopper className="w-16 h-16 text-primary mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-foreground">Your service is booked successfully!</h3>
            <p className="text-sm text-muted-foreground">
              {serviceName} with {place.name} on {date && format(date, "PPP")} at {selectedTime} ({selectedDuration?.label})
            </p>
            <Button onClick={() => handleClose(false)}>Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
