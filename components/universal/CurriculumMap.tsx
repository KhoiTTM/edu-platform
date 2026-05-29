"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Lock, CheckCircle2, Play, BookOpen, Crown, Gift, Sparkles } from "lucide-react";

interface PathNode {
  id: string;
  title: string;
  slug: string;
  type: string;
  parent_id?: string;
  learning_path_nodes?: {
    position_x: number;
    position_y: number;
    node_type: string;
    visual_theme: string;
  }[];
}

interface CurriculumMapProps {
  nodes: PathNode[];
  subjectSlug: string;
}

export function CurriculumMap({ nodes, subjectSlug }: CurriculumMapProps) {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(() => {
    // Default expand the first unit
    const firstUnit = nodes.find(n => n.type === 'unit');
    return new Set(firstUnit ? [firstUnit.id] : []);
  });

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => {
      const next = new Set(prev);
      if (next.has(unitId)) next.delete(unitId);
      else next.add(unitId);
      return next;
    });
  };

  // Filter visible nodes based on expansion
  const visibleNodes = nodes.filter(n => {
    if (n.type === 'unit') return true;
    if ((n.type === 'lesson' || n.type === 'exam') && n.parent_id) {
      return expandedUnits.has(n.parent_id);
    }
    return true;
  });

  const positions: { x: number, y: number, isUnit: boolean }[] = [];
  let currentY = 100;
  let lessonCounter = 0;

  // With map width 600px, center is 300px
  visibleNodes.forEach((node, i) => {
    const isUnit = node.type === 'unit';
    let x = 300; // Center default
    
    if (isUnit) {
      x = 300; // Units are always centered
      if (i > 0) currentY += 150; // Extra space before a unit (Reduced for higher density)
      lessonCounter = 0; // Reset zigzag counter for lessons in this unit
    } else if (node.type === 'exam') {
      x = 300; // Exams are centered at the end of the chapter
      currentY += 120; // Reduced for density
    } else {
      // Lessons zigzag very widely to make it much more winding, but closer vertically
      const pattern = [140, 460, 170, 430, 110, 490];
      x = pattern[lessonCounter % pattern.length];
      currentY += 100; // Standard space between lessons (Reduced from 160)
      lessonCounter++;
    }
    
    positions.push({ x, y: currentY, isUnit });
  });

  const pathHeight = positions.length > 0 ? positions[positions.length - 1].y + 180 : 500;

  // Build SVG Paths for the 3D Road Effect
  let dPath = "";
  if (positions.length > 0) {
    let prev = positions[0];
    dPath = `M ${prev.x} ${prev.y}`;

    for (let i = 1; i < positions.length; i++) {
      const curr = positions[i];
      const distY = curr.y - prev.y;
      
      const cp1Y = prev.y + (distY * 0.5);
      const cp2Y = curr.y - (distY * 0.5);
      
      if (curr.isUnit || prev.isUnit) {
        // Curved transition
        dPath += ` C ${prev.x} ${cp1Y}, ${curr.x} ${cp2Y}, ${curr.x} ${curr.y}`;
      } else {
        // Exaggerated Zig-zag curve for winding path (adjusted for tighter Y spacing)
        const cp1X = prev.x + (i % 2 === 0 ? 100 : -100);
        const cp2X = curr.x + (i % 2 === 0 ? -100 : 100);
        dPath += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${curr.x} ${curr.y}`;
      }
      prev = curr;
    }
  }

  // Predefined positions for decorative background items based on path height
  const decorationTypes = ["lollipop", "cookie", "shroom", "star", "flower", "wrapped_candy", "swirl_candy"];
  const decorations: { x: number; y: number; type: string; scale: number }[] = [];
  for (let y = 60; y < pathHeight - 60; y += 70) { 
    // Pseudo-random deterministic values based on y
    const rand1 = Math.abs(Math.sin(y * 1.23)) * decorationTypes.length;
    const rand2 = Math.abs(Math.cos(y * 2.34)) * decorationTypes.length;
    const rand3 = Math.abs(Math.sin(y * 3.45)) * decorationTypes.length;

    // Left side decors
    decorations.push({
      x: 50 + Math.sin(y) * 40,
      y: y + Math.cos(y) * 20,
      type: decorationTypes[Math.floor(rand1) % decorationTypes.length],
      scale: 0.9 + (Math.sin(y) * 0.3)
    });
    // Right side decors
    decorations.push({
      x: 550 + Math.cos(y) * 40,
      y: y + 40 + Math.sin(y) * 20,
      type: decorationTypes[Math.floor(rand2) % decorationTypes.length],
      scale: 0.9 + (Math.cos(y) * 0.3)
    });
    // Extra random decors far out
    if (y % 140 === 0) {
      decorations.push({
        x: Math.sin(y) > 0 ? 30 : 570,
        y: y + 60,
        type: decorationTypes[Math.floor(rand3) % decorationTypes.length],
        scale: 1.2
      });
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto py-10 flex justify-center select-none">
      
      {/* Outer Adventure Board Frame - Candy Theme */}
      <div 
        className="relative w-full rounded-[2.5rem] overflow-hidden border-[12px] border-white shadow-[0_25px_60px_rgba(236,72,153,0.4)] bg-gradient-to-b from-sky-300 via-pink-300 to-fuchsia-300 transition-all duration-500"
        style={{ height: pathHeight }}
      >
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_20%,transparent_21%)] bg-[size:40px_40px]"></div>
        
        {/* Fluffy Candy Clouds in Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-[-20px] w-48 h-16 bg-white/40 rounded-full blur-[4px] animate-[pulse_6s_infinite]"></div>
          <div className="absolute top-10 left-10 w-32 h-20 bg-white/40 rounded-full blur-[4px] animate-[pulse_6s_infinite] delay-75"></div>
          
          <div className="absolute top-1/3 right-[-30px] w-40 h-16 bg-white/40 rounded-full blur-[4px] animate-[pulse_8s_infinite]"></div>
          <div className="absolute top-1/3 right-10 w-24 h-24 bg-white/40 rounded-full blur-[4px] animate-[pulse_8s_infinite] delay-150"></div>
          
          <div className="absolute bottom-20 left-10 w-36 h-14 bg-white/40 rounded-full blur-[4px] animate-[pulse_5s_infinite]"></div>
        </div>

        {/* Decorative Floating Elements */}
        {decorations.map((dec, idx) => (
          <div 
            key={idx} 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform hover:scale-110 duration-300"
            style={{ 
              left: `${dec.x}px`, 
              top: `${dec.y}px`,
              transform: `translate(-50%, -50%) scale(${dec.scale})` 
            }}
          >
            {dec.type === "lollipop" && (
              <div className="flex flex-col items-center opacity-95 scale-125">
                <div className="w-10 h-10 rounded-full bg-[conic-gradient(#ec4899_0deg_45deg,#fff_45deg_90deg,#ec4899_90deg_135deg,#fff_135deg_180deg,#ec4899_180deg_225deg,#fff_225deg_270deg,#ec4899_270deg_315deg,#fff_315deg_360deg)] border-2 border-white shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)]"></div>
                </div>
                <div className="w-2 h-10 bg-white rounded-full -mt-1 border border-slate-200/50 shadow-sm z-[-1]"></div>
              </div>
            )}
            {dec.type === "cookie" && (
              <div className="w-10 h-10 rounded-full bg-amber-600/90 border-[3px] border-amber-800/40 shadow-lg flex flex-wrap p-1.5 gap-1 items-center justify-center rotate-12 opacity-95">
                <div className="w-2 h-2 rounded-full bg-amber-950"></div>
                <div className="w-2 h-2 rounded-full bg-amber-950"></div>
                <div className="w-2 h-2 rounded-full bg-amber-950"></div>
              </div>
            )}
            {dec.type === "shroom" && (
              <div className="flex flex-col items-center opacity-95 rotate-12 scale-110">
                <div className="w-12 h-8 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-t-full border-2 border-white shadow-lg relative flex items-center justify-center overflow-hidden">
                  <div className="absolute top-1 left-2 w-3 h-3 rounded-full bg-white/80"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/80"></div>
                </div>
                <div className="w-6 h-4 bg-amber-100/90 rounded-b-md border-x-2 border-b-2 border-white -mt-0.5"></div>
              </div>
            )}
            {dec.type === "star" && (
              <Sparkles size={28} className="text-yellow-400 fill-yellow-300 drop-shadow-[0_2px_6px_rgba(250,204,21,0.6)] animate-pulse" />
            )}
            {dec.type === "flower" && (
              <div className="relative w-10 h-10 flex items-center justify-center opacity-90">
                <div className="absolute w-4 h-4 rounded-full bg-yellow-400 z-10 border-2 border-white"></div>
                <div className="absolute w-4 h-4 rounded-full bg-pink-400 -top-1.5 border-2 border-white"></div>
                <div className="absolute w-4 h-4 rounded-full bg-sky-400 -bottom-1.5 border-2 border-white"></div>
                <div className="absolute w-4 h-4 rounded-full bg-purple-400 -left-1.5 border-2 border-white"></div>
                <div className="absolute w-4 h-4 rounded-full bg-emerald-400 -right-1.5 border-2 border-white"></div>
              </div>
            )}
            {dec.type === "wrapped_candy" && (
              <div className="flex items-center justify-center opacity-95 rotate-45 scale-125">
                <div className="w-0 h-0 border-y-[12px] border-y-transparent border-r-[16px] border-r-pink-500 -mr-2 z-0"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 border-2 border-white shadow-lg z-10 overflow-hidden">
                  <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.4)_4px,rgba(255,255,255,0.4)_8px)]"></div>
                </div>
                <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[16px] border-l-pink-500 -ml-2 z-0"></div>
              </div>
            )}
            {dec.type === "swirl_candy" && (
              <div className="flex items-center justify-center opacity-95 -rotate-12 scale-110">
                 <div className="w-9 h-9 rounded-full bg-[conic-gradient(#38bdf8_0deg_90deg,#fff_90deg_180deg,#38bdf8_180deg_270deg,#fff_270deg_360deg)] border-2 border-white shadow-md"></div>
              </div>
            )}
          </div>
        ))}

        {/* 3D Road / SVG Path (Centered dynamically in 600px space) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-center">
          <svg 
            width="600" 
            height={pathHeight} 
            className="overflow-visible"
            fill="none" 
          >
            {/* 3D Road Bottom Depth Shadow */}
            <path 
              d={dPath} 
              stroke="#db2777"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 3D Road Main Candy Body */}
            <path 
              d={dPath} 
              stroke="#fbcfe8"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 3D Road Center Walk Path */}
            <path 
              d={dPath} 
              stroke="#ffffff"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dash center lines */}
            <path 
              d={dPath} 
              stroke="#f472b6"
              strokeWidth="4"
              strokeDasharray="8 14"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Nodes Layer */}
        <div className="relative z-10 w-full h-full">
          {visibleNodes.map((node, i) => {
            const pos = positions[i];
            const isUnitNode = node.type === 'unit';
            const leftOffset = `${pos.x}px`;
            const topOffset = `${pos.y}px`;
            
            // Unlocked state (demo logic: first few unlocked, others too)
            const isUnlocked = true; 
            const isCompleted = i === 0 || i === 1;
            
            // Icon
            const Icon = node.type === 'lesson' ? Play : (node.type === 'chapter' ? Crown : BookOpen);
            const isExpanded = expandedUnits.has(node.id);
            
            return (
              <div 
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer ${isUnitNode ? 'w-36 h-36' : 'w-24 h-24'}`}
                style={{ left: leftOffset, top: topOffset }}
              >
                {/* Tooltip */}
                <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-slate-900/95 text-white text-sm font-bold px-4 py-2 rounded-xl border border-slate-700 shadow-2xl z-20">
                  {node.title}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-b border-r border-slate-700 rotate-45"></div>
                </div>

                {isUnitNode ? (
                  /* 3D Unit Giant Candy Button */
                  <div className="relative flex flex-col items-center">
                    <button 
                      onClick={() => toggleUnit(node.id)}
                      className={`
                        relative flex items-center justify-center transition-all duration-150 active:translate-y-[4px]
                        hover:scale-105 w-32 h-24
                      `}
                    >
                      <div className="flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform">
                        <div className={`w-0 h-0 border-y-[24px] border-y-transparent border-r-[32px] ${isUnlocked ? 'border-r-pink-500' : 'border-r-slate-400'} -mr-3 z-0`}></div>
                        <div className={`w-24 h-24 rounded-full ${isUnlocked ? 'bg-gradient-to-tr from-pink-400 via-rose-500 to-fuchsia-600 shadow-[0_10px_0_#9d174d]' : 'bg-slate-300 shadow-[0_10px_0_#94a3b8]'} shadow-inner flex items-center justify-center z-10 border-[5px] border-white relative overflow-hidden`}>
                           {/* Stripes */}
                           {isUnlocked && <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_12px,rgba(255,255,255,0.3)_12px,rgba(255,255,255,0.3)_24px)]"></div>}
                           {/* Top shine effect */}
                           <div className="absolute top-1.5 left-3 right-3 h-4 bg-white/50 rounded-full pointer-events-none"></div>
                           <div className={isUnlocked ? 'text-white drop-shadow-[0_2px_4px_rgba(157,23,77,0.8)] z-10' : 'text-slate-400 z-10'}>
                             <Icon size={48} fill={isUnlocked ? "currentColor" : "none"} className={isUnlocked ? "animate-pulse" : ""} />
                           </div>
                           {/* Expand / Collapse Indicator */}
                           <div className="absolute -bottom-5 bg-rose-500 border-2 border-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-transform duration-300 z-20" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-white">
                               <path d="M6 9l6 6 6-6" />
                             </svg>
                           </div>
                        </div>
                        <div className={`w-0 h-0 border-y-[24px] border-y-transparent border-l-[32px] ${isUnlocked ? 'border-l-pink-500' : 'border-l-slate-400'} -ml-3 z-0`}></div>
                      </div>
                    </button>
                  </div>
                ) : node.type === 'exam' ? (
                  /* 3D Big Purple Candy for Exam Node */
                  <Link 
                    href={`/learn/${subjectSlug}/${node.slug}`}
                    className={`
                      relative flex items-center justify-center transition-all duration-150 active:translate-y-[4px]
                      hover:scale-110 w-24 h-20
                    `}
                  >
                    <div className="flex items-center justify-center rotate-6 group-hover:rotate-12 transition-transform">
                      <div className="w-0 h-0 border-y-[18px] border-y-transparent border-r-[24px] border-r-purple-500 -mr-3 z-0"></div>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-violet-500 shadow-[0_8px_0_#9333ea] shadow-inner flex items-center justify-center z-10 border-[5px] border-white relative overflow-hidden">
                        {/* Glowing effect background */}
                        <div className="absolute inset-0 bg-fuchsia-400/40 rounded-full blur-md animate-pulse pointer-events-none"></div>
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(255,255,255,0.2)_10px,rgba(255,255,255,0.2)_20px)]"></div>
                        <div className="absolute top-1.5 left-2.5 right-2.5 h-3 bg-white/60 rounded-full pointer-events-none"></div>
                        <div className="text-white drop-shadow-[0_2px_6px_rgba(147,51,234,0.9)] z-10">
                          <Gift size={38} fill="currentColor" />
                        </div>
                      </div>
                      <div className="w-0 h-0 border-y-[18px] border-y-transparent border-l-[24px] border-l-purple-500 -ml-3 z-0"></div>
                    </div>
                  </Link>
                ) : (
                  /* 3D Round Cookie / Candy Lesson Step */
                  <Link 
                    href={`/learn/${subjectSlug}/${node.slug}`}
                    className={`
                      relative flex items-center justify-center transition-all duration-150 active:translate-y-[3px]
                      w-16 h-16 rounded-full hover:scale-110
                    `}
                  >

                    <div className="relative flex flex-col items-center justify-center w-full h-full">
                      {isCompleted ? (
                        // Big Candy for completed lessons
                        <div className="flex items-center justify-center rotate-[15deg] hover:rotate-[25deg] transition-transform">
                          <div className="w-0 h-0 border-y-[14px] border-y-transparent border-r-[18px] border-r-emerald-400 -mr-2 z-0"></div>
                          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-300 to-teal-400 shadow-inner flex items-center justify-center z-10 border-[4px] border-white relative overflow-hidden">
                             <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,rgba(255,255,255,0.3)_8px,rgba(255,255,255,0.3)_16px)]"></div>
                             <div className="absolute top-1 left-1.5 right-1.5 h-2 bg-white/60 rounded-full pointer-events-none"></div>
                             <CheckCircle2 size={24} strokeWidth={4} className="text-white drop-shadow-md z-10" />
                          </div>
                          <div className="w-0 h-0 border-y-[14px] border-y-transparent border-l-[18px] border-l-emerald-400 -ml-2 z-0"></div>
                        </div>
                      ) : isUnlocked ? (
                        // Big Candy for unlocked current lesson
                        <div className="flex items-center justify-center -rotate-[10deg] hover:rotate-0 transition-transform animate-pulse">
                          <div className="w-0 h-0 border-y-[16px] border-y-transparent border-r-[22px] border-r-sky-400 -mr-2 z-0"></div>
                          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-300 to-blue-400 shadow-[0_5px_15px_rgba(14,165,233,0.6)] shadow-inner flex items-center justify-center z-10 border-[4px] border-white relative overflow-hidden">
                             <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(255,255,255,0.4)_8px,rgba(255,255,255,0.4)_16px)]"></div>
                             <div className="absolute top-1 left-2 right-2 h-2.5 bg-white/60 rounded-full pointer-events-none"></div>
                             <Play size={26} fill="currentColor" className="text-white drop-shadow-md z-10 ml-1" />
                          </div>
                          <div className="w-0 h-0 border-y-[16px] border-y-transparent border-l-[22px] border-l-sky-400 -ml-2 z-0"></div>
                        </div>
                      ) : (
                        // Small Candy for locked lessons
                        <div className="flex items-center justify-center rotate-[20deg] opacity-80 hover:opacity-100 transition-opacity">
                          <div className="w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-slate-300 -mr-1.5 z-0"></div>
                          <div className="w-10 h-10 rounded-full bg-slate-200 shadow-inner flex items-center justify-center z-10 border-[3px] border-white relative">
                             <div className="absolute top-0.5 left-1 right-1 h-1.5 bg-white/60 rounded-full pointer-events-none"></div>
                             <Lock size={16} strokeWidth={3} className="text-slate-400 z-10" />
                          </div>
                          <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[14px] border-l-slate-300 -ml-1.5 z-0"></div>
                        </div>
                      )}
                    </div>

                    {isCompleted && (
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1 border-2 border-white shadow-lg z-10 animate-bounce">
                        <Star size={12} className="text-white fill-white" />
                      </div>
                    )}
                  </Link>
                )}

                {/* Styled Title Label Below Node */}
                <div className="mt-5 text-center max-w-[140px] px-1 relative z-10">
                  <div className="bg-white/90 border-[3px] border-pink-200 rounded-2xl px-3 py-1.5 shadow-lg backdrop-blur-sm">
                    <p className={`text-[11px] font-black tracking-wide leading-tight uppercase ${isUnlocked ? 'text-pink-600' : 'text-slate-400'}`}>
                      {node.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
