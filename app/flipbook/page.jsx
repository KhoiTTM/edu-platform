'use client';

import './flipbook.css';
import { useState, useEffect, useRef } from 'react';

export default function FlipbookPage() {
  const [metadata, setMetadata] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [hotspots, setHotspots] = useState([]);
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [selectedHotspotId, setSelectedHotspotId] = useState(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [pageInputVal, setPageInputVal] = useState('1');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [drawBox, setDrawBox] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const imageRef = useRef(null);
  const [playingAudioId, setPlayingAudioId] = useState(null);

  // Fetch book metadata
  useEffect(() => {
    fetch('/book/metadata.json')
      .then((res) => res.json())
      .then((data) => {
        setMetadata(data);
        
        // Handle URL search parameters to jump to target page/lesson
        const params = new URLSearchParams(window.location.search);
        const pageParam = params.get('page');
        const lessonParam = params.get('lesson');

        if (pageParam) {
          const pageNum = parseInt(pageParam);
          const idx = data.pages.findIndex(p => p.id === pageNum);
          if (idx !== -1) setCurrentPageIndex(idx);
        } else if (lessonParam) {
          // If lesson is provided, we can look inside pages content or metadata to find matching lesson label
          // Map Lesson 1 to page 5, Lesson 2 to page 9, Lesson 3 to page 10, Lesson 4 to page 33, Lesson 5 to page 77, etc.
          const lessonNum = parseInt(lessonParam);
          const lessonPageMap = {
            1: 5,
            2: 9,
            3: 10,
            4: 33,
            5: 77
          };
          const targetPage = lessonPageMap[lessonNum];
          if (targetPage) {
            const idx = data.pages.findIndex(p => p.id === targetPage);
            if (idx !== -1) setCurrentPageIndex(idx);
          }
        }
      })
      .catch((err) => console.error('Failed to load book metadata', err));
  }, []);

  // Sync page input when index changes
  useEffect(() => {
    setPageInputVal(String(currentPageIndex + 1));
  }, [currentPageIndex]);

  // Fetch hotspots and load answers from localStorage
  useEffect(() => {
    if (!metadata) return;
    const pageNum = metadata.pages[currentPageIndex].id;
    const pageStr = String(pageNum).padStart(3, '0');

    fetch(`/book/hotspots/page_${pageStr}.json?t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) return { page: pageNum, elements: [] };
        return res.json();
      })
      .then((data) => {
        const loadedHotspots = data.elements || [];

        // Load persistent student progress from LocalStorage
        const storageKey = `sbt_khtn7_progress_p${pageNum}`;
        const savedProgress = localStorage.getItem(storageKey);

        if (savedProgress) {
          try {
            const parsedProgress = JSON.parse(savedProgress);
            const { answers, resultsShown } = parsedProgress;

            // Merge student answers into hotspots elements
            const mergedHotspots = loadedHotspots.map(h => ({
              ...h,
              value: answers[h.id] !== undefined ? answers[h.id] : (h.value || '')
            }));

            setHotspots(mergedHotspots);
            setShowResults(!!resultsShown);
          } catch (e) {
            setHotspots(loadedHotspots);
            setShowResults(false);
          }
        } else {
          setHotspots(loadedHotspots);
          setShowResults(false);
        }

        setSelectedHotspotId(null);
      })
      .catch(() => {
        setHotspots([]);
        setSelectedHotspotId(null);
        setShowResults(false);
      });
  }, [currentPageIndex, metadata]);

  if (!metadata) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', backgroundColor: '#09090b', color: '#f4f4f5' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ height: '32px', width: '32px', border: '4px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ color: '#a1a1aa', fontWeight: 500 }}>Đang tải sách và dữ liệu...</p>
        </div>
      </div>
    );
  }

  const currentPage = metadata.pages[currentPageIndex];

  const saveToLocalStorage = (updatedHotspots, showResState = showResults) => {
    const pageNum = currentPage.id;
    const storageKey = `sbt_khtn7_progress_p${pageNum}`;

    const answers = {};
    updatedHotspots.forEach(h => {
      answers[h.id] = h.value || '';
    });

    localStorage.setItem(storageKey, JSON.stringify({
      answers,
      resultsShown: showResState
    }));
  };

  const goToNextPage = () => {
    if (currentPageIndex < metadata.pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handlePageJumpSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(pageInputVal);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= metadata.pages.length) {
      setCurrentPageIndex(pageNum - 1);
    } else {
      setPageInputVal(String(currentPageIndex + 1));
    }
  };

  const resetAllAnswers = () => {
    const cleared = hotspots.map(h => ({ ...h, value: '' }));
    setHotspots(cleared);
    setShowResults(false);

    const pageNum = currentPage.id;
    localStorage.removeItem(`sbt_khtn7_progress_p${pageNum}`);
  };

  const toggleShowResults = () => {
    const newState = !showResults;
    setShowResults(newState);
    saveToLocalStorage(hotspots, newState);
  };

  const handleUpdateHotspotValue = (id, value) => {
    const updated = hotspots.map((h) => (h.id === id ? { ...h, value } : h));
    setHotspots(updated);
    saveToLocalStorage(updated);
  };

  const isAnswerCorrect = (h) => {
    if (!h.correctAnswer || !h.value) return false;
    const userVal = h.value.trim().toLowerCase().replace(/\s+/g, '');
    const correctVal = h.correctAnswer.trim().toLowerCase().replace(/\s+/g, '');
    return userVal === correctVal;
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-logo">
          <span className="header-title">{metadata.title}</span>
          <span className="header-badge">Split View (60:40)</span>
        </div>

        {/* Page Nav & Quick Jump */}
        <div className="header-nav" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={goToPrevPage}
            disabled={currentPageIndex === 0}
            className="nav-btn"
          >
            ◀
          </button>

          <form onSubmit={handlePageJumpSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#a1a1aa' }}>Trang</span>
            <input
              type="text"
              value={pageInputVal}
              onChange={(e) => setPageInputVal(e.target.value)}
              onBlur={() => setPageInputVal(String(currentPageIndex + 1))}
              style={{
                width: '45px',
                backgroundColor: '#09090b',
                border: '1px solid #3f3f46',
                borderRadius: '6px',
                padding: '4px 6px',
                color: 'white',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 600,
                outline: 'none',
              }}
            />
            <span style={{ fontSize: '13px', color: '#71717a' }}>/ {metadata.pages.length}</span>
          </form>

          <button
            onClick={goToNextPage}
            disabled={currentPageIndex === metadata.pages.length - 1}
            className="nav-btn"
          >
            ▶
          </button>
        </div>

        <div className="header-actions">
          {saveStatus && (
            <span className="save-status-toast">
              {saveStatus}
            </span>
          )}

          <button
            onClick={() => setIsEditorMode(!isEditorMode)}
            className={`mode-toggle-btn ${
              isEditorMode ? 'mode-active-editor' : 'mode-active-view'
            }`}
          >
            {isEditorMode ? '🛠 Chế độ: Editor' : '👁 Chế độ: Học sinh'}
          </button>
        </div>
      </header>

      {/* Split WorkSpace Container */}
      <div className="workspace-split">
        {/* LEFT COLUMN: Textbook Page (60%) */}
        <div className="left-panel">
          <div
            style={{
              position: 'relative',
              width: 'fit-content',
              height: 'fit-content',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(63, 63, 70, 0.8)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <img
              ref={imageRef}
              src={currentPage.image.startsWith('http') ? currentPage.image : `/book/${currentPage.image}`}
              alt={`Page ${currentPage.id}`}
              draggable={false}
              style={{
                display: 'block',
                height: '88vh',
                width: 'auto',
                maxWidth: '100%',
                maxHeight: '88vh',
                borderRadius: '8px'
              }}
            />

            {/* Visual Markers on Page */}
            {hotspots.map((h, i) => (
              <div
                key={h.id}
                onClick={() => {
                  if (isEditorMode) {
                    setSelectedHotspotId(h.id);
                  } else {
                    if (h.type === 'link') {
                      const targetPage = parseInt(h.correctAnswer || '');
                      if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= metadata.pages.length) {
                        setCurrentPageIndex(targetPage - 1);
                      }
                    } else {
                      setSelectedHotspotId(h.id);
                    }
                  }
                }}
                className={`hotspot-marker ${
                  h.type === 'link' ? 'hotspot-link' : ''
                } ${
                  selectedHotspotId === h.id
                    ? 'selected'
                    : hoveredHotspotId === h.id
                    ? 'hovered'
                    : h.type !== 'link' ? 'normal' : ''
                } mode-${isEditorMode ? 'editor' : 'view'}`}
                style={{
                  left: `${h.bbox.x}%`,
                  top: `${h.bbox.y}%`,
                  width: `${h.bbox.width}%`,
                  height: `${h.bbox.height}%`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredHotspotId(h.id)}
                onMouseLeave={() => setHoveredHotspotId(null)}
                title={h.type === 'link' ? `Đi đến trang ${h.correctAnswer}` : h.label}
              >
                {h.type !== 'link' && (
                  <span className="hotspot-marker-label">
                    {h.type === 'audio' ? '🔊' : i + 1}
                  </span>
                )}
                {h.type === 'link' && isEditorMode && (
                  <span style={{ fontSize: '9px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '1px 3px', borderRadius: '3px', color: '#60a5fa' }}>
                    🔗 P{h.correctAnswer}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Panel (40%) */}
        <div className="right-panel">
          {/* HEADLINE */}
          <div className="activities-header">
            <div className="activities-title-area">
              <h2 className="activities-title">
                {currentPage.id <= 4
                  ? 'Mục Lục Tương Tác'
                  : isEditorMode ? 'Danh sách vùng tương tác' : 'Vùng Tương Tác Học Sinh'}
              </h2>
              <p className="activities-subtitle">
                {currentPage.id <= 4
                  ? 'Bấm trực tiếp vào các tên bài học ở ảnh trang sách bên trái để nhảy nhanh đến trang bài học đó.'
                  : isEditorMode
                  ? 'Vẽ hộp bên sách để thêm câu hỏi tự động hiển thị ở đây.'
                  : 'Làm bài và thực hiện các hoạt động bên dưới.'}
              </p>
            </div>

            {/* Student action buttons */}
            {!isEditorMode && hotspots.length > 0 && currentPage.id > 4 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={resetAllAnswers}
                  style={{
                    backgroundColor: '#18181b',
                    color: '#d4d4d8',
                    border: '1px solid #27272a',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Làm lại
                </button>
                <button
                  onClick={toggleShowResults}
                  style={{
                    backgroundColor: showResults ? '#059669' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: showResults ? 'none' : '0 0 10px rgba(59,130,246,0.3)'
                  }}
                >
                  {showResults ? 'Ẩn đáp án' : 'Kiểm tra đáp án'}
                </button>
              </div>
            )}
          </div>

          {/* DYNAMIC LIST OF HOTSPOTS */}
          {hotspots.length === 0 ? (
            <div className="empty-activities-box">
              <span className="empty-icon">📝</span>
              <p className="empty-text">Chưa có hoạt động tương tác nào được tạo.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* If it's a TOC page, show the links outline in right panel too */}
              {currentPage.id <= 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#60a5fa' }}>Các liên kết chuyển trang nhanh:</span>
                  {hotspots.filter(h => h.type === 'link').map((h, i) => (
                    <button
                      key={h.id}
                      onClick={() => {
                        const targetPage = parseInt(h.correctAnswer || '');
                        if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= metadata.pages.length) {
                          setCurrentPageIndex(targetPage - 1);
                        }
                      }}
                      style={{
                        textAlign: 'left',
                        padding: '10px 14px',
                        backgroundColor: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '8px',
                        color: '#d4d4d8',
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ flex: 1 }}>🔗 {h.label || `Bài học ${i+1}`}</span>
                      <span style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 'bold' }}>Trang {h.correctAnswer} ➜</span>
                    </button>
                  ))}
                </div>
              )}

              {currentPage.id > 4 && hotspots.map((h, index) => {
                const isSelected = selectedHotspotId === h.id;
                const isHovered = hoveredHotspotId === h.id;
                const showCheck = showResults && h.correctAnswer;
                const isCorrect = isAnswerCorrect(h);

                return (
                  <div
                    key={h.id}
                    className={`interactive-card ${
                      isSelected ? 'selected' : isHovered ? 'hovered' : 'normal'
                    }`}
                    style={showCheck ? {
                      borderColor: isCorrect ? '#10b981' : '#ef4444',
                      backgroundColor: isCorrect ? 'rgba(16,185,129,0.03)' : 'rgba(239,68,68,0.03)'
                    } : {}}
                    onMouseEnter={() => setHoveredHotspotId(h.id)}
                    onMouseLeave={() => setHoveredHotspotId(null)}
                    onClick={() => setSelectedHotspotId(h.id)}
                  >
                    <div className="card-header">
                      <div className="card-title-group">
                        <span className="card-number">{index + 1}</span>
                        <span className="card-type-tag">{h.type}</span>
                      </div>

                      {showCheck && (
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: isCorrect ? '#10b981' : '#ef4444',
                          backgroundColor: isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          {isCorrect ? '✓ Đúng' : '✗ Sai'}
                        </span>
                      )}
                    </div>

                    {h.type === 'input' && (
                      <div className="input-activity-group">
                        <span className="input-activity-label">
                          {h.label || `Nhập câu trả lời cho mục ${index + 1}:`}
                        </span>
                        <textarea
                          placeholder="Viết đáp án của bạn vào đây..."
                          value={h.value || ''}
                          onClick={(e) => e.stopPropagation()}
                          disabled={showResults}
                          onChange={(e) => {
                            handleUpdateHotspotValue(h.id, e.target.value);
                          }}
                          className="input-activity-field"
                        />
                      </div>
                    )}

                    {h.type === 'mcq' && (
                      <div className="mcq-activity-group">
                        <span className="input-activity-label">
                          {h.label || `Lựa chọn đáp án đúng cho câu ${index + 1}:`}
                        </span>
                        <div className="mcq-options-row">
                          {['A', 'B', 'C', 'D'].map((opt) => (
                            <label
                              key={opt}
                              onClick={(e) => e.stopPropagation()}
                              className="mcq-option-label"
                            >
                              <input
                                type="radio"
                                name={`mcq_ans_${h.id}`}
                                disabled={showResults}
                                checked={h.value === opt}
                                onChange={() => {
                                  handleUpdateHotspotValue(h.id, opt);
                                }}
                                className="mcq-radio-input"
                              />
                              {opt}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {showCheck && (
                      <div style={{
                        marginTop: '12px',
                        padding: '10px 14px',
                        backgroundColor: '#18181b',
                        borderRadius: '8px',
                        borderLeft: '3px solid #3b82f6',
                        fontSize: '12px'
                      }}>
                        <span style={{ fontWeight: 600, color: '#60a5fa', display: 'block', marginBottom: '2px' }}>
                          🔑 Đáp án chính xác:
                        </span>
                        <span style={{ color: '#e4e4e7' }}>
                          {h.correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
