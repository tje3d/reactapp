import * as RX from 'rxjs';
import WebSocketManager from 'WebSocketManager';

let subject = new RX.Subject;

WebSocketManager.addEventListener('open'    , () => subject.next(true)  );
WebSocketManager.addEventListener('message' , () => subject.next(true) );
WebSocketManager.addEventListener('close'   , () => subject.next(false) );
WebSocketManager.addEventListener('error'   , () => subject.next(false) );

export default subject;
export { WebSocketManager };