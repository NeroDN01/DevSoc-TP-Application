const body = document.body;
const clockDisplay = document.getElementById('clock-display');

const clockNavBtn = document.getElementById('clock-nav-btn');
const timerNavBtn = document.getElementById('timer-nav-btn');
const clockScreen = document.getElementById('clock-screen');
const timerScreen = document.getElementById('timer-screen');

clockNavBtn.addEventListener('click', () => {
  clockScreen.classList.remove('hide');
  timerScreen.classList.add('hide');
  clockNavBtn.classList.add('active');
  timerNavBtn.classList.remove('active');
});

timerNavBtn.addEventListener('click', () => {
  timerScreen.classList.remove('hide');
  clockScreen.classList.add('hide');
  timerNavBtn.classList.add('active');
  clockNavBtn.classList.remove('active');
});

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  clockDisplay.textContent = `${h}:${m}:${s}`;
}

updateClock();                 
setInterval(updateClock, 1000);

const timerDisplay = document.getElementById('timer-display');
const minutesInput = document.getElementById('timer-minutes-input');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const themeColorMeta = document.getElementById('theme-color-meta');

let timerInterval = null;
let secondsLeft = 0;

function updateTimerDisplay() {
  const m = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const s = String(secondsLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${m}:${s}`;
}

startBtn.addEventListener('click', () => {
  if (timerInterval) return; 

  if (secondsLeft <= 0) {
    const minutes = Number(minutesInput.value) || 0;
    secondsLeft = minutes * 60;
  }

  timerInterval = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Time's up!");
    }
  }, 1000);
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  secondsLeft = 0;
  updateTimerDisplay();
});

const modeToggleBtn = document.getElementById('mode-toggle-btn');
const faviconLink = document.getElementById('favicon-link');

modeToggleBtn.addEventListener('click', () => {
  const isNight = body.classList.toggle('night-mode');
  body.classList.toggle('day-mode', !isNight);

  if (isNight) {
    faviconLink.setAttribute('href', 'Images/night.png');
    modeToggleBtn.textContent = '☀️';
  } else {
    faviconLink.setAttribute('href', 'Images/sun.png');
    modeToggleBtn.textContent = '🌙';
  }
});