// sw.js
const CACHE_NAME = 'haven-meditation-timer-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/animation/animation.css',
    '/assets/animation/cat-base.svg',
    '/assets/animation/cat-blink1.svg',
    '/assets/animation/cat-blink2.svg',
    '/assets/animation/cat-blink3-closed.svg',
    '/assets/animation/cat-eyesleft1.svg',
    '/assets/animation/cat-eyesleft2.svg',
    '/assets/animation/cat-eyesleft3.svg',
    '/assets/animation/cat-eyesleft4.svg',
    '/assets/animation/cat-eyesleft5.svg',
    '/assets/animation/moon.svg',
    '/assets/animation/sun.svg',
    '/assets/css/normalize.css',
    '/assets/css/styles.css',
    '/assets/js/timer.js',
    '/assets/js/theme.js',
    '/assets/js/sidebar.js',
    '/assets/audio/singingbowl.mp3',
    '/assets/fonts/HedvigLettersSerif18pt-Regular.woff2',
    '/apple-touch-icon.png',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
    '/manifest.json'
];

self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>{return cache.addAll(urlsToCache)}))});self.addEventListener('fetch',event=>{event.respondWith(caches.match(event.request).then(response=>{if(response){return response}return fetch(event.request)}))});self.addEventListener('activate',event=>{const cacheWhitelist=[CACHE_NAME];event.waitUntil(caches.keys().then(cacheNames=>{return Promise.all(cacheNames.map(cacheName=>{if(cacheWhitelist.indexOf(cacheName)===-1){return caches.delete(cacheName)}}))}))});