import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Users, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Any Where Door</h1>
            <p className="text-lg text-muted-foreground">
              Connecting you with trusted service providers across India. We make finding and booking local services simple, fast, and reliable.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At Any Where Door, we believe everyone deserves access to quality services without the hassle of searching through endless options or worrying about reliability.
              </p>
              <p className="text-muted-foreground">
                Our platform bridges the gap between customers seeking professional services and trusted service providers looking to grow their business. We make it easy to discover, compare, and book services all in one place.
              </p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Service Providers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Service Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-background p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Verified Providers</h3>
              <p className="text-sm text-muted-foreground">
                All service providers are vetted and verified for your peace of mind.
              </p>
            </div>
            <div className="bg-background p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quick Booking</h3>
              <p className="text-sm text-muted-foreground">
                Book services in minutes with our easy-to-use platform.
              </p>
            </div>
            <div className="bg-background p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Customer Support</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated support team to help you with any queries.
              </p>
            </div>
            <div className="bg-background p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-muted-foreground">
                Rated and reviewed services ensuring top quality work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have found their perfect service provider through Any Where Door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-background/90 transition-colors"
              >
                Explore Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
