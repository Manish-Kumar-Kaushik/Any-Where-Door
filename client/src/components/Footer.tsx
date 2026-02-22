import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-14">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="Any Where Door" className="h-12 w-auto" />
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Your one-stop platform for booking trusted local services. Fast, reliable, and hassle-free.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Services</h4>
            <ul className="space-y-2">
              {["Home Services", "Health", "Education", "Electronics", "Shifting"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/#contact" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/policy" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} Any Where Door. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
