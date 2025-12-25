import { useState, useCallback } from "react";
import { toast } from "sonner";

const API_BASE = "https://api-certifypro.onrender.com";


interface UploadFile {
  file: File | null;
  status: "idle" | "uploading" | "success" | "error";
  name?: string;
}

export function useGeneratorState() {
  const [templateFile, setTemplateFile] = useState<UploadFile>({ file: null, status: "idle" });
  const [csvFile, setCsvFile] = useState<UploadFile>({ file: null, status: "idle" });
  const [templateUrl, setTemplateUrl] = useState<string | null>(null);

  const [textPosition, setTextPosition] = useState({ x: 300, y: 400 });
  const [font, setFont] = useState("arial.ttf");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#000000");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

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

  const generateCertificates = useCallback(async () => {
    setIsGenerating(true);
    setIsComplete(false);

    try {
      const rgb = color
        .replace("#", "")
        .match(/.{2}/g)!
        .map(v => parseInt(v, 16))
        .join(",");

      const formData = new FormData();
      formData.append("x", textPosition.x.toString());
      formData.append("y", textPosition.y.toString());
      formData.append("font", font);
      formData.append("fontSize", fontSize.toString());
      formData.append("color", rgb);

      const res = await fetch(`${API_BASE}/generate`, {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      console.log("Generate response:", res.status, text);
      
      if (!res.ok) throw new Error();

      setIsComplete(true);
      toast.success("Certificates generated");
    } catch {
      toast.error("Generation failed");
    } finally {
      setIsGenerating(false);
    }
  }, [textPosition, font, fontSize, color]);

  const downloadCertificates = () => {
    window.location.href = `${API_BASE}/download`;
  };

  return {
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
    generateCertificates,
    downloadCertificates,
    canGenerate: templateFile.status === "success" && csvFile.status === "success",
  };
}
