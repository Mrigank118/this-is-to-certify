import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Layers, 
  QrCode, 
  Shield, 
  Code2, 
  Database, 
  Zap,
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    icon: Layers,
    title: "Bulk Generator",
    description: "Generate thousands of certificates at once with our high-performance batch processing system.",
    status: "available",
    link: "/generator",
  },
  {
    icon: QrCode,
    title: "QR Certificates",
    description: "Add verifiable QR codes to certificates for easy authenticity verification.",
    status: "coming-soon",
  },
  {
    icon: Shield,
    title: "Verification Portal",
    description: "Allow recipients to verify their certificate authenticity online.",
    status: "coming-soon",
  },
  {
    icon: Code2,
    title: "API Access",
    description: "Integrate certificate generation directly into your applications via our REST API.",
    status: "coming-soon",
  },
  {
    icon: Database,
    title: "Template Library",
    description: "Access our growing library of professional certificate templates.",
    status: "available",
    link: "/templates",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Set up automated certificate generation triggered by webhooks and events.",
    status: "coming-soon",
  },
];

export default function Tools() {
  return (
    <Layout>
      <div className="container py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tools & Features
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our suite of certificate generation and management tools 
            designed for teams and businesses of all sizes.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div key={tool.title} className="card-interactive p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{tool.title}</h3>
                    {tool.status === "coming-soon" && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  {tool.status === "available" && tool.link ? (
                    <Link to={tool.link}>
                      <Button variant="outline" size="sm" className="gap-1">
                        Try Now
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="ghost" size="sm" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 card-elevated p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need Custom Solutions?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            We offer custom integrations, dedicated infrastructure, and white-label 
            solutions for enterprise customers.
          </p>
          <Button variant="gradient" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </Layout>
  );
}
