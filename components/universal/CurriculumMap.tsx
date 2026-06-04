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
  completedNodes?: string[];
}

export function CurriculumMap({ nodes, subjectSlug, completedNodes = [] }: CurriculumMapProps) {
  // Always show all nodes, no collapsing
  const visibleNodes = nodes;

  const positions: { x: number, y: number, isUnit: boolean, index?: number }[] = [];
  let currentY = 100;
  let lessonCounter = 0;
  let globalLessonCount = 0;

  // With map width 600px, center is 300px
  visibleNodes.forEach((node, i) => {
    const isUnit = node.type === 'unit';
    let x = 300; // Center default
    
    if (isUnit) {
      x = 300; // Units are always centered
      if (i > 0) currentY += 140; // Extra space before a unit
      lessonCounter = 0; // Reset zigzag counter for lessons in this unit
    } else if (node.type === 'exam') {
      x = 300; // Exams are centered at the end of the chapter
      currentY += 100; // Reduced for density
    } else {
      // Lessons zigzag curve
      const pattern = [160, 440, 180, 420, 140, 460];
      x = pattern[lessonCounter % pattern.length];
      currentY += 65; // Extremely dense space between lessons
      lessonCounter++;
      globalLessonCount++;
    }
    
    positions.push({ x, y: currentY, isUnit, index: globalLessonCount });
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
        // Exaggerated Zig-zag curve for winding path (adjusted for extreme tight Y spacing)
        const cp1X = prev.x + (i % 2 === 0 ? 80 : -80);
        const cp2X = curr.x + (i % 2 === 0 ? -80 : 80);
        dPath += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${curr.x} ${curr.y}`;
      }
      prev = curr;
    }
  }

  // Predefined positions for decorative background items based on path height
  const decorationTypes = ["lollipop", "sugar_cube", "grass_tuft", "jelly_bean", "choco_mud", "lollipop_swirl"];
  const decorations: { x: number; y: number; type: string; scale: number; rotation: number }[] = [];
  for (let y = 60; y < pathHeight - 60; y += 60) { 
    // Pseudo-random deterministic values based on y
    const rand1 = Math.abs(Math.sin(y * 1.23)) * decorationTypes.length;
    const rand2 = Math.abs(Math.cos(y * 2.34)) * decorationTypes.length;
    const rand3 = Math.abs(Math.sin(y * 3.45)) * decorationTypes.length;
    const rot1 = Math.floor(Math.sin(y * 4.56) * 45);
    const rot2 = Math.floor(Math.cos(y * 5.67) * 45);

    // Left side decors
    decorations.push({
      x: 60 + Math.sin(y) * 50,
      y: y + Math.cos(y) * 20,
      type: decorationTypes[Math.floor(rand1) % decorationTypes.length],
      scale: 0.8 + (Math.sin(y) * 0.4),
      rotation: rot1
    });
    // Right side decors
    decorations.push({
      x: 540 + Math.cos(y) * 50,
      y: y + 40 + Math.sin(y) * 20,
      type: decorationTypes[Math.floor(rand2) % decorationTypes.length],
      scale: 0.8 + (Math.cos(y) * 0.4),
      rotation: rot2
    });
    // Extra random decors far out
    if (y % 120 === 0) {
      decorations.push({
        x: Math.sin(y) > 0 ? 30 : 570,
        y: y + 60,
        type: decorationTypes[Math.floor(rand3) % decorationTypes.length],
        scale: 1.2,
        rotation: rot1 * -1
      });
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto py-10 flex justify-center select-none">
      
      {/* Outer Adventure Board Frame - Grass Theme */}
      <div 
        className="relative w-full rounded-[2.5rem] overflow-hidden border-[12px] border-[#381e0f] shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-gradient-to-b from-[#8ed827] via-[#7bc810] to-[#60b00e] transition-all duration-500"
        style={{ height: pathHeight }}
      >
        {/* Subtle grass texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz4KPC9zdmc+')] bg-[size:40px_40px]"></div>
        
        {/* Fluffy Clouds in Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-80">
          <div className="absolute top-10 left-[-20px] w-48 h-16 bg-white/70 rounded-full blur-[2px] animate-[pulse_6s_infinite]"></div>
          <div className="absolute top-10 left-10 w-32 h-20 bg-white/60 rounded-full blur-[2px] animate-[pulse_6s_infinite] delay-75"></div>
          
          <div className="absolute top-1/3 right-[-30px] w-48 h-20 bg-white/70 rounded-full blur-[2px] animate-[pulse_8s_infinite]"></div>
          
          <div className="absolute bottom-20 left-10 w-40 h-16 bg-white/60 rounded-full blur-[2px] animate-[pulse_5s_infinite]"></div>
        </div>

        {/* Decorative Floating Elements */}
        {decorations.map((dec, idx) => (
          <div 
            key={idx} 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform hover:scale-110 duration-300 z-0"
            style={{ 
              left: `${dec.x}px`, 
              top: `${dec.y}px`,
              transform: `translate(-50%, -50%) scale(${dec.scale}) rotate(${dec.rotation}deg)` 
            }}
          >
            {dec.type === "lollipop" && (
              <div className="flex flex-col items-center opacity-95 scale-125">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-rose-400 border-[3px] border-white/90 shadow-lg flex items-center justify-center overflow-hidden">
                   <div className="absolute top-1 left-2 right-2 h-4 bg-white/40 rounded-full"></div>
                </div>
                <div className="w-2.5 h-16 bg-white rounded-full -mt-2 border border-slate-200/50 shadow-md z-[-1]"></div>
              </div>
            )}
            {dec.type === "lollipop_swirl" && (
              <div className="flex flex-col items-center opacity-95 scale-125">
                <div className="w-14 h-14 rounded-full bg-[conic-gradient(#ec4899_0deg_45deg,#fff_45deg_90deg,#ec4899_90deg_135deg,#fff_135deg_180deg,#ec4899_180deg_225deg,#fff_225deg_270deg,#ec4899_270deg_315deg,#fff_315deg_360deg)] border-[3px] border-white/90 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)]"></div>
                </div>
                <div className="w-2.5 h-16 bg-white rounded-full -mt-2 border border-slate-200/50 shadow-md z-[-1]"></div>
              </div>
            )}
            {dec.type === "sugar_cube" && (
              <div className="w-8 h-8 bg-white rounded-md shadow-lg border-2 border-slate-100 flex items-center justify-center opacity-95">
                <div className="w-5 h-5 bg-slate-50/50 rounded-sm shadow-inner"></div>
              </div>
            )}
            {dec.type === "grass_tuft" && (
              <div className="flex items-end justify-center opacity-90">
                <div className="w-2 h-6 bg-[#65a30d] rounded-full rotate-[-30deg] translate-x-2"></div>
                <div className="w-2.5 h-8 bg-[#4d7c0f] rounded-full z-10"></div>
                <div className="w-2 h-5 bg-[#65a30d] rounded-full rotate-[30deg] -translate-x-1"></div>
              </div>
            )}
            {dec.type === "jelly_bean" && (
              <div className="w-10 h-6 bg-gradient-to-b from-rose-500 to-rose-700 rounded-full shadow-lg border border-rose-800/20 relative overflow-hidden">
                 <div className="absolute top-1 left-2 w-4 h-1.5 bg-white/60 rounded-full rotate-[-15deg]"></div>
              </div>
            )}
            {dec.type === "choco_mud" && (
              <div className="w-24 h-12 bg-[#573418] rounded-full opacity-60 blur-[1px] shadow-inner"></div>
            )}
          </div>
        ))}

        {/* 3D Road / Golden Path SVG */}
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
              stroke="#b45309"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 3D Road Main Golden Body */}
            <path 
              d={dPath} 
              stroke="#fbbf24"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 3D Road Highlight (Center Path) */}
            <path 
              d={dPath} 
              stroke="#fcd34d"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
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
            const isCompleted = completedNodes.includes(node.slug);
            
            // Icon
            const Icon = node.type === 'lesson' ? Play : (node.type === 'chapter' ? Crown : BookOpen);
            
            return (
              <div 
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer ${isUnitNode ? 'w-36 h-36' : 'w-24 h-24'}`}
                style={{ left: leftOffset, top: topOffset }}
              >
                {/* Tooltip on Hover */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-white text-slate-700 border-4 border-amber-300 shadow-xl px-4 py-2 rounded-2xl z-50 font-black text-sm">
                  {node.title}
                  <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-amber-300"></div>
                </div>

                {isUnitNode ? (
                  /* Purple Banner Flag Unit Node */
                  <div className="relative flex flex-col items-center mt-[-30px]">
                    <div 
                      className={`
                        relative flex flex-col items-center justify-start z-10
                      `}
                    >
                      {/* Banner Body */}
                      <div className={`w-16 h-24 ${isUnlocked ? 'bg-gradient-to-b from-purple-500 to-purple-800' : 'bg-gradient-to-b from-slate-400 to-slate-600'} border-2 border-amber-300 rounded-b-md relative flex items-center justify-start pt-3 shadow-[0_5px_15px_rgba(0,0,0,0.4)] flex-col`}>
                        <Star size={24} className={isUnlocked ? 'text-yellow-400 fill-yellow-400 drop-shadow-md' : 'text-slate-300 fill-slate-300'} />
                        {/* The pointy bottom of banner */}
                        <div className={`absolute -bottom-4 w-0 h-0 border-x-[30px] border-x-transparent border-t-[16px] ${isUnlocked ? 'border-t-purple-800' : 'border-t-slate-600'}`}></div>
                        <div className="absolute -bottom-[19px] w-0 h-0 border-x-[34px] border-x-transparent border-t-[18px] border-t-amber-300 z-[-1]"></div>
                      </div>
                    </div>
                    {/* Wooden Pole */}
                    <div className="absolute w-3 h-24 bg-[#8b5a2b] border-r-[3px] border-[#5c3a21]/50 -bottom-10 rounded-full z-0 shadow-lg"></div>
                  </div>
                ) : node.type === 'exam' ? (
                  /* Exam Gift Node */
                  <Link 
                    href={`/learn/${subjectSlug}/${node.slug}`}
                    className={`
                      relative flex items-center justify-center transition-all duration-150 active:translate-y-[4px] hover:scale-110 z-10 mt-[-10px]
                    `}
                  >
                    <div className="text-[70px] leading-none select-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]">
                      🎁
                    </div>
                  </Link>
                ) : (
                  /* 3D Glassy Round Buttons for Lessons */
                  <Link 
                    href={`/learn/${subjectSlug}/${node.slug}`}
                    className={`
                      relative flex items-center justify-center transition-all duration-150 active:translate-y-[3px] hover:scale-110 z-10
                    `}
                  >
                    <div className="relative flex flex-col items-center justify-center w-full h-full">
                      {isCompleted ? (
                        // Completed Glassy Blue Button with 3 Stars
                        <div className="flex flex-col items-center justify-center transition-transform relative opacity-70">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#77d3f4] to-[#258bd5] shadow-[0_5px_0_#0f5a9e,inset_0_3px_5px_rgba(255,255,255,0.6)] border-[3px] border-white flex items-center justify-center z-10 grayscale-[50%]">
                             <span className="text-white text-2xl font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">{pos.index}</span>
                          </div>
                          {/* 3 Stars below */}
                          <div className="absolute -bottom-4 flex justify-center w-[120%] gap-0.5 z-20 grayscale-[50%]">
                            <Star size={14} className="text-yellow-400 fill-yellow-400 drop-shadow-md rotate-[-15deg] mt-1" />
                            <Star size={18} className="text-yellow-400 fill-yellow-400 drop-shadow-md z-10" />
                            <Star size={14} className="text-yellow-400 fill-yellow-400 drop-shadow-md rotate-[15deg] mt-1" />
                          </div>
                        </div>
                      ) : isUnlocked ? (
                        // Unlocked Glassy Blue Button
                        <div className="flex items-center justify-center transition-transform animate-[bounce_2s_infinite] relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#77d3f4] to-[#258bd5] shadow-[0_6px_0_#0f5a9e,0_10px_15px_rgba(15,90,158,0.5),inset_0_3px_5px_rgba(255,255,255,0.6)] border-[4px] border-white flex items-center justify-center z-10">
                             <span className="text-white text-3xl font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">{pos.index}</span>
                          </div>
                          {/* Light ring effect around active node */}
                          <div className="absolute inset-[-10px] bg-white/20 rounded-full blur-sm -z-10 animate-pulse"></div>
                        </div>
                      ) : (
                        // Locked Glassy Gray Button
                        <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#e2e8f0] to-[#94a3b8] shadow-[0_4px_0_#475569,inset_0_2px_3px_rgba(255,255,255,0.8)] border-[3px] border-white flex items-center justify-center z-10">
                             <span className="text-slate-500 text-xl font-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">{pos.index}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
