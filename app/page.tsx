import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-brand-50 via-white to-rose-50">
      <div
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent-mint/20 blur-3xl"
        aria-hidden
      />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white shadow-lg shadow-brand-600/25">
            B
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-slate-900">
            BrightPath
          </span>
        </div>
        <Link
          href="/login"
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700 active:scale-[0.98]"
        >
          Student login
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800">
              Grades 3 &amp; 7
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Learn at your pace, shine in every lesson.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Your personal hub for schedules, PDF readings, video lessons,
              quizzes, and progress — optimized for tablets and iPads.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
              >
                Go to dashboard
              </Link>
            </div>
            <ul className="mt-14 grid gap-4 sm:grid-cols-2">
              {[
                "Weekly lesson schedule",
                "Built-in PDF reader",
                "YouTube lessons embedded safely",
                "Quizzes with instant scoring",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-card backdrop-blur"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-mint/20 text-sm text-emerald-700">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl border border-slate-200/80 bg-white p-4 shadow-card-lg sm:p-6">
              <div className="flex h-full flex-col rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white sm:p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-brand-300">
                  Today
                </p>
                <p className="mt-1 font-display text-2xl font-bold">Wednesday</p>
                <div className="mt-6 space-y-3">
                  {[
                    { t: "9:00", s: "Math — Fractions fun" },
                    { t: "10:15", s: "Reading — Story time" },
                    { t: "1:00", s: "Science — Weather lab" },
                  ].map((row) => (
                    <div
                      key={row.t}
                      className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur"
                    >
                      <span className="text-sm font-semibold text-brand-200">
                        {row.t}
                      </span>
                      <span className="text-sm text-slate-100">{row.s}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm text-slate-300">Quiz avg.</span>
                  <span className="font-display text-2xl font-bold text-accent-amber">
                    92%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
