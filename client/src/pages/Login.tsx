import { SignIn } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";

const Login = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 flex justify-center items-center min-h-[calc(100vh-5rem)]">
        <SignIn 
          appearance={{
            elements: {
              rootBox: {
                width: '100%',
                maxWidth: '450px',
              },
              card: {
                width: '100%',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
              },
              formButtonPrimary: {
                backgroundColor: '#2563eb',
                '&:hover': {
                  backgroundColor: '#1d4ed8',
                },
              },
              dividerLine: {
                backgroundColor: '#e5e7eb',
              },
              dividerText: {
                color: '#6b7280',
              },
              formFieldInput: {
                borderRadius: '8px',
                borderColor: '#d1d5db',
                '&:focus': {
                  borderColor: '#2563eb',
                  boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
                },
              },
              footerActionLink: {
                color: '#2563eb',
                '&:hover': {
                  color: '#1d4ed8',
                },
              },
            },
            variables: {
              colorPrimary: '#2563eb',
              colorTextOnPrimaryBackground: '#ffffff',
              colorBackground: '#ffffff',
              colorInputBackground: '#ffffff',
              colorInputText: '#1f2937',
              borderRadius: '8px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            },
          }}
          routing="path"
          path="/login"
          signUpUrl="/signup"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
};

export default Login;
