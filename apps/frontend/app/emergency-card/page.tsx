export default function EmergencyCardPage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">Emergency Card</h2>
        <p className="mt-2 text-sm text-slate-500">Printable offline card for quick access.</p>
        <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 p-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Medical ID</p>
            <p className="text-xl font-semibold text-slate-800">SV-430210</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Name</p>
            <p className="text-lg font-semibold text-slate-800">Ravi Sharma</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
            QR Code placeholder (offline) + call emergency contact.
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">Not a medical diagnosis. Seek professional help.</p>
      </div>
    </div>
  );
}
