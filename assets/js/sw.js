self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('static-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/normalize.css',
                '/timer.js',
                '/theme.js',
                '/singingbowl.mp3',
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('sync', event => {
    if (event.tag === 'start-timer') {
        event.waitUntil(startTimerInBackground());
    } else if (event.tag === 'stop-timer') {
        event.waitUntil(stopTimerInBackground());
    }
});

let timer = 600;
let countdown;
let isRunning = false;

async function startTimerInBackground() {
    if (isRunning) return;
    isRunning = true;
    countdown = setInterval(() => {
        timer--;
        if (timer <= 0) {
            clearInterval(countdown);
            self.registration.showNotification('Timer Ended', {
                body: 'Your meditation session is over.',
                icon: 'icon-192x192.png',
                vibrate: [200, 100, 200],
                tag: 'meditation-timer-end'
            });
            playSound();
            self.clients.matchAll().then(clients => {
                clients.forEach(client => client.postMessage({ type: 'TIMER_END' }));
            });
            isRunning = false;
        }
    }, 1000);
}

async function stopTimerInBackground() {
    clearInterval(countdown);
    isRunning = false;
}

function playSound() {
    self.registration.active.postMessage({ type: 'PLAY_SOUND' });
}

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
