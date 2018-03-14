import * as RX from 'rxjs';
import WebSocketManager from 'WebSocketManager';

let subject = new RX.Subject;

WebSocketManager.addEventListener('open', () => {
    subject.next(true);
    WebSocketManager.send(Date.now());
});

WebSocketManager.addEventListener('close', () => {
    subject.next(false);
});

WebSocketManager.addEventListener('message', evt => {
    let data = evt.data;
});

export default subject;
export { WebSocketManager };