import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Download, AlertCircle } from "lucide-react";

interface GenerateActionsProps {
  canGenerate: boolean;
  isGenerating: boolean;
  isComplete: boolean;
  onGenerate: () => void;
  onDownload: () => void;
}

export function GenerateActions({
  canGenerate,
  isGenerating,
  isComplete,
  onGenerate,
  onDownload,
}: GenerateActionsProps) {
  return (
    <div className="space-y-3">
      <h3 className="section-label">Actions</h3>

      {!canGenerate && !isComplete && (
        <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg text-sm">
          <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
          <p className="text-foreground">
            Upload both a template and CSV file to enable generation.
          </p>
        </div>
      )}

      <Button
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={!canGenerate || isGenerating}
        onClick={onGenerate}
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate Certificates
          </>
        )}
      </Button>

      {isComplete && (
        <Button
          variant="success"
          size="lg"
          className="w-full"
          onClick={onDownload}
        >
          <Download className="h-4 w-4" />
          Download Certificates
        </Button>
      )}
    </div>
  );
}
