import { useRef, useState, useEffect } from "react";

export default function CanvasEditor({ controlsOnly, previewOnly }) {
  const canvasRef = useRef();
  const [img, setImg] = useState(null);
  const [pos, setPos] = useState({ x: 400, y: 300 });
  const [drag, setDrag] = useState(false);
  const [color, setColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(48);

  useEffect(() => {
    if (!img || !previewOnly) return;
    const ctx = canvasRef.current.getContext("2d");

    canvasRef.current.width = img.width;
    canvasRef.current.height = img.height;

    ctx.clearRect(0, 0, img.width, img.height);
    ctx.drawImage(img, 0, 0);
    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText("Sample Name", pos.x, pos.y);
  }, [img, pos, color, fontSize, previewOnly]);

  if (controlsOnly) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-slate-700">
          Controls
        </h2>

        <label className="block text-sm text-slate-600">
          Certificate Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full text-sm"
          onChange={(e) => {
            const i = new Image();
            i.src = URL.createObjectURL(e.target.files[0]);
            i.onload = () => setImg(i);
          }}
        />

        <div>
          <label className="text-sm text-slate-600">Font Size</label>
          <input
            type="range"
            min="20"
            max="100"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Text Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <p className="text-xs text-slate-400">
          Drag the name on preview →
        </p>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={() => setDrag(true)}
      onMouseUp={() => setDrag(false)}
      onMouseMove={(e) => {
        if (!drag) return;
        const r = canvasRef.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="border-2 border-dashed border-slate-300 rounded-xl max-w-full"
    />
  );
}
