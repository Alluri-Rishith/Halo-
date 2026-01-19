const members = [
  { name: "Ravi Sharma", relation: "Self" },
  { name: "Meena Sharma", relation: "Mother" },
  { name: "Arjun Sharma", relation: "Father" },
];

export default function FamilyPage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">Family Profiles</h2>
        <p className="mt-2 text-sm text-slate-500">Manage care for loved ones under one account.</p>
        <ul className="mt-4 grid gap-3">
          {members.map((member) => (
            <li key={member.name} className="rounded-xl border border-slate-100 p-4">
              <p className="font-semibold text-slate-700">{member.name}</p>
              <p className="text-sm text-slate-500">{member.relation}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">Add Member</h3>
        <form className="mt-4 grid gap-3 text-sm">
          <input className="rounded-lg border border-slate-200 px-3 py-2" placeholder="Full name" />
          <input className="rounded-lg border border-slate-200 px-3 py-2" placeholder="Relation" />
          <button type="button" className="rounded-lg bg-emerald-600 px-4 py-2 text-white">
            Save member
          </button>
        </form>
      </div>
    </div>
  );
}
