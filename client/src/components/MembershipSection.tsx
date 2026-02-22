import { Check } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    price: 0,
    priceDisplay: "Free",
    features: [
      "Up to 2 bookings per month",
      "Basic service access",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: 299,
    priceDisplay: "₹299",
    features: [
      "Unlimited bookings",
      "Priority service access",
      "24/7 phone support",
      "Exclusive deals",
      "Free cancellation",
    ],
    popular: true,
  },
  {
    name: "Pro",
    price: 599,
    priceDisplay: "₹599",
    features: [
      "Everything in Premium",
      "Dedicated account manager",
      "Special discount rates",
      "Early access to new services",
      "Free rescheduling",
    ],
    popular: false,
  },
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

const MembershipSection = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  // Show nothing while auth is loading
  if (!isLoaded) {
    return null;
  }

  const handleGetStarted = async (plan: typeof plans[0]) => {
    // If free plan, just activate it
    if (plan.price === 0) {
      if (!isSignedIn) {
        navigate("/login");
        return;
      }
      
      // Save membership to Supabase
      if (user?.id) {
        await (supabase as any).from("user_memberships").upsert({
          user_id: user.id,
          plan: plan.name.toLowerCase(),
          status: "active",
        });
      }
      
      toast({ title: "Success", description: `You are now on ${plan.name} plan!` });
      return;
    }

    // For paid plans, require login first
    if (!isSignedIn) {
      navigate("/login");
      return;
    }

    setLoading(plan.name);

    try {
      // Create Razorpay order
      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        "create-razorpay-order",
        {
          body: {
            amount: plan.price,
            currency: "INR",
            receipt: `membership_${plan.name.toLowerCase()}_${Date.now()}`,
            notes: { plan: plan.name, type: "membership" },
          },
        }
      );

      if (orderError || !orderData?.order_id) {
        throw new Error(orderError?.message || "Failed to create order");
      }

      // Load Razorpay script
      const loadRazorpay = (): Promise<boolean> => {
        return new Promise((resolve) => {
          if (window.Razorpay) { resolve(true); return; }
          const s = document.createElement("script");
          s.src = "https://checkout.razorpay.com/v1/checkout.js";
          s.onload = () => resolve(true);
          s.onerror = () => resolve(false);
          document.body.appendChild(s);
        });
      };

      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded) throw new Error("Failed to load Razorpay");

      // Open Razorpay
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Any Where Door",
        description: `${plan.name} Membership Plan`,
        order_id: orderData.order_id,
        prefill: {
          name: user?.fullName || user?.firstName || "",
          email: user?.emailAddresses?.[0]?.emailAddress || "",
          contact: user?.phoneNumbers?.[0]?.phoneNumber || "",
        },
        handler: async (response: any) => {
          // Save membership to Supabase on successful payment
          if (user?.id) {
            await (supabase as any).from("user_memberships").upsert({
              user_id: user.id,
              plan: plan.name.toLowerCase(),
              status: "active",
              payment_id: response.razorpay_payment_id,
              amount: plan.price,
            });
          }

          toast({
            title: "🎉 Payment Successful!",
            description: `Welcome to ${plan.name} plan! You can now enjoy all benefits.`,
          });
          setLoading(null);
        },
        modal: {
          ondismiss: () => {
            setLoading(null);
            toast({ title: "Payment Cancelled", description: "You can try again anytime." });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
      setLoading(null);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-4"
        >
          Choose Your Plan
        </motion.h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Select the membership plan that best fits your needs.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-lg bg-white shadow-sm border ${
                plan.popular ? "border-primary ring-2 ring-primary/20" : ""
              }`}
            >
              {plan.popular && (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="font-semibold text-xl mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.priceDisplay}</span>
                {plan.price > 0 && (
                  <span className="text-gray-600">/month</span>
                )}
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGetStarted(plan)}
                disabled={loading === plan.name}
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-gray-100 hover:bg-gray-200"
                } disabled:opacity-50`}
              >
                {loading === plan.name ? "Processing..." : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
