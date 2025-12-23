import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Award, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Classic Achievement",
    category: "Achievement",
    description: "Elegant design with gold accents for professional achievements.",
  },
  {
    id: 2,
    name: "Modern Completion",
    category: "Completion",
    description: "Clean, minimal design perfect for course completions.",
  },
  {
    id: 3,
    name: "Academic Excellence",
    category: "Academic",
    description: "Traditional academic style for schools and universities.",
  },
  {
    id: 4,
    name: "Corporate Recognition",
    category: "Corporate",
    description: "Professional template for employee recognition programs.",
  },
  {
    id: 5,
    name: "Event Participation",
    category: "Event",
    description: "Versatile design for conferences and workshops.",
  },
  {
    id: 6,
    name: "Training Certificate",
    category: "Training",
    description: "Modern layout for professional training programs.",
  },
];

export default function Templates() {
  return (
    <Layout>
      <div className="container py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Certificate Templates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of professionally designed certificate templates. 
            Download and customize them with your own branding.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="card-interactive overflow-hidden group">
              {/* Placeholder Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
                <Award className="h-16 w-16 text-muted-foreground/30" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="default">
                      <Download className="h-4 w-4 mr-1" />
                      Use
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{template.name}</h3>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Don't see what you need? Upload your own custom template.
          </p>
          <Link to="/generator">
            <Button variant="gradient">
              Upload Custom Template
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
