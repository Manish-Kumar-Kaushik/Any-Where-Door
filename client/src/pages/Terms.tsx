import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">
              Please read these terms carefully before using our services.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <div className="mb-8">
              <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Any Where Door ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                Any Where Door is an online platform that connects customers with local service providers. We provide a marketplace for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Browsing and discovering local service providers</li>
                <li>Booking services online</li>
                <li>Rating and reviewing service providers</li>
                <li>Managing appointments and bookings</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground mb-4">
                To use certain features of our Platform, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Service Provider Terms</h2>
              <p className="text-muted-foreground mb-4">
                Service providers using our Platform agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate information about their services</li>
                <li>Maintain proper licenses and certifications</li>
                <li>Honour all booked appointments</li>
                <li>Provide services in a professional manner</li>
                <li>Charge fair and reasonable prices</li>
                <li>Respond to customer inquiries promptly</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Booking and Cancellations</h2>
              <p className="text-muted-foreground mb-4">
                <strong>Booking:</strong> When you book a service through our Platform, you are making a commitment to keep the appointment.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Cancellation Policy:</strong>
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Cancellations made 24+ hours before the appointment are eligible for a full refund</li>
                <li>Cancellations made 12-24 hours before the appointment may be subject to a 50% fee</li>
                <li>Cancellations made less than 12 hours before the appointment are non-refundable</li>
                <li>No-shows will be charged the full service fee</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Payments</h2>
              <p className="text-muted-foreground mb-4">
                All payments are processed securely through our payment partners. By using our Platform, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Pay all fees associated with your bookings</li>
                <li>Provide valid payment information</li>
                <li>Authorize us to charge your payment method for bookings</li>
                <li>Accept that refunds are subject to our cancellation policy</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. User Conduct</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Use the Platform for any unlawful purpose</li>
                <li>Post false, inaccurate, misleading, or defamatory content</li>
                <li>Harass, abuse, or harm other users or service providers</li>
                <li>Interfere with the proper operation of the Platform</li>
                <li>Attempt to gain unauthorized access to any part of the Platform</li>
                <li>Use the Platform to transmit viruses or malicious code</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Reviews and Ratings</h2>
              <p className="text-muted-foreground mb-4">
                Users can leave reviews and ratings for service providers. By posting a review, you agree that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Your review is based on your genuine experience</li>
                <li>Your review does not contain false or misleading information</li>
                <li>Your review does not include personal attacks or offensive language</li>
                <li>Any conflicts of interest are disclosed</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Intellectual Property</h2>
              <p className="text-muted-foreground">
                The Platform and its original content, features, and functionality are owned by Any Where Door and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this Platform without our explicit permission.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Any Where Door is not responsible for the acts, errors, omissions, representations, warranties, breaches, or negligence of any service provider or for any personal injuries, death, property damage, or other damages or expenses resulting therefrom. Our liability is limited to the maximum extent permitted by law.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                The Platform is provided "as is" and "as available". We make no representations or warranties of any kind, express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify, defend, and hold harmless Any Where Door and its officers, directors, employees, agents, and affiliates from and against any claims, damages, losses, liabilities, costs, or expenses arising out of or related to your use of the Platform or your violation of these Terms.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page. Your continued use of the Platform after such changes constitutes acceptance of the new Terms.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us at support@anywheredoor.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
