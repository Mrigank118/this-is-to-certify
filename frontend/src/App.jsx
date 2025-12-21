import CanvasEditor from "./CanvasEditor";

export default function App() {
  return (
    <div className="min-h-screen p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-700">
          Certify ✨
        </h1>
        <button className="bg-indigo-500 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-600">
          Export PDFs
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Controls */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-5 shadow">
          <CanvasEditor controlsOnly />
        </div>

        {/* Canvas Preview */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow flex justify-center items-center">
          <CanvasEditor previewOnly />
        </div>
      </div>
    </div>
  );
}
