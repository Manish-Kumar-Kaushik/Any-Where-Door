import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth, useUser } from "@clerk/clerk-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-nav">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Any Where Door" className="h-16 w-auto" />
          </Link>

          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/services"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link 
                to="/about"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </li>
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {user?.imageUrl ? (
                      <img src={user?.imageUrl} alt="avatar" className="w-8 h-8 rounded-full object-cover border border-border" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {user?.fullName?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <span className="text-sm font-medium text-foreground">{user?.fullName}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="gap-2 cursor-pointer">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => navigate("/account")} className="gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" /> Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="gap-2 cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/login")}>
                <User className="w-4 h-4" /> Login
              </Button>
            )}
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-background border-t border-border px-4 pb-4 animate-in slide-in-from-top-2">
            <ul className="flex flex-col gap-3 pt-3">
              <li>
                <Link to="/" className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <a href="#services" className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
                  Contact
                </a>
              </li>
            </ul>
            {isSignedIn ? (
              <div className="space-y-1 mt-3 border-t border-border pt-3">
                <button onClick={() => { navigate("/dashboard"); setMobileOpen(false); }} className="block w-full text-left py-2 text-sm text-muted-foreground hover:text-primary">Dashboard</button>
                <button onClick={() => { navigate("/account"); setMobileOpen(false); }} className="block w-full text-left py-2 text-sm text-muted-foreground hover:text-primary">Account</button>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block w-full text-left py-2 text-sm text-destructive hover:text-destructive/80">Logout</button>
              </div>
            ) : (
              <Button variant="outline" size="sm" className="mt-3 w-full gap-2" onClick={() => { navigate("/login"); setMobileOpen(false); }}>
                <User className="w-4 h-4" /> Login
              </Button>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
