let timer = 600;
let countdown;
let isRunning = false;
let wakeLock = null;

// Request notification permission on page load
if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// Set initial timer display to 10 minutes
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});

document.getElementById('startStopButton').addEventListener('click', function () {
    if (isRunning) {
        clearInterval(countdown);
        isRunning = false;
        document.getElementById('startStopButton').textContent = 'Start';
        enableTimeButtons(true);
        if (wakeLock !== null) {
            wakeLock.release().then(() => {
                wakeLock = null;
            });
        }
    } else {
        isRunning = true;
        document.getElementById('startStopButton').textContent = 'Stop';
        enableTimeButtons(false);
        const endTime = Date.now() + timer * 1000;
        countdown = setInterval(() => {
            const remainingTime = Math.max(0, endTime - Date.now());
            timer = Math.ceil(remainingTime / 1000);
            updateDisplay();
            if (timer <= 0) {
                clearInterval(countdown);
                document.getElementById('endSound').play();
                sendNotification();
                isRunning = false;
                document.getElementById('startStopButton').textContent = 'Start';
                enableTimeButtons(true);
                if (wakeLock !== null) {
                    wakeLock.release().then(() => {
                        wakeLock = null;
                    });
                }
            }
        }, 1000);
        if ('wakeLock' in navigator) {
            requestWakeLock();
        } else {
            console.warn('Wake Lock API not supported. The timer may not function properly if the screen is locked.');
            alert('Wake Lock API not supported. The timer may not function properly if the screen is locked.');
        }
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

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock was released');
        });
        console.log('Wake Lock is active');
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

function sendNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Timer finished', {
            body: 'Your meditation timer has ended.',
            icon: 'favicon-32x32.png'
        });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Timer finished', {
                    body: 'Your meditation timer has ended.',
                    icon: 'favicon-32x32.png'
                });
            }
        });
    }
}

// Initialize timer buttons
document.querySelectorAll('.timeButton').forEach(button => {
    button.addEventListener('click', function () {
        timer = parseInt(this.getAttribute('data-time'));
        updateDisplay();
    });
});