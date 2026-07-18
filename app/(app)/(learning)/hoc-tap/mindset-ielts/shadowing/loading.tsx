export default function LoadingShadowing() {
    return (
        <div className="flex min-h-dvh w-full flex-col pb-20 relative text-white bg-surface animate-pulse">
            <div className="mx-auto max-w-6xl w-full px-6 py-12 relative z-10 space-y-6">
                <div className="h-9 w-40 rounded-full bg-white/5 border border-line/60" />
                <div className="rounded-2xl border border-line/80 bg-slate-900/40 aspect-video w-full" />
                <div className="space-y-3">
                    {[0, 1, 2, 3].map((row) => (
                        <div key={row} className="h-14 rounded-xl border border-line/40 bg-slate-900/40" />
                    ))}
                </div>
            </div>
        </div>
    );
}
