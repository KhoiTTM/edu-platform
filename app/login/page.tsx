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
    <div className="flex min-h-dvh flex-col bg-slate-950 bg-gradient-to-b from-slate-900/30 to-slate-950">
      <header className="flex items-center justify-between px-4 py-5 sm:px-8 border-b border-slate-900">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-sm font-bold text-white shadow-lg shadow-sky-500/20">
            E
          </span>
          <span className="font-display text-lg font-semibold text-white">
            EduVerse
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-sky-500 hover:text-sky-400"
        >
          ← Back home
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-16 pt-4">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <h1 className="font-display text-2xl font-bold text-white">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {mode === "signin"
                ? "Sign in with the email your teacher shared."
                : "Sign up to start learning. Pick your grade level."}
            </p>

            <div className="mt-6 flex rounded-full bg-slate-950/80 p-1 border border-slate-800">
              <button
                type="button"
                className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
                  mode === "signin"
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setMode("signin")}
              >
                Sign in
              </button>
              <button
                type="button"
                className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
                  mode === "signup"
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/20"
                    : "text-slate-400 hover:text-white"
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
                      className="block text-sm font-medium text-slate-300"
                    >
                      Display name
                    </label>
                    <input
                      id="displayName"
                      type="text"
                      autoComplete="name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 transition focus:border-sky-500 focus:bg-slate-900"
                      placeholder="Alex"
                    />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-slate-300">
                      Grade
                    </span>
                    <div className="mt-2 flex gap-3">
                      {([3, 7] as const).map((g) => (
                        <label
                          key={g}
                          className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border-2 py-3 text-sm font-semibold transition ${
                            grade === g
                              ? "border-sky-500 bg-sky-950/30 text-sky-400"
                              : "border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-white"
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
                  className="block text-sm font-medium text-slate-300"
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
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 transition focus:border-sky-500 focus:bg-slate-900"
                  placeholder="you@school.edu"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300"
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
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 transition focus:border-sky-500 focus:bg-slate-900"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p
                  className="rounded-xl bg-rose-950/30 border border-rose-900/50 px-3 py-2 text-sm text-rose-400 animate-pulse"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-sky-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-700 disabled:opacity-60"
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
            Teachers: run the SQL in <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sky-400">supabase/migrations</code>{" "}
            after creating a Supabase project.
          </p>
        </div>
      </main>
    </div>
  );
}
