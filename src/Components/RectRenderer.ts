import { App } from "../lib/App";
import GameObject from "../lib/GameObject";
import { Dimension2, Vector2 } from "../lib/Util";
import BaseRenderer, { Alignment, RendererAlignment } from "./BaseRenderer";

export default class RectRenderer extends BaseRenderer {
    public width: number;
    public height: number;

    constructor(parent: GameObject, width: number, height: number) {
        super(parent, "rect renderer");
        this.width = width;
        this.height = height;
    }

    public loop(): void {
        App.draw({
            "origin": this.parent.transform.renderPosition,
            "alpha": this.alpha,
            "fillStyle": this.fillStyle,
            "strokeStyle": this.strokeStyle,
            "lineWidth": this.lineWidth,
            "rotation": this.parent.transform.rotation,
            "scale": this.parent.transform.scale,
            "draw": ctx => {
                const pos = Vector2.dot(Alignment.offsetFromAlignment(this.alignment, this.boundingBox.width, this.boundingBox.height, RendererAlignment.TOP_LEFT), this.parent.transform.scale);
                ctx.rect(pos.x, pos.y, this.width, this.height);
            }
        });
    }

    public get boundingBox(): Dimension2 {
        return {
            "width": this.width,
            "height": this.height
        }
    }
}