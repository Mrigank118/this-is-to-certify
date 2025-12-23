import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Upload, 
  MousePointer, 
  Palette, 
  Download, 
  Sparkles,
  FileSpreadsheet,
  Zap,
  Shield,
  Users
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload Template",
    description: "Import your certificate design as an image template.",
  },
  {
    icon: FileSpreadsheet,
    title: "Import Names",
    description: "Upload a CSV file with all recipient names.",
  },
  {
    icon: MousePointer,
    title: "Position Text",
    description: "Drag and drop to perfectly position name placement.",
  },
  {
    icon: Palette,
    title: "Customize Style",
    description: "Choose fonts, sizes, and colors to match your brand.",
  },
  {
    icon: Zap,
    title: "Auto Generate",
    description: "Our backend processes hundreds of certificates instantly.",
  },
  {
    icon: Download,
    title: "Download All",
    description: "Get all certificates in a single ZIP file download.",
  },
];

const stats = [
  { value: "50K+", label: "Certificates Generated" },
  { value: "2K+", label: "Happy Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "<3s", label: "Avg. Generation Time" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/20" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full text-sm font-medium text-accent-foreground mb-6">
              <Sparkles className="h-4 w-4" />
              Professional Certificate Generation
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Create Beautiful Certificates{" "}
              <span className="text-primary">in Seconds</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload your template, import names from CSV, customize styling, and let our 
              powerful backend generate hundreds of personalized certificates instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/generator">
                <Button variant="gradient" size="xl" className="gap-2">
                  <Award className="h-5 w-5" />
                  Start Generating
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" size="xl">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate professional certificates in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-interactive p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-primary mb-1">
                      Step {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Secure Processing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and processed securely on our servers.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Lightning Fast
                </h3>
                <p className="text-sm text-muted-foreground">
                  Generate thousands of certificates in just seconds.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Trusted by Teams
                </h3>
                <p className="text-sm text-muted-foreground">
                  Used by educators, HR teams, and event organizers worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Create Certificates?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start generating professional certificates for your team, students, or event attendees today.
            </p>
            <Link to="/generator">
              <Button variant="gradient" size="xl" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
