import { Clock, Shield, Star, Headphones } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Book services anytime, anywhere with our round-the-clock platform.",
  },
  {
    icon: Shield,
    title: "Verified Professionals",
    description: "All service providers are background-checked and verified.",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description: "Rated and reviewed services ensuring top-quality experience.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Our support team is always ready to help you with any concerns.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We provide the best service booking experience with reliability and trust.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-white shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
