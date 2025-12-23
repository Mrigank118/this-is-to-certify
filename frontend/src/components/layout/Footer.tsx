import { Link } from "react-router-dom";
import { Award, ExternalLink } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Generator", path: "/generator" },
    { label: "Templates", path: "/templates" },
    { label: "API Access", path: "/tools" },
    { label: "Pricing", path: "/tools" },
  ],
  tools: [
    { label: "Bulk Generator", path: "/tools" },
    { label: "Template Editor", path: "/tools" },
    { label: "QR Certificates", path: "/tools" },
    { label: "Verification", path: "/tools" },
  ],
  company: [
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Blog", path: "/blog" },
    { label: "Careers", path: "/careers" },
  ],
  legal: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Cookie Policy", path: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Promo Banner */}
      <div className="border-b border-border bg-accent/30">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Need enterprise solutions?</p>
                <p className="text-sm text-muted-foreground">Contact us for custom integrations and volume pricing.</p>
              </div>
            </div>
            <Link 
              to="/contact" 
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Get in touch
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Award className="h-4 w-4" />
              </div>
              <span className="font-semibold text-foreground">CertifyPro</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Professional certificate generation platform for businesses and educators.
            </p>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Tools</h4>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CertifyPro. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground">Powered by Python Backend</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
