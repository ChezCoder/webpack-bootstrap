import App from "./App";

export default abstract class Scene {
    readonly app: App;
    readonly ctx: CanvasRenderingContext2D;
    readonly name: string;

    constructor(app: App, name: string) {
        this.app = app;
        this.name = name;
        this.ctx = app.ctx;
    }

    public setup() {}

    public loop() {}
}