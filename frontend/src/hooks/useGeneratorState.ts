import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE;

interface UploadFile {
  file: File | null;
  status: "idle" | "uploading" | "success" | "error";
  name?: string;
}

interface CustomFont {
  name: string;
  file: File;
  url: string;
}

export function useGeneratorState() {
  // 🔹 PREVIEW REF (correct place)
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [templateFile, setTemplateFile] = useState<UploadFile>({
    file: null,
    status: "idle",
  });

  const [csvFile, setCsvFile] = useState<UploadFile>({
    file: null,
    status: "idle",
  });

  const [templateUrl, setTemplateUrl] = useState<string | null>(null);

  const [textPosition, setTextPosition] = useState({ x: 300, y: 400 });
  const [font, setFont] = useState("arial");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#000000");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

const [customFont, setCustomFont] = useState<CustomFont | null>(null);

  // -------------------------
  // Upload template
  // -------------------------
  const uploadTemplate = useCallback(async (file: File) => {
    setTemplateFile({ file, status: "uploading", name: file.name });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/upload/template`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      setTemplateFile({ file, status: "success", name: file.name });
      setTemplateUrl(URL.createObjectURL(file));
      toast.success("Template uploaded");
    } catch {
      setTemplateFile({ file: null, status: "error" });
      toast.error("Template upload failed");
    }
  }, []);

  // -------------------------
  // Upload CSV
  // -------------------------
  const uploadCsv = useCallback(async (file: File) => {
    setCsvFile({ file, status: "uploading", name: file.name });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/upload/csv`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      setCsvFile({ file, status: "success", name: file.name });
      toast.success("CSV uploaded");
    } catch {
      setCsvFile({ file: null, status: "error" });
      toast.error("CSV upload failed");
    }
  }, []);

  // -------------------------
  // Generate certificates
  // -------------------------
  const generateCertificates = useCallback(async () => {
    setIsGenerating(true);
    setIsComplete(false);
    setJobId(null);

    try {
      const preview = previewRef.current;
      if (!preview) {
        toast.error("Preview not ready yet");
        return;
      }

      const previewWidth = preview.offsetWidth;
      const previewHeight = preview.offsetHeight;

      const xRatio = textPosition.x / previewWidth;
      const yRatio = textPosition.y / previewHeight;
      const fontRatio = fontSize / previewWidth;

      const rgb = color
        .replace("#", "")
        .match(/.{2}/g)!
        .map(v => parseInt(v, 16))
        .join(",");

      const formData = new FormData();
      formData.append("x", xRatio.toString());
      formData.append("y", yRatio.toString());
      formData.append("font", font);
      formData.append("fontSize", fontRatio.toString());
      formData.append("color", rgb);

      const res = await fetch(`${API_BASE}/generate`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setJobId(data.jobId);

      setIsComplete(true);
      toast.success("Certificates generated");
    } catch {
      toast.error("Generation failed");
    } finally {
      setIsGenerating(false);
    }
  }, [textPosition, font, fontSize, color]);

  // -------------------------
  // Download certificates
  // -------------------------
  const downloadCertificates = () => {
    if (!jobId) {
      toast.error("No generation job found");
      return;
    }

    window.location.href = `${API_BASE}/download/${jobId}`;
  };

  return {
    previewRef, // 🔥 IMPORTANT
    templateFile,
    csvFile,
    templateUrl,
    textPosition,
    font,
    fontSize,
    color,
    isGenerating,
    isComplete,
    uploadTemplate,
    uploadCsv,
    setTextPosition,
    setFont,
    setFontSize,
    setColor,
    customFont,
    setCustomFont,
    generateCertificates,
    downloadCertificates,
    canGenerate:
      templateFile.status === "success" && csvFile.status === "success",
  };
}
