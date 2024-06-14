let isRunning = false;
let worker;

document.addEventListener('DOMContentLoaded', function() {
    updateDisplay(600); // Set initial timer display to 10 minutes (600 seconds)
});

document.querySelectorAll('.timeButton').forEach(button => {
    button.addEventListener('click', function() {
        const time = parseInt(this.getAttribute('data-time'), 10);
        if (worker) {
            worker.postMessage({ command: 'set', time: time });
        }
        updateDisplay(time);
    });
});

document.getElementById('startStopButton').addEventListener('click', function() {
    if (isRunning) {
        worker.postMessage({ command: 'stop' });
        isRunning = false;
        this.textContent = 'Start';
        enableTimeButtons(true);
    } else {
        if (window.Worker) {
            worker = new Worker('timerWorker.js');
            worker.postMessage({ command: 'start', time: getTimerValue() });

            worker.onmessage = function(e) {
                if (e.data.done) {
                    isRunning = false;
                    document.getElementById('startStopButton').textContent = 'Start';
                    enableTimeButtons(true);
                } else {
                    updateDisplay(e.data.time);
                }
            };
        }
        isRunning = true;
        this.textContent = 'Stop';
        enableTimeButtons(false);
    }
});

function updateDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function enableTimeButtons(enable) {
    document.querySelectorAll('.timeButton').forEach(button => {
        button.disabled = !enable;
    });
}

function getTimerValue() {
    const timerDisplay = document.getElementById('timerDisplay').textContent;
    const [minutes, seconds] = timerDisplay.split(':').map(Number);
    return (minutes * 60) + seconds;
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
