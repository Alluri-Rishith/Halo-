import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid gap-6">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-emerald-700">SwasthyaVault</h1>
        <p className="mt-3 text-slate-600">
          Your secure medical vault for families. Upload reports, get simple explanations, and share read-only access with doctors.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/login" className="rounded-full bg-emerald-600 px-5 py-2 text-white">
            Get Started
          </Link>
          <Link href="/dashboard" className="rounded-full border border-emerald-600 px-5 py-2 text-emerald-700">
            Demo Dashboard
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {["Secure Vault", "Family Care", "Doctor Access"].map((title) => (
          <div key={title} className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            <p className="mt-2 text-sm text-slate-600">
              Built for India-first care with privacy-by-design and bilingual summaries.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
