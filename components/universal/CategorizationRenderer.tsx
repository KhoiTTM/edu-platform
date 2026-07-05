"use client";

import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface CategorizationRendererProps {
  instruction?: string;
  groups: { name: string; items: string[] }[];
  onAnswer: (isCorrect: boolean, answer: any) => void;
  disabled?: boolean;
}

export function CategorizationRenderer({
  instruction = "Xếp các từ sau vào nhóm thích hợp:",
  groups,
  onAnswer,
  disabled = false
}: CategorizationRendererProps) {
  // Extract all items and shuffle them
  const [allItems, setAllItems] = useState<string[]>([]);
  const [userGroups, setUserGroups] = useState<Record<string, string[]>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    const items = groups.flatMap(g => g.items);
    setAllItems(items.sort(() => 0.5 - Math.random()));
    
    const initialGroups: Record<string, string[]> = {};
    groups.forEach(g => {
      initialGroups[g.name] = [];
    });
    setUserGroups(initialGroups);
  }, [groups]);

  const handleItemClick = (item: string) => {
    if (disabled) return;
    if (selectedItem === item) {
      setSelectedItem(null); // deselect
    } else {
      setSelectedItem(item);
    }
  };

  const handleGroupClick = (groupName: string) => {
    if (disabled || !selectedItem) return;

    // Remove from allItems
    setAllItems(prev => prev.filter(i => i !== selectedItem));
    
    // Remove from other groups if it was there (not needed if it only comes from allItems, but safe)
    const newGroups = { ...userGroups };
    Object.keys(newGroups).forEach(key => {
      newGroups[key] = newGroups[key].filter(i => i !== selectedItem);
    });
    
    // Add to target group
    newGroups[groupName] = [...newGroups[groupName], selectedItem];
    setUserGroups(newGroups);
    setSelectedItem(null);
  };

  const handleRemoveFromGroup = (groupName: string, item: string) => {
    if (disabled) return;
    const newGroups = { ...userGroups };
    newGroups[groupName] = newGroups[groupName].filter(i => i !== item);
    setUserGroups(newGroups);
    setAllItems(prev => [...prev, item]);
  };

  const checkAnswer = () => {
    let isCorrect = true;
    for (const group of groups) {
      const userItems = userGroups[group.name] || [];
      // Check if userItems has exactly the same elements as group.items
      if (userItems.length !== group.items.length) {
        isCorrect = false;
        break;
      }
      for (const item of group.items) {
        if (!userItems.includes(item)) {
          isCorrect = false;
          break;
        }
      }
    }
    return isCorrect;
  };

  const handleSubmit = () => {
    if (disabled || allItems.length > 0) return; // Only submit when all items are placed
    const isCorrect = checkAnswer();
    onAnswer(isCorrect, userGroups);
  };

  const isComplete = allItems.length === 0;

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-white mb-4">
        {instruction}
      </div>

      {/* Word Pool */}
      <div className="min-h-[60px] p-4 bg-surface-raised/50 rounded-xl border-2 border-dashed border-line flex flex-wrap gap-2 items-center justify-center">
        {allItems.length === 0 ? (
          <span className="text-slate-500 text-sm">Đã xếp hết từ</span>
        ) : (
          allItems.map((item, idx) => (
            <button
              key={`item-${idx}`}
              onClick={() => handleItemClick(item)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedItem === item
                  ? 'bg-sky-500 text-white scale-110 shadow-lg'
                  : 'bg-white text-slate-800 hover:bg-sky-100 shadow-[0_4px_0_rgb(203,213,225)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(203,213,225)]'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {item}
            </button>
          ))
        )}
      </div>

      {/* Target Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {groups.map((group, gIdx) => (
          <div
            key={`group-${gIdx}`}
            onClick={() => handleGroupClick(group.name)}
            className={`p-4 rounded-xl border-2 min-h-[120px] transition-all ${
              selectedItem && !disabled
                ? 'border-sky-500 bg-sky-900/20 cursor-pointer hover:bg-sky-800/30'
                : disabled
                  ? checkAnswer()
                    ? 'border-emerald-500 bg-emerald-900/10'
                    : 'border-rose-500 bg-rose-900/10'
                  : 'border-line bg-surface-raised/30'
            }`}
          >
            <div className="text-center font-bold text-slate-300 mb-3 uppercase text-sm tracking-wider">
              {group.name}
            </div>
            <div className="flex flex-wrap gap-2">
              {userGroups[group.name]?.map((item, idx) => {
                const isItemCorrect = group.items.includes(item);
                return (
                  <button
                    key={`placed-${idx}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromGroup(group.name, item);
                    }}
                    disabled={disabled}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      disabled
                        ? isItemCorrect
                          ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                          : 'bg-rose-500/20 border border-rose-500 text-rose-400'
                        : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!disabled && isComplete && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-[0_4px_0_rgb(14,165,233)] active:translate-y-[4px] active:shadow-none transition-all"
          >
            Kiểm tra
          </button>
        </div>
      )}

      {disabled && (
        <div className="mt-4 p-4 rounded-xl bg-surface-raised border border-line">
          <h4 className="font-bold text-slate-300 mb-2">Đáp án đúng:</h4>
          <div className="space-y-2">
            {groups.map((group, idx) => (
              <div key={idx} className="text-sm">
                <span className="text-emerald-400 font-medium">{group.name}:</span>{' '}
                <span className="text-slate-300">{group.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
