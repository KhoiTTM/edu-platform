export default function LoadingHocTap() {
    return (
        <div className="flex min-h-dvh w-full flex-col pb-20 relative text-white bg-surface animate-pulse">
            <div className="mx-auto max-w-6xl w-full px-6 py-12 relative z-10">
                <div className="h-9 w-40 rounded-full bg-white/5 border border-line/60 mb-8" />

                <div className="rounded-3xl border border-line/80 bg-slate-900/40 py-4 px-6 mb-8 h-24" />

                <div className="space-y-16">
                    {[0, 1].map((section) => (
                        <div key={section} className="space-y-6">
                            <div className="h-8 w-48 rounded-lg bg-white/5 border-b border-line/80 pb-3" />
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {[0, 1, 2, 3].map((card) => (
                                    <div
                                        key={card}
                                        className="min-h-[150px] rounded-3xl border-2 border-line/40 bg-slate-900/40"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
