const questions = [
  {
    type: "mcq",
    text: "_____ alex sir is a diddy",
    options: ["yes", "No,", "maybe", "-leave-blank-"],
    answer: [2]
  },

  {
    type: "numerical",
    text: "How big is Surunsh sir's cucumber?",
    answer: "12"
  },
  {
    type: "mcq",
    text: "Who has bigger muscles: Rojwunt sir or Pratik sir?",
    options: ["Rojwunt", "Pratik", "Both", "Neither"],
    answer: [0]
  }
];

let currentQ = 0;
const qnText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const qnBtns = document.querySelectorAll(".qn-btn");
const animContainer = document.getElementById("animation-container");
const statusMap = Array(questions.length).fill("unanswered");

function loadQuestion(index) {
  currentQ = index;
  const q = questions[index];
  qnText.textContent = q.text;
  optionsBox.innerHTML = "";

  if (q.type === "mcq") {
    q.options.forEach((opt, i) => {
      const div = document.createElement("div");
      div.className = "option";
      div.textContent = opt;
      div.onclick = () => checkMCQAnswer(i, div, q.answer);
      optionsBox.appendChild(div);
    });
  } else if (q.type === "numerical") {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "num-input";
    input.placeholder = "Enter your answer";

    const btn = document.createElement("button");
    btn.className = "check-btn";
    btn.textContent = "Check Answer";
    btn.onclick = () => checkNumericalAnswer(input.value.trim(), q.answer);

    optionsBox.appendChild(input);
    optionsBox.appendChild(btn);
  }

  updateButtonStyles();
}

function playSound(type) {
  const sound = document.getElementById(type === "correct" ? "sound-correct" : "sound-wrong");
  sound.currentTime = 0;
  sound.play();
}

function spawnParticles(count = 25) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 80 + 30;
    const x = Math.cos(angle) * radius + "px";
    const y = Math.sin(angle) * radius + "px";
    particle.style.setProperty("--x", x);
    particle.style.setProperty("--y", y);
    animContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
  }
}

function triggerAnimation(type) {
  const img = document.createElement("img");
  img.src = type === "correct" ? "../images/pic1.png" : "../images/pic2.png";
  img.className = "totem-img";
  animContainer.innerHTML = "";
  animContainer.appendChild(img);

  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 400);

  playSound(type);
  spawnParticles();


  if (Math.random() < 0.3) jumpscare();
}

function checkMCQAnswer(selected, el, correct) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => opt.onclick = null); // Disable

  if (correct.includes(selected)) {
    el.classList.add("correct");
    statusMap[currentQ] = "correct";
    triggerAnimation("correct");
  } else {
    el.classList.add("wrong");
    correct.forEach(i => allOptions[i].classList.add("correct"));
    statusMap[currentQ] = "wrong";
    triggerAnimation("wrong");
  }
  showResult();
  updateButtonStyles();
  
}

function checkNumericalAnswer(input, correct) {
  const isCorrect = input === correct;
  if (isCorrect) {
    alert("✅ Correct!");
    statusMap[currentQ] = "correct";
    triggerAnimation("correct");
  } else {
    alert(`❌ Wrong! Correct answer is: ${correct}`);
    statusMap[currentQ] = "wrong";
    triggerAnimation("wrong");
  }
  showResult();
  updateButtonStyles();
  

}

function updateButtonStyles() {
  qnBtns.forEach((btn, idx) => {
    btn.classList.remove("correct", "wrong", "unanswered");
    btn.classList.add(statusMap[idx]);
  });
}

qnBtns.forEach(btn => {
  btn.onclick = () => loadQuestion(+btn.dataset.q);
});

loadQuestion(0);

document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("img");
  trail.src = "../images/trail.png";
  trail.className = "cursor-trail";
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;

  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 600);
});


function showResult() {
  const correctCount = statusMap.filter(s => s === "correct").length;
  const banner = document.getElementById("result-banner");

  if (correctCount === 3) {
    banner.textContent = "🎉 Congrats! You have cracked AI AI Titty Bamboo!";
    banner.style.color = "#00ff00";
    banner.style.textShadow = "0 0 6px #0f0";
  } else if (correctCount === 2) {
    banner.textContent = "📉 Take drop bro.";
    banner.style.color = "#ff9900";
    banner.style.textShadow = "0 0 6px #f90";
  } else if (correctCount === 1) {
    banner.textContent = "🚨 Only 1 correct? Drop incoming...";
    banner.style.color = "#ff3333";
    banner.style.textShadow = "0 0 6px #f00";
  } else {
    banner.textContent = "💀 No correct. Please suicide";
    banner.style.color = "#ff0000";
    banner.style.textShadow = "0 0 8px #f00";
  }
}
