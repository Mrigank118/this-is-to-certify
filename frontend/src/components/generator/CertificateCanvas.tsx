import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CustomFont {
  name: string;
  file: File;
  url: string;
}

interface CertificateCanvasProps {
  previewRef: React.RefObject<HTMLDivElement>; // 🔥 ADD
  templateUrl: string | null;
  textPosition: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  font: string;
  fontSize: number;
  color: string;
  sampleName: string;
  customFont?: CustomFont | null;
}

export function CertificateCanvas({
  templateUrl,
  textPosition,
  onPositionChange,
  font,
  fontSize,
  customFont,
  color,
  sampleName,
}: CertificateCanvasProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const getActiveFontFamily = () => {
    if (font.startsWith('custom-') && customFont) {
      return customFont.name;
    }
    return getFontFamily(font);
  };

  const getFontFamily = (fontValue: string) => {
    const fontMap: Record<string, string> = {
      'arial': 'Arial, sans-serif',
      'times-new-roman': '"Times New Roman", serif',
      'georgia': 'Georgia, serif',
      'helvetica': 'Helvetica, sans-serif',
      'courier-new': '"Courier New", monospace',
      'verdana': 'Verdana, sans-serif',
      'palatino': '"Palatino Linotype", serif',
      'garamond': 'Garamond, serif',
    };
    return fontMap[fontValue] || 'Arial, sans-serif';
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - textPosition.x,
      y: e.clientY - textPosition.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(e.clientX - dragStart.x, rect.width - 100));
    const newY = Math.max(0, Math.min(e.clientY - dragStart.y, rect.height - 50));

    onPositionChange({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => setIsDragging(false);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Certificate Preview</h2>
          <p className="text-sm text-muted-foreground">Drag the text to position it on the certificate</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <span className="h-2 w-2 rounded-full bg-warning animate-pulse-subtle"></span>
          Preview Only
        </div>
      </div>

      {/* Canvas Area */}
      <div
        ref={previewRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={cn(
          "flex-1 canvas-area relative overflow-hidden flex items-center justify-center min-h-[400px]",
          isDragging && "cursor-grabbing"
        )}
      >
        {templateUrl ? (
          <>
            <img
              src={templateUrl}
              alt="Certificate template"
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              draggable={false}
            />
            {/* Draggable Text Overlay */}
            <div
              onMouseDown={handleMouseDown}
              style={{
                position: 'absolute',
                left: textPosition.x,
                top: textPosition.y,
                fontFamily: getActiveFontFamily(),
                fontSize: `${fontSize}px`,
                color: color,
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap',
              }}
              className={cn(
                "px-2 py-1 rounded transition-all",
                isDragging ? "ring-2 ring-primary bg-primary/5" : "hover:ring-2 hover:ring-primary/50"
              )}
            >
              {sampleName}
            </div>
          </>
        ) : (
          <div className="text-center p-8">
            <div className="h-16 w-16 rounded-xl bg-muted mx-auto mb-4 flex items-center justify-center">
              <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Template Uploaded</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Upload a certificate template to start positioning your text
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-4 p-3 bg-accent/50 rounded-lg border border-accent">
        <p className="text-xs text-accent-foreground text-center">
          This is a preview only. Final certificates will be generated by the backend server.
        </p>
      </div>
    </div>
  );
}
