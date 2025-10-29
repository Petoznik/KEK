// Nastavení roku v patičce
document.getElementById('year').textContent = new Date().getFullYear();

// Témata a otázky
const topics = [
  "Bankovní soustava ČR",
  "Peníze",
  "Burzy",
  "Cenné papíry",
  "Obchodní banky a jejich obchody"
];

const questions = {
  100: [
    {
      question: "Jak se nazývá obchod, při kterém lidé směňují zboží nebo služby bez použití peněz?",
      answers: ["A) peněžní obchod", "B) barterový obchod", "C) komoditní směna"],
      correct: 1
    },
    {
      question: "Otázka za 100 bodů - téma 2",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 1
    },
    {
      question: "Otázka za 100 bodů - téma 3",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 2
    },
    {
      question: "Otázka za 100 bodů - téma 4",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 0
    },
    {
      question: "Otázka za 100 bodů - téma 5",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 1
    }
  ],
  200: [
    {
      question: "Která z následujících možností není funkcí peněz?",
      answers: ["A) prostředek směny", "B) uchovatel hodnoty", "C) zprostředkovatel prááce"],
      correct: 2
    },
    {
      question: "Otázka za 200 bodů - téma 2",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 0
    },
    {
      question: "Otázka za 200 bodů - téma 3",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 2
    },
    {
      question: "Otázka za 200 bodů - téma 4",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 1
    },
    {
      question: "Otázka za 200 bodů - téma 5",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 0
    }
  ],
  300: [
    {
      question: "Jaké byly čtyři hlavní etapy vývoje peněz?",
      answers: ["A) naturální směna, komoditní, papírové, depozitní", "B) papírové, kovové, kreditní, elektronické", "C) směnný obchod, kterditní peníze, papírové, kovové"],
      correct: 0
    },
    {
      question: "Otázka za 300 bodů - téma 2",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 1
    },
    {
      question: "Otázka za 300 bodů - téma 3",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 0
    },
    {
      question: "Otázka za 300 bodů - téma 4",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 2
    },
    {
      question: "Otázka za 300 bodů - téma 5",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 1
    }
  ],
  400: [
    {
      question: "Která z následujících vlastností nepatří mezi vlastnosti peněz?",
      answers: ["A) přesnost", "B) dělitelnost", "C) chutnost"],
      correct: 2
    },
    {
      question: "Otázka za 400 bodů - téma 2",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 2
    },
    {
      question: "Otázka za 400 bodů - téma 3",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 1
    },
    {
      question: "Otázka za 400 bodů - téma 4",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 0
    },
    {
      question: "Otázka za 400 bodů - téma 5",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 2
    }
  ],
  500: [
    {
      question: "Proč se pivo neosvědčilo jako komoditní peníze?",
      answers: ["A) špatně se skladuje, ztrácí kvalitu", "B) nedá se rozdělit na části", "C) je příliš těžké na přenos"],
      correct: 0
    },
    {
      question: "Otázka za 500 bodů - téma 2",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 0
    },
    {
      question: "Otázka za 500 bodů - téma 3",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 2
    },
    {
      question: "Otázka za 500 bodů - téma 4",
      answers: ["Odpověď A", "Odpověď B", "Odpověď C"],
      correct: 1
    },
    {
      question: "je toto skibidi toilete - téma 5",
      answers: ["skibidi toilet", "Odpověď B", "Odpověď C"],
      correct: 0
    }
  ]
};

// Herní stav
let teams = [];
let currentTeamIndex = 0;
let usedCells = new Set();
let timer;
let timeLeft;
let currentPoints = 0;

// Inicializace hry
document.getElementById('startGame').addEventListener('click', startGame);

function startGame() {
  const teamCount = parseInt(document.getElementById('teamCount').value);
  
  // Vytvoření týmů
  teams = [];
  for (let i = 1; i <= teamCount; i++) {
    teams.push({
      name: `Tým ${i}`,
      score: 0
    });
  }

  // Skrytí nastavení a zobrazení hry
  document.getElementById('setupContainer').style.display = 'none';
  
  // Vytvoření scoreboardu
  createScoreboard();
  
  // Vytvoření herního pole
  createGameGrid();
}

