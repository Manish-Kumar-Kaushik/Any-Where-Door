import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Policy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
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
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, phone number, and profile picture.</li>
                <li><strong>Booking Information:</strong> We collect details about services you book, including service type, date, time, and location.</li>
                <li><strong>Payment Information:</strong> Payment information is processed securely through our payment partners. We do not store your complete payment details.</li>
                <li><strong>Communication Data:</strong> We collect communications between you and our support team.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your bookings and transactions</li>
                <li>Send you booking confirmations and updates</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Service Providers:</strong> We share booking details with the service providers you choose.</li>
                <li><strong>Payment Processors:</strong> We share payment information with payment processors to complete transactions.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid requests.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing your personal information</li>
                <li>Request transfer of your personal information</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at support@anywheredoor.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Policy;
