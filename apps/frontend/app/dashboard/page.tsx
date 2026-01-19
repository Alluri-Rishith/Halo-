const insights = [
  { title: "Latest Report", value: "Blood Test - 2 days ago" },
  { title: "Risk Flags", value: "1 pending review" },
  { title: "Family Members", value: "3 profiles" },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">Health Insights</h2>
        <p className="mt-2 text-sm text-slate-500">Simple summaries with no medical diagnosis.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {insights.map((insight) => (
            <div key={insight.title} className="rounded-xl border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">{insight.title}</p>
              <p className="mt-2 text-lg font-semibold text-slate-700">{insight.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-800">Recent Uploads</h3>
        <ul className="mt-4 grid gap-3 text-sm text-slate-600">
          <li className="rounded-lg border border-slate-100 p-3">Thyroid Panel - Ready</li>
          <li className="rounded-lg border border-slate-100 p-3">CBC - Processing</li>
        </ul>
      </div>
    </div>
  );
}
