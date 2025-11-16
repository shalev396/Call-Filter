import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Phone className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Call Filter</span>
          </div>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Smart Call Filtering for Your Business
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Protect your time with intelligent call filtering. Manage
            whitelists, set business hours, and ensure only the right calls get
            through.
          </p>
          <Link href="/login">
            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Whitelist Management
                </h3>
                <p className="text-muted-foreground">
                  Easily add and remove phone numbers from your whitelist.
                  Trusted contacts always get through.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Schedule Control</h3>
                <p className="text-muted-foreground">
                  Set business hours and days when calls are accepted. Automatic
                  filtering outside scheduled times.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Twilio Integration
                </h3>
                <p className="text-muted-foreground">
                  Powered by Twilio for reliable call handling with minimal
                  latency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Login to manage your call filtering settings.
          </p>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Login Now
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Call Filter Dashboard. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
