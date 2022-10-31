"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePacket = exports.Network = exports.MimeTypes = void 0;
class WSNetworkDriver {
    constructor(url) {
        this.onOpen = () => { };
        this.onMessage = () => { };
        this.onClose = () => { };
        this.onError = error => { throw error; };
        this._connected = false;
        this._registeredEvents = {};
        if (url) {
            this.url = url instanceof URL ? url.href : url;
            if (!(this.url.startsWith("ws:") || this.url.startsWith("wss:")))
                throw new TypeError(`Invalid protocol ${this.url.split(":")[0]} for websocket`);
        }
    }
    connect() {
        if (this.connected)
            return this.onError(new SyntaxError("WebSocket is already connected"));
        if (!this.url)
            return this.onError(new TypeError("URL is not set"));
        try {
            this._websocket = new WebSocket(this.url);
        }
        catch (error) {
            return this.onError(error);
        }
        this._websocket.onopen = () => {
            this._connected = true;
            this.onOpen();
        };
        this._websocket.onmessage = data => {
            try {
                const packet = JSON.parse(data.data);
                if (this.eventPacketProperty) {
                    const event = packet[this.eventPacketProperty];
                    if (event) {
                        const callbacks = this._registeredEvents[event];
                        if (callbacks) {
                            for (const callback of callbacks) {
                                callback === null || callback === void 0 ? void 0 : callback.bind(this._websocket)(packet);
                            }
                        }
                    }
                }
            }
            catch (error) {
                if (!(error instanceof SyntaxError)) {
                    throw error;
                }
            }
            this.onMessage(data.data);
        };
        this._websocket.onclose = code => {
            this._connected = false;
            this.onClose(code.code);
        };
        this._websocket.onerror = this.onError;
    }
    on(event, cb) {
        if (!this.eventPacketProperty)
            throw new SyntaxError("Set the eventPacketProperty before using this");
        this._registeredEvents[event] = this._registeredEvents[event] || [];
        this._registeredEvents[event].push(cb);
    }
    removeListeners(event, indices = []) {
        if (indices.length == 0) {
            this._registeredEvents[event] = [];
        }
        else {
            for (let index of indices) {
                this._registeredEvents[event][index] = null;
            }
        }
    }
    clearListeners() {
        this._registeredEvents = {};
    }
    send(packet) {
        var _a, _b;
        if (packet instanceof BasePacket) {
            (_a = this.websocket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(packet.value()));
        }
        else {
            (_b = this.websocket) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify(packet));
        }
    }
    get websocket() {
        return this._websocket;
    }
    get connected() {
        return this._connected;
    }
}
exports.default = WSNetworkDriver;
var MimeTypes;
(function (MimeTypes) {
    MimeTypes.AUDIO = {
        MIDI: "audio/midi",
        XMIDI: "audio/x-midi",
        MP3: "audio/mpeg",
        OGG: "audio/ogg",
        OGA: "audio/ogg",
        OPUS: "audio/opus",
        WAV: "audio/wav",
        WEBM: "audio/webm",
        WEBA: "audio/webm"
    };
    MimeTypes.VIDEO = {
        MP4: "video/mp4",
        MPEG: "video/mpeg",
        OGG: "video/ogg",
        OGV: "video/ogg",
        WEBM: "audio/webm",
        WEBV: "audio/webm"
    };
    MimeTypes.IMAGE = {
        BMP: "image/bmp",
        GIF: "image/gif",
        ICO: "image/vnd.microsoft.icon",
        JPE: "image/jpeg",
        JPEG: "image/jpeg",
        PNG: "image/png",
        SVG: "image/svg+xml",
        TIFF: "image/tiff",
        WEBM: "image/webp",
        WEBP: "image/webp",
        PDF: "application/pdf"
    };
    MimeTypes.APPLICATION = {
        BIN: "application/octet-stream",
        CSS: "text/css",
        CSV: "text/csv",
        DOC: "application/msword",
        DOX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        GZ: "application/gzip",
        HTML: "text/html",
        JAR: "application/java-archive",
        JS: "text/javascript",
        JSON: "application/json",
        JSONLD: "application/ld+json",
        MJS: "text/javascript",
        MPKG: "application/vnd.apple.installer+xml",
        OGG: "application/ogg",
        OGX: "application/ogg",
        PDF: "application/pdf",
        PHP: "application/x-httpd-php",
        PPT: "application/vnd.ms-powerpoint",
        PPTX: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        RAR: "application/vnd.rar",
        RTF: "application/rtf",
        SH: "application/x-sh",
        SWF: "application/x-shockwave-flash",
        TAR: "application/x-tar",
        XHTML: "application/xhtml+xml",
        XLS: "application/vnd.ms-excel",
        XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        XML: "application/xml",
        ZIP: "application/zip",
        "7Z": "application/x-7z-compressed"
    };
    MimeTypes.TEXT = {
        PLAIN: "text/plain",
        CSS: "text/css",
        CSV: "text/csv",
        HTML: "text/html",
        JS: "text/javascript",
        JSON: "application/json",
        MJS: "text/javascript",
        TXT: "text/plain"
    };
})(MimeTypes = exports.MimeTypes || (exports.MimeTypes = {}));
var Network;
(function (Network) {
    function request(options, cb) {
        options.body = options.body || null;
        options.headers = options.headers || {
            "Content-Type": MimeTypes.APPLICATION.JSON,
            "Origin": location.href,
            "Host": location.host
        };
        options.url = options.url instanceof URL ? options.url.href : options.url;
        options.cache = options.cache || "default";
        return new Promise((resolve, reject) => {
            window.fetch(options.url instanceof URL ? options.url.href : options.url, {
                "method": options.method,
                "body": options.body,
                "headers": options.headers,
                "cache": options.cache
            }).then(response => {
                if ((response.status >= 200) && (response.status <= 299)) {
                    response.text().then(data => {
                        if (cb) {
                            return cb(null, data, response);
                        }
                        resolve({ data, response });
                    });
                }
                else {
                    if (cb) {
                        return cb(response);
                    }
                    reject({ response, error: true });
                }
            });
        });
    }
    Network.request = request;
})(Network = exports.Network || (exports.Network = {}));
class BasePacket {
    value() {
        return {};
    }
}
exports.BasePacket = BasePacket;
//# sourceMappingURL=Network.js.map