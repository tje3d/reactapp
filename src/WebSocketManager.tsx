import * as RX from 'rxjs';

interface WebsocketEvents {
    open    : Array<void>;
    close   : Array<void>;
    message : Array<void>;
    error   : Array<void>;
}

class WebSocketManager
 {
    protected debug: boolean           = false;
    protected connectionTimer: any     = null;
    protected laters: Array<string>    = [];
    public socket: WebSocket | null    = null;
    public isConnected: boolean        = false;
    public listeners: WebsocketEvents  = {
        open    : [],
        close   : [],
        message : [],
        error   : [],
    };

    constructor() {
        this.addDefaultListeners();
        this.createConnection();
    }

    send(data) {
        if (this.isClosed() || this.isConnecting() || this.socket == null) {
            this._logWarn('Collected for later');
            this.laters.push(data);
            return;
        }
        
        this.socket.send(data);

        this._log(`Data Sent: ${data}`);
    }

    isConnecting() {
        if (!this.socket || this.socket == null) {
            return false;
        }

        return this.socket.readyState === this.socket.CONNECTING;
    }

    isClosed() {
        if (!this.socket || this.socket == null) {
            return false;
        }

        return this.socket.readyState === this.socket.CLOSED;
    }

    createConnection() {
        this._log('Creating New Connection');

        this.socket = null;
        this.socket = new WebSocket('ws://localhost:8080');
        this.attachListeners();
        return this;
    }

    addDefaultListeners() {
        this.addEventListener( 'open'    , this._onOpen    );
        this.addEventListener( 'close'   , this._onClose   );
        this.addEventListener( 'error'   , this._onError   );
        this.addEventListener( 'message' , this._onMessage );
    }

    addEventListener(type: string, func: Function) {
        this.listeners[type].push(func);

        if (this.socket == null) {
            return;
        }

        this.socket.addEventListener(type, func.bind(this));
    }

    attachListeners() {
        Object.keys(this.listeners).forEach(type => {
            this.listeners[type].forEach(func => {
                if (this.isClosed() || this.socket == null) {
                    return;
                }

                this.socket.addEventListener(type, func.bind(this));
            })
        });
    }

    _sendLaters() {
        this.laters.forEach(data => {
            this.send(data);
        })

        this.laters = [];
    }

    _log(data) {
        if (!this.debug) {
            return;
        }

        console.log('## Websocket', data);
    }

    _logWarn(data) {
        if (!this.debug) {
            return;
        }

        console.warn('## Websocket', data);
    }

    _onOpen() {
        this._log('On Connection Open');
        this._sendLaters();
    }

    _onClose() {
        this._log('On Connection Close');

        if (this.connectionTimer !== null) {
            clearTimeout(this.connectionTimer);
            this.connectionTimer = null;
        }

        this.connectionTimer = setTimeout(()=>{
            this.createConnection();
        }, 3000);
    }

    _onError() {
        this._log('On Connection Error');
    }

    _onMessage(evt) {
        this._log(`Connection Message: ${evt.data}`);
    }
}

export default new WebSocketManager;