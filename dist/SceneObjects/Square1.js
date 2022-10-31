"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square1 = void 0;
const Scene_1 = require("../lib/Scene");
const Util_1 = require("../lib/Util");
class Square1 extends Scene_1.Renderable {
    constructor(scene, increment, dimentions, color) {
        super(scene);
        this.rotation = Util_1.Random.random(0, 180);
        this.increment = increment;
        this.dims = dimentions;
        this.color = color;
    }
    draw() {
        this.rotation += this.increment * this.scene.app.deltaTime;
        this.rotation = Util_1.Utils.wrapClamp(this.rotation, 0, 360);
        this.scene.draw({
            "fillStyle": new Util_1.Color.Hex(this.color).toRGB().toHex().toString(),
            "origin": this.scene.app.center,
            "rotation": Util_1.Angle.toRadians(this.rotation),
            "draw": ctx => {
                ctx.fillRect(-this.dims * this.scene.app.zoom / 2, -this.dims * this.scene.app.zoom / 2, this.dims * this.scene.app.zoom, this.dims * this.scene.app.zoom);
            }
        });
    }
}
exports.Square1 = Square1;
//# sourceMappingURL=Square1.js.map