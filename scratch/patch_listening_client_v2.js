const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../components/ListeningClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF to avoid CRLF mismatch
const isCrLf = content.includes('\r\n');
if (isCrLf) {
  content = content.replace(/\r\n/g, '\n');
}

// Replacement 1: State definition for selectedAnswers
content = content.replace(
  '  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});',
  '  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | string>>({});'
);

// Replacement 2: handleAnswerSelect
const originalHandleSelect = `  const handleAnswerSelect = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };`;

const newHandleSelect = `  const handleAnswerSelect = (questionId: string, optionIdx: number | string) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };`;

content = content.replace(originalHandleSelect, newHandleSelect);

// Replacement 3: submitQuiz
const originalSubmitQuiz = `  const submitQuiz = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct_index) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };`;

const newSubmitQuiz = `  const submitQuiz = () => {
    let score = 0;
    questions.forEach((q) => {
      if (q.type === 'fill_in_blank') {
        const userAns = String(selectedAnswers[q.id] || "").trim().toLowerCase();
        const correctAns = String(q.correct_answer || "").trim().toLowerCase();
        if (userAns === correctAns) {
          score += 1;
        }
      } else {
        if (selectedAnswers[q.id] === q.correct_index) {
          score += 1;
        }
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };`;

content = content.replace(originalSubmitQuiz, newSubmitQuiz);

// Replacement 4: Add inputValue state and syncer useEffect
const originalCurrentQuestion = '  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);';
const newCurrentQuestion = `  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (questions[currentQuestionIdx]) {
      const qId = questions[currentQuestionIdx].id;
      setInputValue(String(selectedAnswers[qId] ?? ""));
    }
  }, [currentQuestionIdx, questions, selectedAnswers]);`;

content = content.replace(originalCurrentQuestion, newCurrentQuestion);

// Replacement 5: Question Block Card
const originalQuestionBlock = `                {/* Question body card */}
                {questions[currentQuestionIdx] && (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5 space-y-4">
                      <h3 className="text-sm font-bold text-white leading-relaxed">
                        {questions[currentQuestionIdx].question}
                      </h3>
                      <div className="grid gap-2">
                        {questions[currentQuestionIdx].options.map((option, oIdx) => {
                          const qId = questions[currentQuestionIdx].id;
                          const isSelected = selectedAnswers[qId] === oIdx;
                          const hasAnswered = selectedAnswers[qId] !== undefined;
                          const isCorrect = oIdx === questions[currentQuestionIdx].correct_index;
                          
                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswerSelect(qId, oIdx)}
                              disabled={hasAnswered}
                              className={\`w-full rounded-xl border p-3.5 text-left text-xs font-medium transition flex items-center justify-between \${
                                hasAnswered
                                  ? isCorrect
                                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                    : isSelected
                                      ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
                                      : "border-slate-800/50 bg-slate-900/10 text-slate-600"
                                    : "border-slate-800/80 bg-slate-900/20 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50"
                              }\`}
                            >
                              <span>{option}</span>
                              {hasAnswered && isCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                              {hasAnswered && isSelected && !isCorrect && <span className="text-rose-400 font-bold">✗</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>`;

