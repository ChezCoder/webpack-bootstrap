import GameObject from "./GameObject";
import NetworkWebSocket from "./Network";
import { ResourceManager } from "./Resource";
import Scene from "./Scene";
import { Input } from "./UserInput";
import { Vector2 } from "./Util";

export interface DrawOptions {
    draw: (ctx: CanvasRenderingContext2D) => void
    origin?: Vector2
    strokeStyle?: string | CanvasGradient | CanvasPattern
    fillStyle?: string | CanvasGradient | CanvasPattern
    lineWidth?: number
    alpha?: number
    rotation?: number
    scale?: Vector2
}

export enum Cursor {
    ALIAS = "alias",
    ALL_SCROLL = "all-scroll",
    AUTO = "auto",
    CELL = "cell",
    COL_RESIZE = "col-resize",
    CONTEXT_MENU = "context-menu",
    COPY = "copy",
    CROSSHAIR = "crosshair",
    DEFAULT = "default",
    E_RESIZE = "e-resize",
    EW_RESIZE = "ew-resize",
    GRAB = "grab",
    GRABBING = "grabbing",
    HELP = "help",
    MOVE = "move",
    N_RESIZE = "n-resize",
    NE_RESIZE = "ne-resize",
    NESW_RESIZE = "nesw-resize",
    NS_RESIZE = "ns-resize",
    NW_RESIZE = "nw-resize",
    NWSE_RESIZE = "nwse-resize",
    NO_DROP = "no-drop",
    NONE = "none",
    NOT_ALLOWED = "not-allowed",
    POINTER = "pointer",
    PROGRESS = "progress",
    ROW_RESIZE = "row-resize",
    S_RESIZE = "s-resize",
    SE_RESIZE = "se-resize",
    SW_RESIZE = "sw-resize",
    TEXT = "text",
    W_RESIZE = "w-resize",
    WAIT = "wait",
    ZOOM_IN = "zoom-in",
    ZOOM_OUT = "zoom-out"
}

// TODO change program flow
/**
 * TODO
 * Scenes are now renderable objects
 * You push any renderable objects to the global app class
 * These get rendered,
 * Scenes may only be pushed to the global app class
 * Scenes may not be pushed to scenes
 * Scenes may be enabled or disabled, repositioned, etc
 * Renderable objects may be pushed to scenes
 */

export namespace App {
    export const canvas: HTMLCanvasElement = document.createElement("canvas");
    export const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

    export const network: NetworkWebSocket = new NetworkWebSocket();
    export const input: Input = new Input();
    export const storage: Map<String, any> = new Map();
    export const resource: ResourceManager = new ResourceManager();
    export const clear: boolean = true;
    export const scenes: Scene[] = [];

    /**
     * @deprecated
     */
    export let cameraOffset: Vector2;
    /**
     * @deprecated
     */
    export let zoom: number = 1;
    export let targetFramerate: number = 60;

    export let loop: () => void = () => {};
    
    let _lastFrameTimestamp: number = Date.now();
    let _width: number = window.innerWidth;
    let _height: number = window.innerHeight;
    /**
     * @deprecated
     */
    let _scene: string;

    let _initialized: boolean = false;

    export function init() {
        if (!_initialized) {
            _initialized = true;
            document.body.appendChild(canvas);
            
            canvas.width = _width;
            canvas.height = _height;

            // TODO remove this once completely removed
            cameraOffset = new Vector2(0, 0);
            
            raf();
        }
    }

    /**
     * TODO
     * @deprecated
     * Use Scene#getVisualPosition instead
     */    
    export function getVisualPosition(position: Vector2): Vector2 {
        const result = position.clone();
        result.add(cameraOffset);
        result.x *= zoom;
        result.y *= zoom;
        return result;
    }

    export function broadcast<D = string>(data: D) {
        scenes.forEach(s => {
            s.onmessage(data);
            s.broadcastToChildren(data);
        });
    }

    export function draw(object: DrawOptions): void {
        ctx.save();
        ctx.beginPath();

        if (object.origin) {
            const offset = object.origin;
            ctx.translate(offset.x, offset.y);
        }

        ctx.strokeStyle = object.strokeStyle || "#000000";
        ctx.fillStyle = object.fillStyle || "#000000";
        ctx.globalAlpha = object.alpha === 0 ? 0 : object.alpha || 1;
        ctx.lineWidth = object.lineWidth === 0 ? 0 : object.lineWidth || 1;

        if (object.rotation)
            ctx.rotate(object.rotation);
        
        if (object.scale)
            ctx.scale(object.scale.x, object.scale.y)

        object.draw(ctx);

        if (object.strokeStyle)
            ctx.stroke();
        
        if (object.fillStyle)
            ctx.fill();

        ctx.closePath();
        ctx.restore();
    }

    export function addScene(scene: Scene) {
        scene.setup();
        scenes.push(scene);
    }

    /**
     * @deprecated
     * Use Scene#enabled instead
     */
    export function enableScene(name: string) {
        const scene = scenes.find(s => s.name == name);
        if (scene) {
            _scene = name;
            scene.setup();
        } else {
            throw new ReferenceError("No registered scene with that name");
        }
    }

    function raf() {
        window.requestAnimationFrame(raf);
        
        if (clear) {
            ctx.clearRect(0, 0, _width, _height);
            setCursor("default");
        }
        
        input.step();
        loop();
        
        const loopChildren = (gameObject: GameObject) => {
            if (gameObject.enabled) {
                gameObject.loop();
                gameObject.render();
                gameObject.transform.loop();
                gameObject.components.forEach(c => c.enabled ? c.loop() : null);
                gameObject.children.forEach(g => {
                    g.parent = gameObject;
                    loopChildren(g);
                });
            }
        }

        scenes.forEach(loopChildren);

        _lastFrameTimestamp = Date.now();
    }

    /**
     * TODO
     * @deprecated
     */
    export function getCurrentScene(): Scene {
        return scenes.find(s => s.name == (_scene || ""))!;
    }

    export function getWidth() {
        return _width;
    }

    export function setWidth(width: number) {
        _width = width;
        canvas.width = width;
    }

    export function getHeight() {
        return _height;
    }

    export function setHeight(height: number) {
        _height = height;
        canvas.height = height;
    }

    export function center(): Vector2 {
        return new Vector2(_width / 2, _height / 2);
    }

    export function deltaTime(): number {
        return (Date.now() - _lastFrameTimestamp) / (1000 / targetFramerate);
    }

    /**
     * TODO
     * @deprecate
     * Use Scene#cursor instead
     */
    export function setCursor(cursor: Cursor | string | URL) {
        if (cursor instanceof URL) {
            canvas.style.cursor = `url("${cursor.href}")`;
        } else {
            canvas.style.cursor = cursor;
        }
    }

    /**
     * TODO
     * @deprecate
     * Use Scene#cursor instead
     */
    export function getCursor(): Cursor | string | URL {
        return canvas.style.cursor as string | URL;
    }
}