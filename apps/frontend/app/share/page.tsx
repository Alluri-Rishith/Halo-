export default function SharePage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">Share Doctor Access</h2>
        <p className="mt-2 text-sm text-slate-500">Generate a 6-digit code that expires in 30 minutes.</p>
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div>
            <p className="text-sm text-emerald-700">Doctor access code</p>
            <p className="text-2xl font-semibold tracking-widest text-emerald-900">482913</p>
          </div>
          <button type="button" className="rounded-lg bg-emerald-600 px-4 py-2 text-white">
            Regenerate
          </button>
        </div>
        <p className="mt-4 text-xs text-slate-500">Only share this with trusted doctors. Every access is logged.</p>
      </div>
    </div>
  );
}
