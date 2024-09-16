// Timer parametrləri
const WORK_TIME = 25 * 60;  
const BREAK_TIME = 5 * 60;  

let timeLeft = WORK_TIME;
let isWorkSession = true;
let timerInterval = null;
let isRunning = false;

// HTML elementləri
const timerDisplay = document.getElementById("timer");
const sessionTypeDisplay = document.getElementById("session-type");
const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");
const headerTitle = document.getElementById("header-title");
const notificationSound = document.getElementById("notification-sound");
const pauseButton = document.getElementById("pause-btn"); 

// Vaxtı formatla (mm:ss)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

// Timer ekranını yenilə
function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
    if (isWorkSession) {
        sessionTypeDisplay.textContent = "İş Sessiyası";
        headerTitle.textContent = "İş Sessiyası";
        timerDisplay.classList.add("work-session");
        timerDisplay.classList.remove("break-session");
    } else {
        sessionTypeDisplay.textContent = "Fasilə";
        headerTitle.textContent = "Fasilə";
        timerDisplay.classList.add("break-session");
        timerDisplay.classList.remove("work-session");
    }
}

// Timer-i başla
function startTimer() {
    if (!isRunning) {
        pauseButton.style.display = 'inline-block'; 
        startButton.style.display = 'none'; 
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                notificationSound.play();  
                isWorkSession = !isWorkSession;
                timeLeft = isWorkSession ? WORK_TIME : BREAK_TIME;
                updateTimerDisplay();
            }
        }, 1000);
        isRunning = true;
    }
}

// Timer-i dayandır və ya davam etdir
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval); 
        isRunning = false;
        pauseButton.textContent = "Davam et"; 
    } else {
        startTimer(); 
        pauseButton.textContent = "Dayandır"; 
    }
}

// Timer-i sıfırla
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = WORK_TIME;
    isWorkSession = true;
    updateTimerDisplay();
    pauseButton.style.display = 'none'; 
    startButton.style.display = 'inline-block'; 
}

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// İlk yenilənmə
updateTimerDisplay();
