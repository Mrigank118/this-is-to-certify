import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Generator", path: "/generator" },
  // { label: "Templates", path: "/templates" },
  // { label: "Other Tools", path: "/tools" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Award className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            CertifyPro
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={isActive ? "text-foreground" : "text-muted-foreground"}
                >
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <Link to="/generator">
          <Button variant="gradient" className="gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Generate Certificates</span>
            <span className="sm:hidden">Generate</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
