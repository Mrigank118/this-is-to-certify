import { Move } from "lucide-react";

interface PositioningControlsProps {
  x: number;
  y: number;
}

export function PositioningControls({ x, y }: PositioningControlsProps) {
  return (
    <div className="space-y-3">
      <h3 className="section-label">Text Position</h3>
      
      <div className="card-elevated p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Move className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Drag to Position</p>
            <p className="text-xs text-muted-foreground">Move text on the canvas</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">X Position</p>
            <p className="text-lg font-semibold text-foreground">{Math.round(x)}</p>
          </div>
          <div className="bg-muted rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Y Position</p>
            <p className="text-lg font-semibold text-foreground">{Math.round(y)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
