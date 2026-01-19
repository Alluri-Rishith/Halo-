export default function DoctorPage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">Doctor Portal</h2>
        <p className="mt-2 text-sm text-slate-500">Enter the patient access code to view read-only summaries.</p>
        <form className="mt-6 grid gap-3 text-sm">
          <input className="rounded-lg border border-slate-200 px-3 py-2" placeholder="Enter 6-digit code" />
          <button type="button" className="rounded-lg bg-emerald-600 px-4 py-2 text-white">
            View Patient Summary
          </button>
        </form>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">Patient Snapshot</h3>
        <div className="mt-4 grid gap-2 text-sm text-slate-600">
          <p>Medical ID: SV-430210</p>
          <p>Recent Reports: 3</p>
          <p>Disclaimers: No diagnosis. Use clinical judgment.</p>
        </div>
      </div>
    </div>
  );
}
