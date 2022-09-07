import App from "./App";
import { ResourceManager } from "./Resource";

export default abstract class Scene {
    readonly app: App;
    readonly ctx: CanvasRenderingContext2D;
    readonly name: string;
    readonly resource: ResourceManager;
    readonly persistResources: boolean;

    constructor(app: App, name: string, persistResources: boolean = true) {
        this.app = app;
        this.name = name;
        this.ctx = app.ctx;
        this.resource = new ResourceManager();
        this.persistResources = persistResources;
    }

    public setup() {}

    public loop() {}
}