const newQuestionBlock = `                {/* Question body card */}
                {questions[currentQuestionIdx] && (
                  <div className="space-y-4">
                    {/* Exercise Title Hint */}
                    {questions[currentQuestionIdx].exercise_title && (
                      <div className="inline-block rounded-lg bg-sky-950/60 px-3 py-1 text-[10px] font-bold text-sky-400 uppercase tracking-wide border border-sky-900/40">
                        📚 {questions[currentQuestionIdx].exercise_title}
                      </div>
                    )}
                    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5 space-y-4">
                      <h3 className="text-sm font-bold text-white leading-relaxed">
                        {questions[currentQuestionIdx].question}
                      </h3>
                      
                      {/* MULTIPLE CHOICE / STANDARD BUTTONS */}
                      {(!questions[currentQuestionIdx].type || questions[currentQuestionIdx].type === 'multiple_choice') && (
                        <div className="grid gap-2">
                          {questions[currentQuestionIdx].options.map((option, oIdx) => {
                            const qId = questions[currentQuestionIdx].id;
                            const isSelected = selectedAnswers[qId] === oIdx;
                            const hasAnswered = selectedAnswers[qId] !== undefined;
                            const isCorrect = oIdx === questions[currentQuestionIdx].correct_index;
                            
                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleAnswerSelect(qId, oIdx)}
                                disabled={hasAnswered}
                                className={\`w-full rounded-xl border p-3.5 text-left text-xs font-medium transition flex items-center justify-between \${
                                  hasAnswered
                                    ? isCorrect
                                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                      : isSelected
                                        ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
                                        : "border-slate-800/50 bg-slate-900/10 text-slate-600"
                                    : "border-slate-800/80 bg-slate-900/20 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50"
                                }\`}
                              >
                                <span>{option}</span>
                                {hasAnswered && isCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                                {hasAnswered && isSelected && !isCorrect && <span className="text-rose-400 font-bold">✗</span>}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* FILL IN THE BLANK INPUT */}
                      {questions[currentQuestionIdx].type === 'fill_in_blank' && (() => {
                        const q = questions[currentQuestionIdx];
                        const qId = q.id;
                        const hasAnswered = selectedAnswers[qId] !== undefined;
                        const isCorrect = hasAnswered && String(selectedAnswers[qId] || "").trim().toLowerCase() === String(q.correct_answer || "").trim().toLowerCase();
                        
                        return (
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                disabled={hasAnswered}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && !hasAnswered && inputValue.trim()) {
                                    handleAnswerSelect(qId, inputValue.trim());
                                  }
                                }}
                                placeholder="Nhập câu trả lời..."
                                className={\`flex-1 rounded-xl border bg-slate-900 px-4 py-3 text-xs text-white transition focus:outline-none focus:ring-1 \${
                                  hasAnswered
                                    ? isCorrect
                                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                      : "border-rose-500/50 bg-rose-500/10 text-rose-400"
                                    : "border-slate-800 focus:border-slate-700"
                                }\`}
                              />
                              {!hasAnswered && (
                                <button
                                  onClick={() => inputValue.trim() && handleAnswerSelect(qId, inputValue.trim())}
                                  className="rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-amber-500 active:scale-95"
                                >
                                  Kiểm Tra
                                </button>
                              )}
                            </div>
                            {hasAnswered && !isCorrect && (
                              <div className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                                <span>✗ Chưa chính xác. Đáp án đúng:</span>
                                <span className="underline font-bold text-white bg-slate-900 px-2 py-0.5 rounded">{q.correct_answer}</span>
                              </div>
                            )}
                            {hasAnswered && isCorrect && (
                              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                                <span>✓ Chính xác!</span>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* MATCHING / DROPDOWN SELECTOR */}
                      {questions[currentQuestionIdx].type === 'matching' && (() => {
                        const q = questions[currentQuestionIdx];
                        const qId = q.id;
                        const hasAnswered = selectedAnswers[qId] !== undefined;
                        const isCorrect = hasAnswered && selectedAnswers[qId] === q.correct_index;
                        
                        return (
                          <div className="space-y-3">
                            <select
                              disabled={hasAnswered}
                              value={selectedAnswers[qId] !== undefined ? selectedAnswers[qId] : ""}
                              onChange={(e) => handleAnswerSelect(qId, parseInt(e.target.value, 10))}
                              className={\`w-full rounded-xl border bg-slate-900 px-4 py-3 text-xs text-white transition focus:outline-none focus:ring-1 appearance-none cursor-pointer \${
                                hasAnswered
                                  ? isCorrect
                                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                    : "border-rose-500/50 bg-rose-500/10 text-rose-400"
                                  : "border-slate-800 focus:border-slate-700"
                              }\`}
                            >
                              <option value="" disabled>-- Chọn đáp án đúng --</option>
                              {q.options.map((opt, oIdx) => (
                                <option key={oIdx} value={oIdx}>{opt}</option>
                              ))}
                            </select>
                            {hasAnswered && !isCorrect && (
                              <div className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                                <span>✗ Chưa chính xác. Đáp án đúng:</span>
                                <span className="underline font-bold text-white bg-slate-900 px-2 py-0.5 rounded">{q.options[q.correct_index]}</span>
                              </div>
                            )}
                            {hasAnswered && isCorrect && (
                              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                                <span>✓ Chính xác!</span>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                    </div>
                  </div>`;

content = content.replace(originalQuestionBlock, newQuestionBlock);

// Replacement 6: Explanations list block
const originalExplanations = `            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {questions.map((q, idx) => {
                const isCorrect = selectedAnswers[q.id] === q.correct_index;
                return (
                  <div key={q.id} className={\`p-3.5 rounded-xl border \${isCorrect ? "border-emerald-950 bg-emerald-950/10" : "border-rose-950 bg-rose-950/10"}\`}>
                    <p className="text-[11px] font-bold text-white">Q{idx + 1}: {q.question}</p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Lựa chọn của em: <span className={isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{q.options[selectedAnswers[q.id]] || "N/A"}</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-300">
                      Đáp án đúng: <span className="text-emerald-400 font-bold">{q.options[q.correct_index]}</span>
                    </p>
                    <p className="mt-2 text-[10px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-1.5 italic">
                      🔍 Giải thích: {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>`;

const newExplanations = `            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = q.type === 'fill_in_blank'
                  ? String(userAns || "").trim().toLowerCase() === String(q.correct_answer || "").trim().toLowerCase()
                  : userAns === q.correct_index;

                const displayUserAns = q.type === 'fill_in_blank'
                  ? String(userAns || "N/A")
                  : q.options[userAns as number] || "N/A";

                const displayCorrectAns = q.type === 'fill_in_blank'
                  ? q.correct_answer
                  : q.options[q.correct_index];

                return (
                  <div key={q.id} className={\`p-3.5 rounded-xl border \${isCorrect ? "border-emerald-950 bg-emerald-950/10" : "border-rose-950 bg-rose-950/10"}\`}>
                    <p className="text-[11px] font-bold text-white">Q{idx + 1}: {q.question}</p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Lựa chọn của em: <span className={isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{displayUserAns}</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-300">
                      Đáp án đúng: <span className="text-emerald-400 font-bold">{displayCorrectAns}</span>
                    </p>
                    <p className="mt-2 text-[10px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-1.5 italic">
                      🔍 Giải thích: {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>`;

content = content.replace(originalExplanations, newExplanations);

// Restore line endings
if (isCrLf) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched components/ListeningClient.tsx v2!');
