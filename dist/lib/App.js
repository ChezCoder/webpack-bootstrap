"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Network_1 = __importDefault(require("./Network"));
const UserInput_1 = require("./UserInput");
const Util_1 = require("./Util");
class App {
    constructor(width, height) {
        this.setup = () => { };
        this.loop = () => { };
        this.clear = true;
        this.storage = new Map();
        this.cameraOffset = new Util_1.Vector2(0, 0);
        this.zoom = 1;
        this.targetFramerate = 60;
        this._lastFrameTimestamp = Date.now();
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this._scenes = new Map();
        this.network = new Network_1.default();
        this.input = new UserInput_1.InputDriver(this);
        this.width = width;
        this.height = height;
        document.body.appendChild(this.canvas);
        this._setup();
    }
    getVisualPosition(position) {
        const result = position.clone();
        result.add(this.cameraOffset);
        result.x *= this.zoom;
        result.y *= this.zoom;
        return result;
    }
    addScene(scene) {
        this._scenes.set(scene.name, scene);
    }
    enableScene(name) {
        const scene = this._scenes.get(name);
        if (scene) {
            if (scene.persistResources)
                scene.resource.clear();
            this._scene = name;
            scene.setup();
        }
        else {
            throw new ReferenceError("No registered scene with that name");
        }
    }
    _setup() {
        this.setup.apply(this);
        this.raf();
    }
    raf() {
        window.requestAnimationFrame(this.raf.bind(this));
        this.input.step();
        this.loop.apply(this);
        if (this.clear) {
            this.ctx.clearRect(0, 0, this._width, this._height);
            this.cursor = "default";
        }
        const scene = this._scenes.get(this._scene || "");
        if (scene) {
            scene.renderables.forEach(renderable => {
                renderable.draw();
            });
            scene.loop();
        }
        this._lastFrameTimestamp = Date.now();
    }
    get currentScene() {
        return this._scenes.get(this._scene || "");
    }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
        this.canvas.width = width;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
        this.canvas.height = height;
    }
    get center() {
        return new Util_1.Vector2(this.width / 2, this.height / 2);
    }
    get deltaTime() {
        return (Date.now() - this._lastFrameTimestamp) / (1000 / this.targetFramerate);
    }
    set cursor(cursor) {
        if (cursor instanceof URL) {
            this.canvas.style.cursor = `url("${cursor.href}")`;
        }
        else {
            this.canvas.style.cursor = cursor;
        }
    }
    get cursor() {
        return this.canvas.style.cursor;
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map