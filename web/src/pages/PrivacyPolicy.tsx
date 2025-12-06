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
import { AppIcon } from "@/components/AppIcon";
import {
  Shield,
  Lock,
  Eye,
  Database,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

export default function PrivacyPolicy(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <AppIcon size={28} />
            <h1 className="text-xl font-bold">OffDuty Call Filter</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: December 6, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Our Commitment to Your Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground">
                OffDuty Call Filter is designed with your privacy as a top
                priority. This privacy policy explains what permissions we need,
                why we need them, what data is stored, and how your information
                is handled.
              </p>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="font-semibold text-foreground mb-2">
                  Bottom Line Up Front:
                </p>
                <p className="text-foreground mb-0">
                  We do not collect, transmit, or store any of your personal
                  data on external servers. All data stays on your device,
                  always.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Permissions We Require & Why
              </CardTitle>
              <CardDescription>
                Here's a detailed explanation of each permission the app needs
                to function
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="secondary">READ_CONTACTS</Badge>
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Why we need it:</strong>{" "}
                    To allow you to select specific contacts for your whitelist.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      What we do with it:
                    </strong>{" "}
                    We access your contacts list only when you're adding someone
                    to your whitelist. The contact information is stored locally
                    on your device in the app's private storage.
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="secondary">CallScreeningService</Badge>
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Why we need it:</strong>{" "}
                    This is an Android system service that allows apps to screen
                    incoming calls in real-time.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      What we do with it:
                    </strong>{" "}
                    We use this service to check incoming calls against your
                    whitelist and schedule settings to determine if they should
                    be allowed or blocked.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Data Storage & Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  What We Store Locally:
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">
                        Whitelist contacts:
                      </strong>{" "}
                      Names and phone numbers of contacts you've chosen to
                      always accept calls from
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">
                        Schedule settings:
                      </strong>{" "}
                      Your custom time windows for accepting calls
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">Call log:</strong>{" "}
                      Timestamps and basic information about blocked calls
                      (stored locally only)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong className="text-foreground">
                        App preferences:
                      </strong>{" "}
                      Your settings like whether filtering is enabled or
                      disabled
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Transmission */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Data Transmission & Third Parties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-foreground font-semibold mb-2">
                  Zero Network Activity
                </p>
                <p className="text-muted-foreground mb-0">
                  OffDuty Call Filter does not make any network connections. All
                  data processing happens entirely on your device. There are no
                  servers, no cloud backups, and no data transmission of any
                  kind.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Third-Party Services:
                </h3>
                <p className="text-muted-foreground">
                  We do not integrate with any third-party services, analytics
                  platforms, advertising networks, or data processors. The app
                  operates completely independently.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Google Play Data Safety */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                Google Play Data Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                In compliance with Google Play's Data Safety requirements, we've
                declared that:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>No data is collected or shared with third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    All data is stored locally and encrypted at rest by the
                    Android system
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>No data is transmitted over the network</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Users can request data deletion by uninstalling the app
                  </span>
                </li>
              </ul>
              <p className="text-muted-foreground">
                For more details, please review the Data Safety section on our{" "}
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Google Play Store listing
                </a>
                .
              </p>
            </CardContent>
          </Card>

          {/* Google Play Store Collection */}
          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                Google Play Store Data Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                When you download and install OffDuty Call Filter from the
                Google Play Store, please be aware that{" "}
                <strong className="text-foreground">
                  Google may collect data about your app usage, device
                  information, and other information
                </strong>
                . This data collection is performed by Google, not by our app.
              </p>

              <p className="text-muted-foreground">
                To be completely safe and informed, we strongly recommend
                reviewing Google's privacy policy:
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium flex items-center gap-2"
                >
                  Google Privacy Policy
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://play.google.com/about/play-terms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium flex items-center gap-2"
                >
                  Google Play Terms of Service
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights & Data Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Access Your Data:
                </h3>
                <p className="text-muted-foreground">
                  All your data is accessible directly within the app. You can
                  view your whitelist, schedules, and call log at any time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Delete Your Data:
                </h3>
                <p className="text-muted-foreground">
                  You can clear individual entries within the app, or delete all
                  app data by uninstalling the application or clearing data in
                  your device's app settings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Revoke Permissions:
                </h3>
                <p className="text-muted-foreground">
                  You can revoke any permissions at any time through your
                  device's Settings → Apps → OffDuty Call Filter → Permissions.
                  Note that the app requires these permissions to function.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                OffDuty Call Filter does not knowingly collect or solicit
                information from anyone under the age of 13. Since we don't
                collect any personal information at all, the app can be safely
                used by users of all ages (subject to parental consent for
                minors).
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last updated" date at the top.
              </p>
              <p className="text-muted-foreground">
                Continued use of the app after any modifications to the privacy
                policy will constitute your acknowledgment of the modifications.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Questions or Concerns?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this privacy policy or how your
                data is handled, please feel free to reach out:
              </p>
              <div className="space-y-2">
                <p className="text-foreground">
                  <strong>Developer:</strong> Shalev Ben Moshe
                </p>
                <p className="text-foreground">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:shalev396@gmail.com"
                    className="text-primary hover:underline"
                  >
                    shalev396@gmail.com
                  </a>
                </p>
                <p className="text-foreground">
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://shalev396.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    shalev396.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-muted/30 mt-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <AppIcon size={24} />
              <span className="font-semibold">OffDuty Call Filter</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
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
