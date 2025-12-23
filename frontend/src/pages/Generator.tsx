import { Layout } from "@/components/layout/Layout";
import { UploadSection } from "@/components/generator/UploadSection";
import { TextCustomization } from "@/components/generator/TextCustomization";
import { PositioningControls } from "@/components/generator/PositioningControls";
import { GenerateActions } from "@/components/generator/GenerateActions";
import { CertificateCanvas } from "@/components/generator/CertificateCanvas";
import { useGeneratorState } from "@/hooks/useGeneratorState";
import { Separator } from "@/components/ui/separator";

export default function Generator() {
  const {
    templateFile,
    csvFile,
    templateUrl,
    textPosition,
    font,
    fontSize,
    color,
    customFont,
    isGenerating,
    isComplete,
    canGenerate,
    uploadTemplate,
    uploadCsv,
    setCustomFont,
    setTextPosition,
    setFont,
    setFontSize,
    setColor,
    generateCertificates,
    downloadCertificates,
  } = useGeneratorState();

  return (
    <Layout showFooter={false}>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Left Sidebar */}
        <aside className="w-80 border-r border-border bg-card overflow-y-auto flex-shrink-0">
          <div className="p-6 space-y-6">
            <UploadSection
              templateFile={templateFile}
              csvFile={csvFile}
              onTemplateUpload={uploadTemplate}
              onCsvUpload={uploadCsv}
            />

            <Separator />

            <TextCustomization
              font={font}
              fontSize={fontSize}
              color={color}
              customFont={customFont}
              onFontChange={setFont}
              onFontSizeChange={setFontSize}
              onCustomFontUpload={setCustomFont}
              onColorChange={setColor}
            />

            <Separator />

            <PositioningControls x={textPosition.x} y={textPosition.y} />

            <Separator />

            <GenerateActions
              canGenerate={canGenerate}
              isGenerating={isGenerating}
              isComplete={isComplete}
              onGenerate={generateCertificates}
              onDownload={downloadCertificates}
            />
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 p-6 overflow-hidden">
          <CertificateCanvas
            templateUrl={templateUrl}
            textPosition={textPosition}
            onPositionChange={setTextPosition}
            font={font}
            fontSize={fontSize}
            color={color}
            customFont={customFont}
            sampleName="John Doe"
          />
        </main>
      </div>
    </Layout>
  );
}
