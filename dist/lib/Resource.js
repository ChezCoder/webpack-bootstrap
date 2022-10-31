"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceManager = exports.VideoResource = exports.AudioResource = exports.ImageResource = exports.Resource = void 0;
class RawResource {
    constructor(source, data) {
        this._elementName = "";
        this._loaded = false;
        this.source = source instanceof URL ? source.href : source;
        if (data) {
            this._data = data;
            this._loaded = true;
        }
    }
    load() {
        return new Promise((res, rej) => {
            if (this.loaded)
                return res();
            this._data = document.createElement(this._elementName);
            this._data.onload = () => {
                this._loaded = true;
                res();
            };
            this._data.onerror = () => rej();
            this._data.onabort = () => rej();
            this._data.src = this.source;
        });
    }
    isVideo() { return false; }
    isAudio() { return false; }
    isImage() { return false; }
    get loaded() { return this._loaded; }
    get data() { return this._data; }
}
var Resource;
(function (Resource) {
    let Type;
    (function (Type) {
        Type[Type["VIDEO"] = 0] = "VIDEO";
        Type[Type["AUDIO"] = 1] = "AUDIO";
        Type[Type["IMAGE"] = 2] = "IMAGE";
    })(Type = Resource.Type || (Resource.Type = {}));
})(Resource = exports.Resource || (exports.Resource = {}));
class ImageResource extends RawResource {
    constructor() {
        super(...arguments);
        this._elementName = "img";
    }
    isImage() { return true; }
}
exports.ImageResource = ImageResource;
class AudioResource extends RawResource {
    constructor() {
        super(...arguments);
        this._elementName = "audio";
    }
    isAudio() { return true; }
}
exports.AudioResource = AudioResource;
class VideoResource extends RawResource {
    constructor() {
        super(...arguments);
        this._elementName = "video";
    }
    isVideo() { return true; }
}
exports.VideoResource = VideoResource;
class ResourceManager {
    constructor() {
        this._resourceMap = new Map();
    }
    overwrite(name, resource) {
        return new Promise(res => {
            if (!this._resourceMap.has(name)) {
                this._resourceMap.set(name, resource);
                if (!resource.loaded)
                    resource.load()
                        .then(() => res(true))
                        .catch(() => res(false));
                return;
            }
            return res(false);
        });
    }
    save(name, resource) {
        return new Promise(res => {
            if (!this._resourceMap.has(name)) {
                this._resourceMap.set(name, resource);
                if (!resource.loaded)
                    resource.load()
                        .then(() => res(true))
                        .catch(() => res(false));
                return;
            }
            return res(false);
        });
    }
    has(name) {
        return this._resourceMap.has(name);
    }
    get(name) {
        return this._resourceMap.get(name) || null;
    }
    clear() {
        this._resourceMap.clear();
    }
}
exports.ResourceManager = ResourceManager;
//# sourceMappingURL=Resource.js.map