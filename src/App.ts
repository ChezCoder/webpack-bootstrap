import WSNetworkDriver from "./Network";
import Scene from "./Scene";
import { InputDriver } from "./UserInput";
import { Vector2 } from "./Util";

export interface DrawOptions {
    draw: (ctx: CanvasRenderingContext2D) => void
    origin?: Vector2
    strokeStyle?: string
    fillStyle?: string
    lineWidth?: number
    alpha?: number
    rotation?: number
}

export default class App {
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;

    public socket: WSNetworkDriver;
    public inputDriver: InputDriver;
    public setup: () => void = () => {};
    public loop: () => void = () => {};
    public clear: boolean = true;
    
    public cameraOffset: Vector2 = new Vector2(0, 0);
    public zoom: number = 1;
    public targetFramerate: number = 60;
    
    private _lastFrameTimestamp: number = Date.now();
    private _width!: number;
    private _height!: number;
    private _scene?: string;
    private _scenes: Map<string, Scene>;

    constructor(width: number, height: number) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d")!;

        this._scenes = new Map();
        this.socket = new WSNetworkDriver();
        this.inputDriver = new InputDriver(this);

        this.width = width;
        this.height = height;

        document.body.appendChild(this.canvas);

        this._setup();
    }

    public draw(options: DrawOptions): void {
        this.ctx.save();
        this.ctx.beginPath();

        if (options.origin) {
            const offset = this.getVisualPosition(options.origin);
            this.ctx.translate(offset.x, offset.y);
        }
        
        this.ctx.strokeStyle = options.strokeStyle || "#000000";
        this.ctx.fillStyle = options.fillStyle || "#000000";
        this.ctx.globalAlpha = options.alpha || 1;
        this.ctx.lineWidth = options.lineWidth || 1;

        if (options.rotation) this.ctx.rotate(options.rotation);

        options.draw(this.ctx);

        if (options.strokeStyle) this.ctx.stroke();
        if (options.fillStyle) this.ctx.fill();

        this.ctx.closePath();
        this.ctx.restore();
    }

    public getVisualPosition(position: Vector2): Vector2 {
        const result = position.clone();
        result.add(this.cameraOffset);
        result.x *= this.zoom;
        result.y *= this.zoom;
        return result;
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

    get center(): Vector2 {
        return new Vector2(this.width / 2, this.height / 2);
    }

    get deltaTime(): number {
        return (Date.now() - this._lastFrameTimestamp) / (1000 / this.targetFramerate);
    }
}