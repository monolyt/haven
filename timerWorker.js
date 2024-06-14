let timer;
let interval;

self.addEventListener('message', function(e) {
    if (e.data.command === 'start') {
        timer = e.data.time;
        interval = setInterval(() => {
            timer--;
            self.postMessage({ time: timer });
            if (timer <= 0) {
                clearInterval(interval);
                self.postMessage({ done: true });
            }
        }, 1000);
    } else if (e.data.command === 'stop') {
        clearInterval(interval);
    } else if (e.data.command === 'set') {
        timer = e.data.time;
    }
});
