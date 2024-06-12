
// script.js
let timer = 600; // Default timer value to 10 minutes (600 seconds)
let isRunning = false;
let countdown;

// Set initial timer display to 10 minutes
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});

document.querySelectorAll('.timeButton').forEach(button => {
    button.addEventListener('click', function() {
        timer = parseInt(this.getAttribute('data-time'), 10);
        updateDisplay();
    });
});

document.getElementById('startStopButton').addEventListener('click', function() {
    if (isRunning) {
        clearInterval(countdown);
        isRunning = false;
        this.textContent = 'Start';
        enableTimeButtons(true);
    } else {
        isRunning = true;
        this.textContent = 'Stop';
        enableTimeButtons(false);
        countdown = setInterval(() => {
            timer--;
            updateDisplay();
            if (timer <= 0) {
                clearInterval(countdown);
                document.getElementById('endSound').play();
                isRunning = false;
                document.getElementById('startStopButton').textContent = 'Start';
                enableTimeButtons(true);
            }
        }, 1000);
    }
});

function updateDisplay() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function enableTimeButtons(enable) {
    document.querySelectorAll('.timeButton').forEach(button => {
        button.disabled = !enable;
    });
}

// Display random inspirational quotes
const quotes = [
    "Peace comes from within. Do not seek it without. - Buddha",
    "The quieter you become, the more you can hear. - Ram Dass",
    "Within you, there is a stillness and a sanctuary to which you can retreat at any time. - Hermann Hesse"
];

function displayQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.textContent = randomQuote;
}

displayQuote();