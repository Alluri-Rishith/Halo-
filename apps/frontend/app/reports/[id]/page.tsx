const highlights = [
  { name: "Hemoglobin", value: "11 g/dL", range: "12-16", status: "Low" },
  { name: "Fasting Glucose", value: "95 mg/dL", range: "70-100", status: "Normal" },
];

export default function ReportPage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">Report Explanation</h2>
        <p className="mt-2 text-sm text-slate-500">This summary is for understanding only.</p>
        <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
          Your hemoglobin appears low. Consider discussing diet and supplements with your doctor.
        </div>
        <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
          हिंदी सारांश: यह रिपोर्ट सामान्य से थोड़ी कम हीमोग्लोबिन दर्शाती है।
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-800">Highlights</h3>
        <div className="mt-4 grid gap-3">
          {highlights.map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
              <div>
                <p className="font-semibold text-slate-700">{item.name}</p>
                <p className="text-sm text-slate-500">Range: {item.range}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-700">{item.value}</p>
                <p className="text-sm text-emerald-600">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
