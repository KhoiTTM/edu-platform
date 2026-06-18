"use client";
import React, { useState, useEffect } from "react";
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
  // 1. Calculate fixed global index for all lessons from the original nodes array
  const lessonIndexes: Record<string, number> = {};
  let totalLessons = 0;
  nodes.forEach(node => {
    if (node.type === 'lesson') {
      totalLessons++;
      lessonIndexes[node.id] = totalLessons;
    }
  });

  // 2. Group nodes by Unit
  const groups: { unit: PathNode; items: PathNode[] }[] = [];
  let currentGroup: { unit: PathNode; items: PathNode[] } | null = null;

  nodes.forEach(node => {
    if (node.type === 'unit') {
      currentGroup = { unit: node, items: [] };
      groups.push(currentGroup);
    } else {
      if (currentGroup) {
        currentGroup.items.push(node);
      } else {
        currentGroup = {
          unit: { id: 'dummy', title: 'Khởi động', slug: 'start', type: 'unit' },
          items: [node]
        };
        groups.push(currentGroup);
      }
    }
  });

  const getGroupCompletion = (g: typeof groups[0]) => {
    if (g.items.length === 0) return completedNodes.includes(g.unit.slug);
    return g.items.every(item => completedNodes.includes(item.slug));
  };

  const [collapsedUnits, setCollapsedUnits] = useState<Record<string, boolean>>({});
  const [initialized, setInitialized] = useState(false);

  // Initialize collapse states for completed units
  useEffect(() => {
    if (!initialized && nodes.length > 0) {
      const initialCollapsed: Record<string, boolean> = {};
      groups.forEach(group => {
        if (getGroupCompletion(group)) {
          initialCollapsed[group.unit.id] = true;
        }
      });
      setCollapsedUnits(initialCollapsed);
      setInitialized(true);
    }
  }, [nodes, completedNodes, initialized]);

  const toggleUnit = (unitId: string) => {
    setCollapsedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  const visibleItems: {
    node: PathNode;
    isUnit: boolean;
    parentUnitId: string;
    isCompleted?: boolean;
    isCollapsed?: boolean;
    completedCount?: number;
    totalCount?: number;
  }[] = [];

  groups.forEach(group => {
    const isCompleted = getGroupCompletion(group);
    const isCollapsed = !!collapsedUnits[group.unit.id];

    // Add Unit node itself
    visibleItems.push({
      node: group.unit,
      isUnit: true,
      parentUnitId: group.unit.id,
      isCompleted,
      isCollapsed
    });

    if (!isCollapsed) {
      group.items.forEach(item => {
        visibleItems.push({
          node: item,
          isUnit: false,
          parentUnitId: group.unit.id,
          isCompleted: completedNodes.includes(item.slug)
        });
      });
    } else if (group.items.length > 0) {
      const completedCount = group.items.filter(item => completedNodes.includes(item.slug)).length;
      // Add summary badge node
      visibleItems.push({
        node: {
          id: `summary-${group.unit.id}`,
          title: `Đã học ${completedCount}/${group.items.length} bài`,
          slug: `summary-${group.unit.slug}`,
          type: 'summary',
        },
        isUnit: false,
        parentUnitId: group.unit.id,
        isCompleted: completedCount === group.items.length,
        completedCount,
        totalCount: group.items.length
      });
    }
  });

  const positions: { x: number, y: number, isUnit: boolean }[] = [];
  let currentY = 100;
  let lessonCounter = 0;

  visibleItems.forEach((item, i) => {
    const isUnit = item.isUnit;
    let x = 450; // Center default for 900px board
    
    if (isUnit) {
      x = 450; // Units are always centered
      if (i > 0) {
        const prevItem = visibleItems[i - 1];
        if (prevItem && !prevItem.isUnit && prevItem.node.type === 'summary') {
          currentY += 100;
        } else {
          currentY += 150;
        }
      }
      lessonCounter = 0; // Reset zigzag counter
    } else if (item.node.type === 'exam') {
      x = 450;
      currentY += 100;
    } else if (item.node.type === 'summary') {
      x = 450;
      currentY += 80; // compact gap for summary badge
    } else {
      // Lessons zigzag curve - wider spacing for 900px board
      const pattern = [250, 650, 280, 620, 220, 680];
      x = pattern[lessonCounter % pattern.length];
      currentY += 65; // Extremely dense space between lessons
      lessonCounter++;
    }
    
    positions.push({ x, y: currentY, isUnit });
  });

  const pathHeight = positions.length > 0 ? positions[positions.length - 1].y + 200 : 500;

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
        // Exaggerated Zig-zag curve for winding path - wider control points
        const cp1X = prev.x + (i % 2 === 0 ? 120 : -120);
        const cp2X = curr.x + (i % 2 === 0 ? -120 : 120);
        dPath += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${curr.x} ${curr.y}`;
      }
      prev = curr;
    }
  }

  // Predefined positions for decorative background items based on path height
  const decorationTypes = ["lollipop", "sugar_cube", "grass_tuft", "jelly_bean", "choco_mud", "lollipop_swirl"];
  const decorations: { x: number; y: number; type: string; scale: number; rotation: number }[] = [];
  for (let y = 60; y < pathHeight - 60; y += 70) { 
    const rand1 = Math.abs(Math.sin(y * 1.23)) * decorationTypes.length;
    const rand2 = Math.abs(Math.cos(y * 2.34)) * decorationTypes.length;
    const rand3 = Math.abs(Math.sin(y * 3.45)) * decorationTypes.length;
    const rot1 = Math.floor(Math.sin(y * 4.56) * 45);
    const rot2 = Math.floor(Math.cos(y * 5.67) * 45);

    // Left side decors - adjusted for 900px board
    decorations.push({
      x: 80 + Math.sin(y) * 50,
      y: y + Math.cos(y) * 20,
      type: decorationTypes[Math.floor(rand1) % decorationTypes.length],
      scale: 0.8 + (Math.sin(y) * 0.4),
      rotation: rot1
    });
    // Right side decors - adjusted for 900px board
    decorations.push({
      x: 820 + Math.cos(y) * 50,
      y: y + 40 + Math.sin(y) * 20,
      type: decorationTypes[Math.floor(rand2) % decorationTypes.length],
      scale: 0.8 + (Math.cos(y) * 0.4),
      rotation: rot2
    });
    // Extra random decors far out
    if (y % 140 === 0) {
      decorations.push({
        x: Math.sin(y) > 0 ? 40 : 860,
        y: y + 60,
        type: decorationTypes[Math.floor(rand3) % decorationTypes.length],
        scale: 1.2,
        rotation: rot1 * -1
      });
    }
  }

  return (
    <div className="relative w-full max-w-full py-10 flex justify-center select-none overflow-x-auto">
      
      {/* Outer Adventure Board Frame - Grass Theme */}
      <div 
        className="relative w-[900px] min-w-[900px] rounded-[2.5rem] overflow-hidden border-[12px] border-[#381e0f] shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-gradient-to-b from-[#8ed827] via-[#7bc810] to-[#60b00e] transition-all duration-500"
        style={{ height: pathHeight }}
      >
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

        {/* 3D Road / Golden Path SVG - adjusted for 900px board */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex justify-center">
          <svg 
            width="900" 
            height={pathHeight} 
            className="overflow-visible"
            fill="none" 
          >
            <path 
              d={dPath} 
              stroke="#b45309"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path 
              d={dPath} 
              stroke="#fbbf24"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
          {visibleItems.map((item, i) => {
            const node = item.node;
            const pos = positions[i];
            const isUnitNode = item.isUnit;
            const leftOffset = `${pos.x}px`;
            const topOffset = `${pos.y}px`;
            
            const isUnlocked = true; 
            const isCompleted = item.isCompleted;

            // Summary box for collapsed units
            if (node.type === 'summary') {
              const completedCount = item.completedCount || 0;
              const totalCount = item.totalCount || 0;
              
              // Dynamic colors based on progress
              let badgeBg = "bg-gradient-to-r from-emerald-600 via-[#10b981] to-[#059669] hover:from-emerald-500 hover:to-[#059669] shadow-[0_4px_15px_rgba(16,185,129,0.4)]";
              let BadgeIcon = CheckCircle2;
              
              if (completedCount === 0) {
                badgeBg = "bg-gradient-to-r from-slate-600 via-slate-500 to-slate-700 hover:from-slate-500 hover:to-slate-600 shadow-[0_4px_15px_rgba(100,116,139,0.3)]";
                BadgeIcon = Lock;
              } else if (completedCount < totalCount) {
                badgeBg = "bg-gradient-to-r from-sky-600 via-[#3b82f6] to-[#1d4ed8] hover:from-sky-500 hover:to-[#1d4ed8] shadow-[0_4px_15px_rgba(59,130,246,0.4)]";
                BadgeIcon = Play;
              }

              return (
                <div 
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20"
                  style={{ left: leftOffset, top: topOffset }}
                >
                  <button 
                    onClick={() => toggleUnit(item.parentUnitId)}
                    className={`flex items-center gap-1.5 px-4 py-2 ${badgeBg} text-white rounded-full border-2 border-white font-black text-[10px] uppercase tracking-wider transition-all active:scale-95 duration-200 cursor-pointer`}
                  >
                    <BadgeIcon size={12} className="text-white" />
                    <span>{node.title} (Nhấp để mở rộng)</span>
                  </button>
                </div>
              );
            }
            
            return (
              <div 
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer ${isUnitNode ? 'w-36 h-36' : 'w-24 h-24'}`}
                style={{ left: leftOffset, top: topOffset }}
              >
                {isUnitNode ? (
                  /* Purple Banner Flag Unit Node */
                  <div 
                    onClick={() => toggleUnit(node.id)}
                    className="relative flex flex-col items-center mt-[-30px] cursor-pointer"
                  >
                    <div className="relative flex flex-col items-center justify-start z-10 transition-transform active:scale-95 hover:scale-105 duration-150">
                      {/* Banner Body */}
                      <div className={`w-16 h-24 ${isUnlocked ? 'bg-gradient-to-b from-purple-500 to-purple-800' : 'bg-gradient-to-b from-slate-400 to-slate-600'} border-2 border-amber-300 rounded-b-md relative flex items-center justify-start pt-3 shadow-[0_5px_15px_rgba(0,0,0,0.4)] flex-col`}>
                        <Star size={24} className={isUnlocked ? 'text-yellow-400 fill-yellow-400 drop-shadow-md animate-pulse' : 'text-slate-300 fill-slate-300'} />
                        {/* The pointy bottom of banner */}
                        <div className={`absolute -bottom-4 w-0 h-0 border-x-[30px] border-x-transparent border-t-[16px] ${isUnlocked ? 'border-t-purple-800' : 'border-t-slate-600'}`}></div>
                        <div className="absolute -bottom-[19px] w-0 h-0 border-x-[34px] border-x-transparent border-t-[18px] border-t-amber-300 z-[-1]"></div>
                      </div>
                    </div>
                    {/* Wooden Pole */}
                    <div className="absolute w-3 h-24 bg-[#8b5a2b] border-r-[3px] border-[#5c3a21]/50 -bottom-10 rounded-full z-0 shadow-lg"></div>
                    
                    {/* Permanent Wooden Nameplate Banner displaying Unit name */}
                    <div className="absolute top-[80px] bg-gradient-to-b from-[#7c4e29] to-[#5c3a21] text-amber-100 border-2 border-[#b45309] shadow-lg px-3 py-1 rounded-xl font-black text-[10px] whitespace-nowrap z-20 text-center max-w-[200px] truncate uppercase tracking-wide">
                      {node.title.replace(/^Buổi \d+:\s*/, '')} {item.isCollapsed ? '➕' : '➖'}
                    </div>
                  </div>
                ) : node.type === 'exam' ? (
                  /* Exam Gift Node */
                  <Link 
                    href={`/learn/${subjectSlug}/${node.slug}`}
                    className="relative flex items-center justify-center transition-all duration-150 active:translate-y-[4px] hover:scale-110 z-10 mt-[-10px]"
                  >
                    <div className="text-[70px] leading-none select-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]">
                      🎁
                    </div>
                  </Link>
                ) : (
                  /* 3D Glassy Round Buttons for Lessons */
                  <div className="relative w-full h-full">
                    <Link 
                      href={`/learn/${subjectSlug}/${node.slug}`}
                      className="relative flex items-center justify-center transition-all duration-150 active:translate-y-[3px] hover:scale-110 z-10"
                    >
                      <div className="relative flex flex-col items-center justify-center w-full h-full">
                        {isCompleted ? (
                          // Completed Glassy Blue Button with 3 Stars
                          <div className="flex flex-col items-center justify-center transition-transform relative opacity-70">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#77d3f4] to-[#258bd5] shadow-[0_5px_0_#0f5a9e,inset_0_3px_5px_rgba(255,255,255,0.6)] border-[3px] border-white flex items-center justify-center z-10 grayscale-[50%]">
                               <span className="text-white text-2xl font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">{lessonIndexes[node.id]}</span>
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
                               <span className="text-white text-3xl font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">{lessonIndexes[node.id]}</span>
                            </div>
                            <div className="absolute inset-[-10px] bg-white/20 rounded-full blur-sm -z-10 animate-pulse"></div>
                          </div>
                        ) : (
                          // Locked Glassy Gray Button
                          <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#e2e8f0] to-[#94a3b8] shadow-[0_4px_0_#475569,inset_0_2px_3px_rgba(255,255,255,0.8)] border-[3px] border-white flex items-center justify-center z-10">
                               <span className="text-slate-500 text-xl font-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">{lessonIndexes[node.id]}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Permanent Lesson Title Label on the side - aligned for 900px board */}
                    <Link href={`/learn/${subjectSlug}/${node.slug}`} className="block">
                      <div className={`absolute top-1/2 -translate-y-1/2 bg-slate-900/95 border border-slate-700/80 hover:border-sky-500 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-[10px] font-black shadow-lg max-w-[200px] truncate whitespace-nowrap z-20 ${pos.x < 450 ? 'left-16 text-left origin-left' : 'right-16 text-right origin-right'} transition-all cursor-pointer`}>
                        {node.title.replace(/^Buổi \d+:\s*/, '')}
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
