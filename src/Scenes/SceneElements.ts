import Scene, { Renderable, DrawOptions } from "../lib/Scene";
import { Angle, Color, Random, Utils } from "../lib/Util";

export namespace SceneElements {
    export class Square1 extends Renderable {
        public rotation: number;
        public dims: number;
        public increment: number;
        public color: string;
    
        constructor(scene: Scene, increment: number, dimentions: number, color: string) {
            super(scene);
    
            this.rotation = Random.random(0, 180);
            this.increment = increment;
            this.dims = dimentions;
            this.color = color;
        }
    
        public value(): DrawOptions {
            this.rotation += this.increment * this.scene.app.deltaTime;
            this.rotation = Utils.wrapClamp(this.rotation, 0, 360);
    
            return {
                "fillStyle": new Color.Hex(this.color).toRGB().toHex().toString(),
                "origin": this.scene.app.center,
                "rotation": Angle.toRadians(this.rotation),
                "draw": ctx => {
                    ctx.fillRect(-this.dims * this.scene.app.zoom / 2, -this.dims * this.scene.app.zoom / 2, this.dims * this.scene.app.zoom, this.dims * this.scene.app.zoom);
                }
            };
        }
    }

    export class Square2 extends Renderable {
        public rotation: number;
        public dims: number;
        public increment: number;
        public color: string;
    
        constructor(scene: Scene, increment: number, dimentions: number, color: string) {
            super(scene);
    
            this.rotation = Random.random(0, 180);
            this.increment = increment;
            this.dims = dimentions;
            this.color = color;
        }
    
        public value(): DrawOptions {
            this.rotation += this.increment * this.scene.app.deltaTime;
            this.rotation = Utils.wrapClamp(this.rotation, 0, 360);
    
            return {
                "fillStyle": new Color.Hex(this.color).toRGB().toHex().toString(),
                "origin": this.scene.app.center,
                "rotation": Angle.toRadians(this.rotation),
                "draw": ctx => {
                    ctx.fillRect(-this.dims * this.scene.app.zoom / 2, -this.dims * this.scene.app.zoom / 2, this.dims * this.scene.app.zoom, this.dims * this.scene.app.zoom);
                }
            };
        }
    }
}