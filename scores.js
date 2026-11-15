function getRank(points) {
  if (points >= 800) return "Grandmaster Cryptographer";
  if (points >= 400) return "Senior Logic Detective";
  if (points >= 150) return "Field Codebreaker";
  return "Novice Analyst";
}
function renderScores() {
  const history = JSON.parse(localStorage.getItem("logicgrid_scores") || "[]");
  const totalPoints = history.reduce((sum, item) => sum + item.points, 0);
  document.getElementById("totalPoints").textContent = `${totalPoints} pts`;
  document.getElementById("solvedCount").textContent = history.length;
  document.getElementById("detectiveRank").textContent = getRank(totalPoints);
  const list = document.getElementById("historyList");
  if (history.length === 0) {
    list.innerHTML = `<p style="color:#94a3b8;">No puzzles solved yet. Head to Cipher Decoder or Sequence Riddles to earn points!</p>`;
    return;
  }
  list.innerHTML = history.slice().reverse().map((entry) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:#0f172a;border:1px solid #334155;border-radius:8px;">
      <div>
        <strong style="color:#38bdf8;">${entry.module}</strong> &mdash; <span>${entry.puzzle}</span>
        <div style="font-size:0.8rem;color:#94a3b8;">Completed on ${entry.date}</div>
      </div>
      <span class="badge" style="color:#22c55e;">+${entry.points} pts</span>
    </div>`
  ).join("");
}
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  localStorage.removeItem("logicgrid_scores");
  renderScores();
});
renderScores();
