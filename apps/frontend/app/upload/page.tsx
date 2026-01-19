export default function UploadPage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">Upload Report</h2>
        <p className="mt-2 text-sm text-slate-500">Drag & drop or use your camera. PDF/JPG/PNG supported.</p>
        <div className="mt-6 flex h-48 items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50 text-emerald-700">
          Drop files here or tap to upload
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-800">Safety</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>Virus + file-type checks before processing.</li>
          <li>Encrypted storage with expiring signed links.</li>
          <li>No medical diagnosis — always consult a doctor.</li>
        </ul>
      </div>
    </div>
  );
}
