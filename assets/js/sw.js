// sw.js
const CACHE_NAME = 'haven-meditation-timer-cache-v1';
const urlsToCache = [
    '/haven/', // ONLY IN GITHUB PAGES DEVELOPMENT REPLACE WITH `/` otherwise - remove everywhere then!
    '/haven/index.html',
    '/haven/assets/css/normalize.css',
    '/haven/assets/css/styles.css',
    '/haven/assets/js/timer.js',
    '/haven/assets/js/theme.js',
    '/haven/assets/js/sidebar.js',
    '/haven/assets/audio/singingbowl.mp3',
    '/haven/apple-touch-icon.png',
    '/haven/favicon-32x32.png',
    '/haven/favicon-16x16.png',
    '/haven/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
