import Scene from "./Scene";
import { InputDriver } from "./UserInput";

export default class App {
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;

    public inputDriver: InputDriver;
    public setup: () => void = () => {};
    public loop: () => void = () => {};
    public clear: boolean = true;
    
    private _lastFrameTimestamp: number = Date.now();
    private _width!: number;
    private _height!: number;
    private _scene?: string;
    private _scenes: Map<string, Scene>;

    constructor(width: number, height: number) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d")!;

        this._scenes = new Map();
        this.inputDriver = new InputDriver(this);

        this.width = width;
        this.height = height;

        document.body.appendChild(this.canvas);

        this._setup();
    }

    public addScene(scene: Scene) {
        this._scenes.set(scene.name, scene);
    }

    public enableScene(name: string) {
        this._scenes.get(name)?.setup();
        this._scene = name;
    }
    
    private _setup() {
        this.setup.apply(this);
        this.raf();
    }

    private raf() {
        window.requestAnimationFrame(this.raf.bind(this));
        this.inputDriver.step();
        this.loop.apply(this);
        
        if (this.clear)
            this.ctx.clearRect(0, 0, this._width, this._height);
        
        this._scenes.get(this._scene || "")?.loop();
        this._lastFrameTimestamp = Date.now();
    }

    get currentScene(): Scene {
        return this._scenes.get(this._scene || "")!;
    }

    get width() {
        return this._width;
    }

    set width(width: number) {
        this._width = width;
        this.canvas.width = width;
    }

    get height() {
        return this._height;
    }

    set height(height: number) {
        this._height = height;
        this.canvas.height = height;
    }

    get deltaTime(): number {
        return 1 / (Date.now() - this._lastFrameTimestamp);
    }
}