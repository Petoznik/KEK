const grid = document.getElementById("gameGrid");
const questionModal = document.getElementById("questionModal");
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const closeModal = document.getElementById("closeModal");
const startGame = document.getElementById("startGame");
const teamCountSelect = document.getElementById("teamCount");
const scoreboard = document.getElementById("scoreboard");
const winnerModal = document.getElementById("winnerModal");
const winnerText = document.getElementById("winnerText");
const chartCanvas = document.getElementById("chart");

let teams = [];
let currentTeam = 0;
let remainingQuestions = 25;

startGame.addEventListener("click", () => {
  const teamCount = parseInt(teamCountSelect.value);
  teams = Array.from({ length: teamCount }, (_, i) => ({
    name: `Tým ${i + 1}`,
    score: 0
  }));
  currentTeam = 0;
  renderScoreboard();
  generateGrid();
});

function renderScoreboard() {
  scoreboard.innerHTML = "";
  teams.forEach(t => {
    const box = document.createElement("div");
    box.classList.add("score-box");
    box.textContent = `${t.name}: ${t.score}`;
    scoreboard.appendChild(box);
  });
}

function generateGrid() {
  grid.innerHTML = "";
  const headers = ["Název témata", "Název témata", "Název témata", "Název témata", "Název témata"];
  const values = [100, 200, 300, 400, 500];

  // první řádek - názvy
  headers.forEach(h => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = h;
    grid.appendChild(cell);
  });

  // další řádky s hodnotami
  values.forEach(v => {
    for (let i = 0; i < 5; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = v;
      cell.addEventListener("click", () => askQuestion(cell, v));
      grid.appendChild(cell);
    }
  });
}

function askQuestion(cell, value) {
  if (cell.classList.contains("answered")) return;
  questionModal.style.display = "flex";
  questionText.textContent = "Sem přidej otázku";

  const answers = [
    { text: "Odpověď A", correct: Math.random() < 0.33 },
    { text: "Odpověď B", correct: Math.random() < 0.33 },
    { text: "Odpověď C", correct: Math.random() < 0.33 }
  ];

  // Zajistíme, že přesně jedna odpověď bude správná
  if (!answers.some(a => a.correct)) {
    answers[Math.floor(Math.random() * 3)].correct = true;
  } else {
    const correctCount = answers.filter(a => a.correct).length;
    while (correctCount > 1) {
      answers.forEach((a, i) => {
        if (a.correct && i !== 0) a.correct = false;
      });
    }
  }

  // promíchání
  answers.sort(() => Math.random() - 0.5);

  answersDiv.innerHTML = "";
  answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans.text;
    btn.onclick = () => handleAnswer(ans.correct, value, cell);
    answersDiv.appendChild(btn);
  });
}

function handleAnswer(correct, value, cell) {
  questionModal.style.display = "none";
  cell.classList.add("answered");
  cell.style.opacity = 0.5;
  if (correct) {
    teams[currentTeam].score += value;
  } else {
    teams[currentTeam].score -= value;
  }
  renderScoreboard();

  currentTeam = (currentTeam + 1) % teams.length;
  remainingQuestions--;

  if (remainingQuestions <= 0) {
    showWinner();
  }
}

closeModal.addEventListener("click", () => {
  questionModal.style.display = "none";
});

function showWinner() {
  const maxScore = Math.max(...teams.map(t => t.score));
  const winners = teams.filter(t => t.score === maxScore);
  const winnerNames = winners.map(w => w.name).join(", ");
  winnerText.textContent = `Gratulace ${winnerNames}! 🎉`;

  winnerModal.style.display = "flex";

  const ctx = chartCanvas.getContext("2d");
  const barWidth = 80;
  const gap = 30;
  ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
  ctx.fillStyle = "white";
  ctx.font = "16px Poppins";
  ctx.textAlign = "center";

  teams.forEach((t, i) => {
    const x = 70 + i * (barWidth + gap);
    const height = (t.score / 10) + 150; // vizuální úprava
    ctx.fillStyle = "rgba(31,215,232,0.9)";
    ctx.fillRect(x, 250 - height, barWidth, height);
    ctx.fillStyle = "white";
    ctx.fillText(t.name, x + barWidth / 2, 280);
    ctx.fillText(t.score, x + barWidth / 2, 250 - height - 10);
  });
}
