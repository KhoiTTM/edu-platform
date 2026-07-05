"use client";

interface SessionProgressBarProps {
  currentTurn: number;
  totalTurns: number;
  sessionNumber: number;
}

export function SessionProgressBar({ currentTurn, totalTurns, sessionNumber }: SessionProgressBarProps) {
  const percentage = Math.min((currentTurn / totalTurns) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
        <span>Session {sessionNumber} of 4</span>
        <span>{currentTurn} / {totalTurns} turns</span>
      </div>
      
      <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex gap-1">
        {Array.from({ length: totalTurns }).map((_, i) => (
          <div 
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
              i < currentTurn ? "bg-sky-500" : "bg-surface-raised"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
