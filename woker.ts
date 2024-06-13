import {createTripByKey} from './tripgen'
declare var self: Worker;
function generateRandomCharacter(): string {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}
self.onmessage = function(event) {
    if (event.data === 'start') {
        while (true) {
            const trip = createTripByKey(generateRandomCharacter());
            if (trip.includes("taisan11")) {
                // メインスレッドに結果を送信
                self.postMessage({ trip });
                break; // ループを終了してこのWorkerを停止
            }
        }
    }
};