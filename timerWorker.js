let timer;
let interval;
let audioContext;
let audioBuffer;

async function loadSound() {
    if (!audioContext) {
        audioContext = new (self.AudioContext || self.webkitAudioContext)();
    }

    const response = await fetch('singingbowl.mp3');
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

async function playSound() {
    if (audioContext && audioBuffer) {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    }
}

self.addEventListener('message', async function(e) {
    if (e.data.command === 'start') {
        await loadSound();
        timer = e.data.time;
        interval = setInterval(() => {
            timer--;
            self.postMessage({ time: timer });
            if (timer <= 0) {
                clearInterval(interval);
                self.postMessage({ done: true });
                playSound();
            }
        }, 1000);
    } else if (e.data.command === 'stop') {
        clearInterval(interval);
    } else if (e.data.command === 'set') {
        timer = e.data.time;
    }
});
