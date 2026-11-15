const riddles = [
  { seq: "2, 6, 12, 20, 30, ?", answer: 42, tier: "Tier 1 • Easy", clue: "Clue: Differences increase by +2 each step (4, 6, 8, 10, 12).", points: 100 },
  { seq: "1, 1, 2, 3, 5, 8, 13, ?", answer: 21, tier: "Tier 1 • Easy", clue: "Clue: Classic Fibonacci sum of the previous two terms.", points: 100 },
  { seq: "3, 7, 15, 31, 63, ?", answer: 127, tier: "Tier 2 • Medium", clue: "Clue: Each term follows 2^n - 1.", points: 150 },
  { seq: "1, 4, 27, 256, ?", answer: 3125, tier: "Tier 3 • Hard", clue: "Clue: Self-powers n^n (1^1, 2^2, 3^3, 4^4, 5^5).", points: 250 }
];
let rIdx = 0, streak = 0;
function renderRiddle() {
  const r = riddles[rIdx];
  document.getElementById("seqDifficulty").textContent = r.tier;
  document.getElementById("seqDisplay").textContent = r.seq;
  document.getElementById("seqClue").textContent = r.clue;
  document.getElementById("seqInput").value = "";
  document.getElementById("seqFeedback").textContent = "";
}
document.getElementById("submitSeqBtn").addEventListener("click", () => {
  const val = parseInt(document.getElementById("seqInput").value, 10);
  const fb = document.getElementById("seqFeedback");
  const r = riddles[rIdx];
  if (val === r.answer) {
    streak++;
    document.getElementById("seqStreak").textContent = streak;
    fb.textContent = `Correct! +${r.points} pts added to your detective record.`;
    fb.className = "status-msg success";
    const history = JSON.parse(localStorage.getItem("logicgrid_scores") || "[]");
    history.push({ module: "Sequence Riddles", puzzle: r.seq, points: r.points, date: new Date().toLocaleDateString() });
    localStorage.setItem("logicgrid_scores", JSON.stringify(history));
  } else {
    streak = 0;
    document.getElementById("seqStreak").textContent = streak;
    fb.textContent = "Not quite! Check the pattern clue and try again.";
    fb.className = "status-msg error";
  }
});
document.getElementById("skipSeqBtn").addEventListener("click", () => {
  rIdx = (rIdx + 1) % riddles.length;
  renderRiddle();
});
renderRiddle();
