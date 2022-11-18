import { App } from "../lib/App";
import GameObject from "../lib/GameObject";
import { Dimension2 } from "../lib/Util";
import BaseRenderer, { Alignment, RendererAlignment } from "./BaseRenderer";

export default class SquareRenderer extends BaseRenderer {
    public size: number;

    constructor(parent: GameObject, size: number) {
        super(parent, "square renderer");
        this.size = size;
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
                const pos = Alignment.offsetFromAlignment(this.alignment, this.boundingBox.width, this.boundingBox.height, RendererAlignment.TOP_LEFT);
                ctx.rect(pos.x, pos.y, this.size, this.size);
            }
        });
    }

    public get boundingBox(): Dimension2 {
        return {
            "width": this.size,
            "height": this.size
        }
    }
}