function createScoreboard() {
  const scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = '';
  scoreboard.classList.add('active');

  teams.forEach((team, index) => {
    const teamDiv = document.createElement('div');
    teamDiv.className = 'team-score';
    teamDiv.id = `team-${index}`;
    if (index === currentTeamIndex) {
      teamDiv.classList.add('active-team');
    }
    teamDiv.innerHTML = `
      <span class="team-name">${team.name}</span>
      <span class="team-points">${team.score}</span>
    `;
    scoreboard.appendChild(teamDiv);
  });
}

function updateScoreboard() {
  teams.forEach((team, index) => {
    const teamDiv = document.getElementById(`team-${index}`);
    teamDiv.querySelector('.team-points').textContent = team.score;
    
    // Aktualizace aktivního týmu
    if (index === currentTeamIndex) {
      teamDiv.classList.add('active-team');
    } else {
      teamDiv.classList.remove('active-team');
    }
  });
}

function createGameGrid() {
  const grid = document.getElementById('gameGrid');
  grid.innerHTML = '';
  grid.classList.add('active');

  // První řádek - témata
  topics.forEach(topic => {
    const cell = document.createElement('div');
    cell.className = 'grid-item header';
    cell.textContent = topic;
    grid.appendChild(cell);
  });

  // Řádky s body
  const points = [100, 200, 300, 400, 500];
  points.forEach(point => {
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement('div');
      cell.className = 'grid-item';
      cell.textContent = point;
      cell.dataset.points = point;
      cell.dataset.column = col;
      cell.addEventListener('click', () => handleCellClick(cell, point, col));
      grid.appendChild(cell);
    }
  });
}

function handleCellClick(cell, points, column) {
  if (cell.classList.contains('used')) return;

  currentPoints = points;
  cell.classList.add('used');
  usedCells.add(`${points}-${column}`);

  // Zobrazení otázky
  showQuestion(points, column);

  // Kontrola konce hry
  if (usedCells.size === 25) {
    setTimeout(endGame, 2000);
  }
}

function showQuestion(points, column) {
  const modal = document.getElementById('questionModal');
  const questionIndex = column;
  const question = questions[points][questionIndex];

  document.getElementById('currentPoints').textContent = `Hrajete o ${points} bodů`;
  document.getElementById('questionText').textContent = question.question;

  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';

  question.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = answer;
    btn.addEventListener('click', () => handleAnswer(index, question.correct, points));
    answersDiv.appendChild(btn);
  });

  modal.classList.add('active');
  startTimer();
}

function startTimer() {
  timeLeft = 30;
  document.getElementById('timer').textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleAnswer(-1, -1, currentPoints); // Čas vypršel
    }
  }, 1000);
}

function handleAnswer(selectedIndex, correctIndex, points) {
  clearInterval(timer);

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === correctIndex) {
      btn.classList.add('correct');
    } else if (index === selectedIndex) {
      btn.classList.add('incorrect');
    }
  });

  // Aktualizace skóre
  if (selectedIndex === correctIndex) {
    teams[currentTeamIndex].score += points;
  } else {
    teams[currentTeamIndex].score -= points;
  }

  updateScoreboard();

  // Zobrazení tlačítka pokračovat
  document.getElementById('closeModal').classList.add('active');
}

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('questionModal').classList.remove('active');
  document.getElementById('closeModal').classList.remove('active');
  
  // Přepnutí na další tým
  currentTeamIndex = (currentTeamIndex + 1) % teams.length;
  updateScoreboard();
});

function endGame() {
  // Najít vítěze
  const maxScore = Math.max(...teams.map(t => t.score));
  const winners = teams.filter(t => t.score === maxScore);

  const winnerModal = document.getElementById('winnerModal');
  const winnerText = document.getElementById('winnerText');
  
  if (winners.length === 1) {
    winnerText.textContent = `🏆 Gratulujeme ${winners[0].name}! 🏆`;
  } else {
    winnerText.textContent = `🏆 Remíza! 🏆`;
  }

  // Zobrazení finálního skóre
  const finalScores = document.getElementById('finalScores');
  finalScores.innerHTML = '';

  // Seřazení týmů podle skóre
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  sortedTeams.forEach(team => {
    const div = document.createElement('div');
    div.className = 'final-team-score';
    if (team.score === maxScore) {
      div.classList.add('winner');
    }
    div.innerHTML = `
      <span>${team.name}</span>
      <span>${team.score} bodů</span>
    `;
    finalScores.appendChild(div);
  });

  winnerModal.classList.add('active');
}

document.getElementById('restartBtn').addEventListener('click', () => {
  location.reload();
});