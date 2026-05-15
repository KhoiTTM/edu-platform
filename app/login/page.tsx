"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Grade } from "@/types/database";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [grade, setGrade] = useState<Grade>(3);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error: signErr } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName || email.split("@")[0],
              grade,
            },
          },
        });
        if (signErr) throw signErr;
      } else {
        const { error: inErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (inErr) throw inErr;
      }
      router.refresh();
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-b from-brand-50 to-white">
      <header className="flex items-center justify-between px-4 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            B
          </span>
          <span className="font-display text-lg font-semibold text-slate-900">
            BrightPath
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          ← Back home
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-16 pt-4">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card-lg sm:p-8">
            <h1 className="font-display text-2xl font-bold text-slate-900">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {mode === "signin"
                ? "Sign in with the email your teacher shared."
                : "Sign up to start learning. Pick your grade level."}
            </p>

            <div className="mt-6 flex rounded-full bg-slate-100 p-1">
              <button
                type="button"
                className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
                  mode === "signin"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600"
                }`}
                onClick={() => setMode("signin")}
              >
                Sign in
              </button>
              <button
                type="button"
                className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
                  mode === "signup"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600"
                }`}
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {mode === "signup" && (
                <>
                  <div>
                    <label
                      htmlFor="displayName"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Display name
                    </label>
                    <input
                      id="displayName"
                      type="text"
                      autoComplete="name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none ring-brand-500/30 transition focus:border-brand-500 focus:bg-white focus:ring-4"
                      placeholder="Alex"
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-slate-700">
                      Grade
                    </span>
                    <div className="mt-2 flex gap-3">
                      {([3, 7] as const).map((g) => (
                        <label
                          key={g}
                          className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border-2 py-3 text-sm font-semibold transition ${
                            grade === g
                              ? "border-brand-500 bg-brand-50 text-brand-900"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="grade"
                            className="sr-only"
                            checked={grade === g}
                            onChange={() => setGrade(g)}
                          />
                          Grade {g}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none ring-brand-500/30 transition focus:border-brand-500 focus:bg-white focus:ring-4"
                  placeholder="you@school.edu"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none ring-brand-500/30 transition focus:border-brand-500 focus:bg-white focus:ring-4"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p
                  className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 disabled:opacity-60"
              >
                {loading
                  ? "Please wait…"
                  : mode === "signin"
                    ? "Sign in"
                    : "Create account"}
              </button>
            </form>
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">
            Teachers: run the SQL in <code className="text-slate-700">supabase/migrations</code>{" "}
            after creating a Supabase project.
          </p>
        </div>
      </main>
    </div>
  );
}
