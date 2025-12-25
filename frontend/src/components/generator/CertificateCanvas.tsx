import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CustomFont {
  name: string;
  file: File;
  url: string;
}

interface CertificateCanvasProps {
  previewRef: React.RefObject<HTMLDivElement>;
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
  previewRef,
  templateUrl,
  textPosition,
  onPositionChange,
  font,
  fontSize,
  customFont,
  color,
  sampleName,
}: CertificateCanvasProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const getFontFamily = (fontValue: string) => {
    const fontMap: Record<string, string> = {
      arial: "Arial, sans-serif",
      "times-new-roman": '"Times New Roman", serif',
      georgia: "Georgia, serif",
      helvetica: "Helvetica, sans-serif",
      "courier-new": '"Courier New", monospace',
      verdana: "Verdana, sans-serif",
      palatino: '"Palatino Linotype", serif',
      garamond: "Garamond, serif",
    };
    return fontMap[fontValue] || "Arial, sans-serif";
  };

  const activeFontFamily =
    font.startsWith("custom-") && customFont
      ? customFont.name
      : getFontFamily(font);

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

    const newX = Math.max(0, Math.min(e.clientX - dragStart.x, rect.width));
    const newY = Math.max(0, Math.min(e.clientY - dragStart.y, rect.height));

    onPositionChange({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;
    const stopDrag = () => setIsDragging(false);
    window.addEventListener("mouseup", stopDrag);
    return () => window.removeEventListener("mouseup", stopDrag);
  }, [isDragging]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Certificate Preview</h2>
          <p className="text-sm text-muted-foreground">
            Drag the text to position it on the certificate
          </p>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={previewRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={cn(
          "relative flex-1 overflow-hidden flex items-center justify-center min-h-[400px]",
          isDragging && "cursor-grabbing"
        )}
      >
        {templateUrl ? (
          <>
            <img
              src={templateUrl}
              alt="Certificate template"
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />

            <div
              onMouseDown={handleMouseDown}
              style={{
                position: "absolute",
                left: textPosition.x,
                top: textPosition.y,
                fontFamily: activeFontFamily,
                fontSize: `${fontSize}px`,
                color,
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
              className="px-2 py-1 rounded hover:ring-2 hover:ring-primary"
            >
              {sampleName}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground">Upload a template to preview</p>
        )}
      </div>
    </div>
  );
}
