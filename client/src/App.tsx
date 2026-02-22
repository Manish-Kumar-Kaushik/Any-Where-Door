import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import Services from "./pages/Services";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

// Get the Clerk publishable key from environment
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const App = () => (
  <ClerkProvider publishableKey={clerkPublishableKey}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
