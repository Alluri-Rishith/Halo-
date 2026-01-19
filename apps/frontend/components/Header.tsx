import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/upload", label: "Upload" },
  { href: "/family", label: "Family" },
  { href: "/share", label: "Share" },
  { href: "/doctor", label: "Doctor" },
  { href: "/emergency-card", label: "Emergency Card" },
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-emerald-700">
          SwasthyaVault
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-600">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-emerald-700">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
