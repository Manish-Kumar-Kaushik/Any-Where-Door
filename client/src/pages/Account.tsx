import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Account = () => {
  const { isSignedIn, userId, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    display_name: "",
    email: "",
    phone: "",
    address: "",
  });

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
    if (userId) loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    if (!userId) return;
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    
    if (data) {
      setForm({
        display_name: data.display_name || "",
        email: data.email || user?.emailAddresses?.[0]?.emailAddress || "",
        phone: data.phone || user?.phoneNumbers?.[0]?.phoneNumber || "",
        address: data.address || "",
      });
    } else {
      setForm({
        display_name: user?.fullName || user?.firstName || "",
        email: user?.emailAddresses?.[0]?.emailAddress || "",
        phone: user?.phoneNumbers?.[0]?.phoneNumber || "",
        address: "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({
        user_id: userId,
        display_name: form.display_name,
        email: form.email,
        phone: form.phone,
        address: form.address,
      }, { onConflict: "user_id" });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Profile updated successfully." });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 px-4 max-w-xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 max-w-xl mx-auto">
        <Button variant="ghost" size="sm" className="mb-4 gap-2" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold text-foreground mb-6">Account Settings</h1>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <Input value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Phone</label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Address</label>
            <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <Button className="w-full gap-2" onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
