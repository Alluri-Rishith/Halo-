export default function LoginPage() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-800">Login with OTP</h2>
      <p className="mt-2 text-sm text-slate-500">We only use your phone number for secure access.</p>
      <form className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm">
          Phone number
          <input className="rounded-lg border border-slate-200 px-3 py-2" placeholder="9876543210" />
        </label>
        <label className="grid gap-2 text-sm">
          OTP
          <input className="rounded-lg border border-slate-200 px-3 py-2" placeholder="123456" />
        </label>
        <button type="button" className="rounded-lg bg-emerald-600 px-4 py-2 text-white">
          Verify & Continue
        </button>
      </form>
      <p className="mt-4 text-xs text-slate-500">Demo mode shows mock OTP on request.</p>
    </div>
  );
}
