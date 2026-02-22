import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Call the edge function to send email
      const { error } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: formData,
        }
      );

      if (error) throw error;

      setSuccessMessage("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // WhatsApp URL with phone number
  const whatsappNumber = "919030101768";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-3 text-gray-600 text-lg">Get in touch with us for any queries</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Phone</h3>
                <p className="text-gray-600 mt-1">+91 98765 43210</p>
              </div>
            </div>
            
            {/* WhatsApp - Added as per user request */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">WhatsApp</h3>
                <p className="text-gray-600 mt-1">+91 90301 01768</p>
              </div>
            </a>
            
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Email</h3>
                <p className="text-gray-600 mt-1">hello@servicemaker.in</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Address</h3>
                <p className="text-gray-600 mt-1">India</p>
              </div>
            </div>
          </div>

          {/* Right Side - Message Form */}
          <div className="bg-white rounded-2xl p-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">Send us a Message</h3>
            
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">{successMessage}</p>
              </div>
            )}
            
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={6}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
