"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resource_1 = require("../lib/Resource");
const Scene_1 = __importDefault(require("../lib/Scene"));
const Util_1 = require("../lib/Util");
const Square2_1 = require("../SceneObjects/Square2");
class default_1 extends Scene_1.default {
    constructor() {
        super(...arguments);
        this.circleRotation = Util_1.Random.random(0, 180);
    }
    setup() {
        this.resource.save("webpack", new Resource_1.ImageResource("./assets/images/javascript.png"));
        this.addRenderable(new Square2_1.Square2(this, -Util_1.Random.random(0, 200) / 100, 210, Util_1.Color.Enum.DIM_GRAY));
        this.addRenderable(new Square2_1.Square2(this, Util_1.Random.random(0, 200) / 100, 200, Util_1.Color.Enum.GRAY));
    }
    loop() {
        this.draw({
            "draw": ctx => {
                const image = this.resource.get("webpack");
                if (image.loaded) {
                    if (image.data) {
                        ctx.drawImage(image.data, 0, 0);
                    }
                    else {
                        console.log("Not loaded");
                    }
                }
                else {
                    console.log("Not loaded");
                }
            }
        });
        this.circleRotation += 0.3 * this.app.deltaTime;
        this.circleRotation = Util_1.Utils.wrapClamp(this.circleRotation, 0, 360);
        this.draw({
            "fillStyle": new Util_1.Color.Hex(0x0000ff).toString(),
            "origin": this.app.center,
            "rotation": Util_1.Angle.toRadians(this.circleRotation),
            "draw": ctx => {
                ctx.arc(-150 * this.app.zoom, 0, 20 * this.app.zoom, 0, Math.PI * 2);
            },
            "alpha": 0.3
        });
        Util_1.TextHelper.writeCenteredTextAt(this, "Demo Scene 2!", {
            "fillStyle": new Util_1.Color.Hex("#ffffff").toString(),
            "origin": this.app.center,
            "alpha": 0.6,
            "lineWidth": 3,
            "strokeStyle": "black",
            "rotation": Util_1.Angle.toRadians(20)
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=demo2.js.map