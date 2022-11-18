import { App } from "../lib/App";
import GameObject from "../lib/GameObject";
import { Dimension2, Vector2 } from "../lib/Util";
import BaseRenderer, { Alignment, RendererAlignment } from "./BaseRenderer";

export default class CircleRenderer extends BaseRenderer {
    public radius: number;
    public degrees: number;
    public alignment: RendererAlignment = RendererAlignment.CENTER;

    constructor(parent: GameObject, radius: number, degrees: number = Math.PI * 2) {
        super(parent, "rect renderer");
        this.radius = radius;
        this.degrees = degrees;
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
                const pos = Vector2.dot(Alignment.offsetFromAlignment(this.alignment, this.boundingBox.width, this.boundingBox.height, RendererAlignment.CENTER), this.parent.transform.scale);
                ctx.arc(pos.x, pos.y, this.radius, 0, this.degrees);
            }
        });
    }

    public get boundingBox(): Dimension2 {
        return {
            "width": this.radius * 2,
            "height": this.radius * 2
        }
    }
}