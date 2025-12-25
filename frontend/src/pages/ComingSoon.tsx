import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ComingSoon = () => {
  const location = useLocation();

  useEffect(() => {
    console.info(
      "Coming Soon: User visited a page under development:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="max-w-md text-center px-6">
        <div className="mb-6 text-sm uppercase tracking-widest text-muted-foreground">
          Under Development
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Coming Soon
        </h1>

        <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
          We’re actively working on this feature.  
          It will be available shortly as part of the CertifyHQ platform.
        </p>

        <a
          href="/"
          className="inline-flex items-center justify-center
                     rounded-md border border-border
                     px-6 py-3 text-sm font-medium
                     text-foreground
                     transition-colors
                     hover:bg-accent"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default ComingSoon;
