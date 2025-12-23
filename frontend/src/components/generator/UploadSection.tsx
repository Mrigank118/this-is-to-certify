import { useState, useRef } from "react";
import { Upload, FileImage, FileSpreadsheet, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadFile {
  file: File | null;
  status: "idle" | "uploading" | "success" | "error";
  name?: string;
}

interface UploadSectionProps {
  onTemplateUpload: (file: File) => void;
  onCsvUpload: (file: File) => void;
  templateFile: UploadFile;
  csvFile: UploadFile;
}

interface UploadZoneProps {
  label: string;
  description: string;
  accept: string;
  icon: React.ReactNode;
  file: UploadFile;
  onUpload: (file: File) => void;
}

function UploadZone({ label, description, accept, icon, file, onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) onUpload(droppedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) onUpload(selectedFile);
  };

  const getStatusIcon = () => {
    switch (file.status) {
      case "uploading":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case "success":
        return <Check className="h-4 w-4 text-success" />;
      case "error":
        return <X className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <label className="input-label flex items-center gap-2">
        {label}
        {getStatusIcon()}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "upload-zone",
          isDragging && "upload-zone-active",
          file.status === "success" && "border-success/50 bg-success/5"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-2">
          <div className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center transition-colors",
            file.status === "success" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
          {file.name ? (
            <div className="text-center">
              <p className="text-sm font-medium text-foreground truncate max-w-[180px]">{file.name}</p>
              <p className="text-xs text-muted-foreground">Click to replace</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Drop file here</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function UploadSection({ onTemplateUpload, onCsvUpload, templateFile, csvFile }: UploadSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="section-label">Upload Files</h3>
      
      <UploadZone
        label="Certificate Template"
        description="PNG, JPG up to 10MB"
        accept="image/png,image/jpeg,image/jpg"
        icon={<FileImage className="h-5 w-5" />}
        file={templateFile}
        onUpload={onTemplateUpload}
      />

      <UploadZone
        label="Names CSV"
        description="CSV with name column"
        accept=".csv"
        icon={<FileSpreadsheet className="h-5 w-5" />}
        file={csvFile}
        onUpload={onCsvUpload}
      />
    </div>
  );
}
