import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Phone,
  Shield,
  Clock,
  Users,
  List,
  ToggleLeft,
  Download,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">OffDuty Call Filter</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/privacy">
              <Button variant="ghost">Privacy Policy</Button>
            </Link>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4" variant="secondary">
            Android 10+
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Take Control of Your <span className="text-primary">Call Time</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Intelligently filter incoming calls based on custom schedules and
            whitelists. Never miss important calls while maintaining your peace
            of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto">
                <Download className="mr-2 h-5 w-5" />
                Download on Google Play
              </Button>
            </a>
            <a href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your call availability without
              missing important contacts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Smart Call Screening</CardTitle>
                <CardDescription>
                  Automatically filters incoming calls based on your preferences
                  and settings
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Whitelist Management</CardTitle>
                <CardDescription>
                  Always allow calls from specific contacts. Your important
                  people never get blocked
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Schedule-Based Filtering</CardTitle>
                <CardDescription>
                  Define time windows when you want to accept calls. Perfect for
                  work-life balance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <List className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Call Log History</CardTitle>
                <CardDescription>
                  Track all blocked calls with timestamps. Never wonder who
                  tried to reach you
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <ToggleLeft className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Easy Toggle</CardTitle>
                <CardDescription>
                  Enable or disable call filtering with a single tap whenever
                  you need
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Phone className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Material Design UI</CardTitle>
                <CardDescription>
                  Modern, intuitive interface with bottom navigation for easy
                  access
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Install & Grant Permissions
                  </h3>
                  <p className="text-muted-foreground">
                    Download the app and grant necessary permissions for
                    contacts access and call screening service
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Configure Your Preferences
                  </h3>
                  <p className="text-muted-foreground">
                    Set up your whitelist of important contacts and define your
                    availability schedule
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enable & Relax</h3>
                  <p className="text-muted-foreground">
                    Turn on call filtering and enjoy your peace while staying
                    reachable to important contacts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Privacy Matters
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            All your data stays on your device. We don't collect, store, or
            share any of your personal information or call data with external
            servers.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              No Data Collection
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Local Storage Only
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              No Analytics
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              No Tracking
            </Badge>
          </div>
          <Link to="/privacy">
            <Button variant="outline">Read Full Privacy Policy</Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-background to-muted/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Control?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Download OffDuty Call Filter today and never be interrupted by
            unwanted calls again
          </p>
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download Now - It's Free
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-primary" />
              <span className="font-semibold">OffDuty Call Filter</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link
                to="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Google Play
              </a>
              <a
                href="mailto:shalev396@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>
              Created with ❤️ by{" "}
              <a
                href="https://shalev396.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Shalev Ben Moshe
              </a>
            </p>
            <p className="mt-2">
              © 2025 OffDuty Call Filter. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

