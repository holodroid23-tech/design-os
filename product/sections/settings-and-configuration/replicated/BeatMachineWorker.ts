let timerId: number | null = null;
let interval = 25;

self.onmessage = (e: MessageEvent) => {
    if (e.data === 'start') {
        if (timerId) clearInterval(timerId);
        timerId = self.setInterval(() => {
            self.postMessage('tick');
        }, interval) as unknown as number;
    } else if (e.data.interval) {
        interval = e.data.interval;
        if (timerId) {
            clearInterval(timerId);
            timerId = self.setInterval(() => {
                self.postMessage('tick');
            }, interval) as unknown as number;
        }
    } else if (e.data === 'stop') {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    }
};
