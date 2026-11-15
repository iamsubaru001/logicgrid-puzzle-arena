const ciphers = [
  { code: "KHOOR ZRUOG", answer: "HELLO WORLD", hint: "Hint: Classic shift of 3 used by Julius Caesar.", points: 100 },
  { code: "ORJLF JULG", answer: "LOGIC GRID", hint: "Hint: Shift backward by 3 letters.", points: 150 },
  { code: "FRGH EUHDNHU", answer: "CODE BREAKER", hint: "Hint: Shift each letter -3 positions.", points: 200 }
];
let currentIdx = 0;
function caesarShift(text, shift) {
  return text.toUpperCase().replace(/[A-Z]/g, (ch) => {
    const code = ch.charCodeAt(0) - 65;
    return String.fromCharCode((((code + shift) % 26 + 26) % 26) + 65);
  });
}
const sandboxInput = document.getElementById("sandboxInput");
const shiftRange = document.getElementById("shiftRange");
function updateSandbox() {
  const s = parseInt(shiftRange.value, 10);
  document.getElementById("shiftVal").textContent = s > 0 ? `+${s}` : `${s}`;
  document.getElementById("sandboxOutput").textContent = caesarShift(sandboxInput.value, s);
}
sandboxInput.addEventListener("input", updateSandbox);
shiftRange.addEventListener("input", updateSandbox);
function loadCipher(idx) {
  const item = ciphers[idx];
  document.getElementById("cipherLevelBadge").textContent = `Transmission #${idx + 1}`;
  document.getElementById("cipherPrompt").textContent = item.code;
  document.getElementById("cipherHint").textContent = item.hint;
  document.getElementById("cipherAnswer").value = "";
  document.getElementById("cipherStatus").textContent = "";
  sandboxInput.value = item.code;
  updateSandbox();
}
document.getElementById("checkCipherBtn").addEventListener("click", () => {
  const userAns = document.getElementById("cipherAnswer").value.trim().toUpperCase();
  const status = document.getElementById("cipherStatus");
  const item = ciphers[currentIdx];
  if (userAns === item.answer) {
    status.textContent = `Decrypted! +${item.points} pts logged.`;
    status.className = "status-msg success";
    const history = JSON.parse(localStorage.getItem("logicgrid_scores") || "[]");
    history.push({ module: "Cipher Decoder", puzzle: `Transmission #${currentIdx + 1}`, points: item.points, date: new Date().toLocaleDateString() });
    localStorage.setItem("logicgrid_scores", JSON.stringify(history));
  } else {
    status.textContent = "Incorrect plaintext. Try adjusting the shift offset!";
    status.className = "status-msg error";
  }
});
document.getElementById("nextCipherBtn").addEventListener("click", () => {
  currentIdx = (currentIdx + 1) % ciphers.length;
  loadCipher(currentIdx);
});
loadCipher(0);
