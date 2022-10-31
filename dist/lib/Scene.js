"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderable = void 0;
const Resource_1 = require("./Resource");
class Renderable {
    constructor(scene) {
        this.enabled = true;
        this.id = Renderable.id++;
        this.scene = scene;
    }
    draw() {
        this.scene.draw({
            "draw": () => { }
        });
    }
}
exports.Renderable = Renderable;
Renderable.id = 0;
class Scene {
    constructor(app, name, persistResources = true) {
        this.renderables = [];
        this.app = app;
        this.name = name;
        this.ctx = app.ctx;
        this.resource = new Resource_1.ResourceManager();
        this.persistResources = persistResources;
    }
    setup() { }
    loop() { }
    addRenderable(renderable) {
        this.renderables.push(renderable);
        return renderable.id;
    }
    draw(object) {
        if (object instanceof Renderable) {
            return object.draw();
        }
        this.ctx.save();
        this.ctx.beginPath();
        if (object.origin) {
            const offset = object.origin;
            this.ctx.translate(offset.x, offset.y);
        }
        this.ctx.strokeStyle = object.strokeStyle || "#000000";
        this.ctx.fillStyle = object.fillStyle || "#000000";
        this.ctx.globalAlpha = object.alpha === 0 ? 0 : object.alpha || 1;
        this.ctx.lineWidth = object.lineWidth === 0 ? 0 : object.lineWidth || 1;
        if (object.rotation)
            this.ctx.rotate(object.rotation);
        object.draw(this.ctx);
        if (object.strokeStyle)
            this.ctx.stroke();
        if (object.fillStyle)
            this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }
}
exports.default = Scene;
//# sourceMappingURL=Scene.js.map