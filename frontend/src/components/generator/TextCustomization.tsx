import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Upload, X, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fonts = [
  { value: "arial", label: "Arial" },
  { value: "times-new-roman", label: "Times New Roman" },
  { value: "georgia", label: "Georgia" },
  { value: "helvetica", label: "Helvetica" },
  { value: "courier-new", label: "Courier New" },
  { value: "verdana", label: "Verdana" },
  { value: "palatino", label: "Palatino" },
  { value: "garamond", label: "Garamond" },
];

const presetColors = [
  { value: "#000000", label: "Black" },
  { value: "#1a1a2e", label: "Dark Navy" },
  { value: "#0d7377", label: "Teal" },
  { value: "#14274e", label: "Deep Blue" },
  { value: "#9b2335", label: "Burgundy" },
  { value: "#c9a227", label: "Gold" },
  { value: "#4a4a4a", label: "Charcoal" },
  { value: "#2d3436", label: "Graphite" },
];

interface CustomFont {
  name: string;
  file: File;
  url: string;
}

interface TextCustomizationProps {
  font: string;
  fontSize: number;
  color: string;
  customFont: CustomFont | null;
  onFontChange: (font: string) => void;
  onFontSizeChange: (size: number) => void;
  onColorChange: (color: string) => void;
  onCustomFontUpload: (font: CustomFont | null) => void;
}

export function TextCustomization({
  font,
  fontSize,
  color,
  customFont,
  onFontChange,
  onFontSizeChange,
  onColorChange,
  onCustomFontUpload,
}: TextCustomizationProps) {
  const fontInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingFont, setIsLoadingFont] = useState(false);

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['.ttf', '.otf', '.woff', '.woff2'];
    const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!validTypes.includes(ext)) {
      return;
    }

    setIsLoadingFont(true);

    try {
      const fontUrl = URL.createObjectURL(file);
      const fontName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "");
      
      // Load the font using FontFace API
      const fontFace = new FontFace(fontName, `url(${fontUrl})`);
      await fontFace.load();
      document.fonts.add(fontFace);

      onCustomFontUpload({
        name: fontName,
        file,
        url: fontUrl,
      });
      onFontChange(`custom-${fontName}`);
    } catch (error) {
      console.error("Failed to load font:", error);
    } finally {
      setIsLoadingFont(false);
    }
  };

  const removeCustomFont = () => {
    if (customFont?.url) {
      URL.revokeObjectURL(customFont.url);
    }
    onCustomFontUpload(null);
    onFontChange("arial");
  };

  return (
    <div className="space-y-5">
      <h3 className="section-label">Text Customization</h3>

      {/* Font Selection */}
      <div className="space-y-2">
        <Label className="input-label">Font Family</Label>
        <Select 
          value={font.startsWith('custom-') ? 'custom' : font} 
          onValueChange={(val) => {
            if (val !== 'custom') {
              onFontChange(val);
            }
          }}
        >
          <SelectTrigger className="w-full bg-card">
            <SelectValue placeholder="Select font">
              {font.startsWith('custom-') && customFont 
                ? `Custom: ${customFont.file.name}` 
                : fonts.find(f => f.value === font)?.label || "Select font"
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {fonts.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                <span style={{ fontFamily: f.label }}>{f.label}</span>
              </SelectItem>
            ))}
            {customFont && (
              <SelectItem value="custom">
                <span className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-success" />
                  Custom: {customFont.file.name}
                </span>
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Custom Font Upload */}
      <div className="space-y-2">
        <Label className="input-label">Custom Font</Label>
        <input
          ref={fontInputRef}
          type="file"
          accept=".ttf,.otf,.woff,.woff2"
          onChange={handleFontUpload}
          className="hidden"
        />
        
        {customFont ? (
          <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
            <Check className="h-4 w-4 text-success flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {customFont.file.name}
              </p>
              <p className="text-xs text-muted-foreground">Custom font loaded</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
              onClick={removeCustomFont}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => fontInputRef.current?.click()}
            disabled={isLoadingFont}
          >
            <Upload className="h-4 w-4" />
            {isLoadingFont ? "Loading font..." : "Upload Custom Font"}
          </Button>
        )}
        <p className="text-xs text-muted-foreground">
          Supports TTF, OTF, WOFF, WOFF2 formats
        </p>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="input-label mb-0">Font Size</Label>
          <span className="text-sm font-medium text-foreground bg-muted px-2 py-0.5 rounded">
            {fontSize}px
          </span>
        </div>
        <Slider
          value={[fontSize]}
          onValueChange={([value]) => onFontSizeChange(value)}
          min={12}
          max={120}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>12px</span>
          <span>120px</span>
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <Label className="input-label">Text Color</Label>
        
        {/* Color Presets */}
        <div className="grid grid-cols-4 gap-2">
          {presetColors.map((preset) => (
            <button
              key={preset.value}
              onClick={() => onColorChange(preset.value)}
              className={`h-8 w-full rounded-md border-2 transition-all ${
                color === preset.value 
                  ? "border-primary ring-2 ring-primary/20" 
                  : "border-transparent hover:border-border"
              }`}
              style={{ backgroundColor: preset.value }}
              title={preset.label}
            />
          ))}
        </div>

        {/* Custom Color Input */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="h-9 w-9 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
            />
          </div>
          <input
            type="text"
            value={color.toUpperCase()}
            onChange={(e) => onColorChange(e.target.value)}
            className="flex-1 h-9 px-3 text-sm rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  );
}
