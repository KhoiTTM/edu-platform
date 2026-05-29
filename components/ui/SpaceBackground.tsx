import React from 'react';

export const SpaceBackground = () => {
  const stars = [
    { top: '10%', left: '20%', size: '3px', delay: '0s', duration: '3s', color: 'bg-white' },
    { top: '15%', left: '80%', size: '2px', delay: '1s', duration: '4s', color: 'bg-blue-300' },
    { top: '35%', left: '50%', size: '4px', delay: '0.5s', duration: '2s', color: 'bg-yellow-200' },
    { top: '55%', left: '10%', size: '2px', delay: '2s', duration: '5s', color: 'bg-white' },
    { top: '75%', left: '85%', size: '3px', delay: '1.5s', duration: '3s', color: 'bg-red-200' },
    { top: '85%', left: '30%', size: '2px', delay: '0.2s', duration: '4s', color: 'bg-white' },
    { top: '25%', left: '40%', size: '1px', delay: '2.5s', duration: '6s', color: 'bg-blue-200' },
    { top: '65%', left: '70%', size: '4px', delay: '0.8s', duration: '2.5s', color: 'bg-white' },
    { top: '45%', left: '90%', size: '2px', delay: '1.2s', duration: '3.5s', color: 'bg-yellow-100' },
    { top: '5%', left: '60%', size: '3px', delay: '0s', duration: '4.5s', color: 'bg-white' },
    { top: '90%', left: '15%', size: '3px', delay: '0.5s', duration: '3s', color: 'bg-white' },
    { top: '80%', left: '60%', size: '2px', delay: '1s', duration: '4s', color: 'bg-blue-100' },
    { top: '20%', left: '5%', size: '4px', delay: '1.8s', duration: '3s', color: 'bg-white' },
    { top: '12%', left: '95%', size: '1px', delay: '0s', duration: '2s', color: 'bg-white' },
    { top: '50%', left: '30%', size: '3px', delay: '2.2s', duration: '5s', color: 'bg-red-100' },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/80 via-slate-950 to-black"></div>
      
      {/* Nebulas */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-fuchsia-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-cyan-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
      <div className="absolute -bottom-48 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      {/* Planets */}
      {/* Purple Saturn-like */}
      <div className="absolute top-[12%] left-[8%] w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 via-indigo-600 to-slate-900 shadow-[0_0_60px_rgba(139,92,246,0.6)] opacity-90 transition-transform duration-[10000ms] hover:scale-105 hover:rotate-3 pointer-events-auto cursor-default">
        <div className="absolute inset-[-12px] border-[4px] border-x-indigo-300/40 border-y-transparent rounded-full transform -rotate-12 scale-[1.6]"></div>
        <div className="absolute inset-[-24px] border-[2px] border-x-purple-300/20 border-y-transparent rounded-full transform -rotate-12 scale-[1.6]"></div>
        <div className="absolute inset-0 bg-black/20 rounded-full shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.8)]"></div>
      </div>

      {/* Orange Mars-like */}
      <div className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-200 shadow-[0_0_80px_rgba(245,158,11,0.5)] opacity-90 transition-transform duration-[10000ms] hover:scale-105 pointer-events-auto cursor-default">
        <div className="absolute inset-0 bg-black/40 rounded-full shadow-[inset_-25px_-25px_50px_rgba(0,0,0,0.9)]"></div>
        <div className="absolute top-[20%] left-[20%] w-8 h-6 bg-orange-800/30 rounded-full blur-[4px]"></div>
        <div className="absolute bottom-[30%] right-[30%] w-12 h-8 bg-orange-900/30 rounded-full blur-[6px]"></div>
      </div>

      {/* Small Ice Planet */}
      <div className="absolute top-[35%] right-[20%] w-16 h-16 rounded-full bg-gradient-to-br from-cyan-200 to-blue-600 shadow-[0_0_40px_rgba(34,211,238,0.7)] opacity-80 transition-transform duration-[5000ms] hover:rotate-45 pointer-events-auto cursor-default">
        <div className="absolute inset-0 rounded-full shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.7)]"></div>
      </div>

      {/* Distant Red Dwarf */}
      <div className="absolute bottom-[40%] left-[25%] w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-red-800 shadow-[0_0_20px_rgba(225,29,72,0.8)] opacity-60"></div>

      {/* Shooting Star */}
      <div className="absolute top-[10%] left-[60%] w-40 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-45 opacity-0 animate-[shootingStar_10s_infinite]"></div>
      <div className="absolute top-[40%] right-[10%] w-24 h-[2px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent transform -rotate-45 opacity-0 animate-[shootingStar_15s_infinite_5s]"></div>

      {/* Stars */}
      {stars.map((star, i) => (
        <div 
          key={i} 
          className={`absolute ${star.color} rounded-full animate-pulse`}
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
            boxShadow: `0 0 10px rgba(255,255,255,0.8)`
          }}
        ></div>
      ))}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shootingStar {
          0% { transform: translate(0, 0) rotate(-45deg); opacity: 0; }
          5% { opacity: 1; }
          15% { transform: translate(-500px, 500px) rotate(-45deg); opacity: 0; }
          100% { transform: translate(-500px, 500px) rotate(-45deg); opacity: 0; }
        }
      `}} />
    </div>
  );
};
