import { App } from "../lib/App";
import GameObject from "../lib/GameObject";
import { Dimension2, Vector2 } from "../lib/Util";
import BaseRenderer, { Alignment, RendererAlignment } from "./BaseRenderer";

export default class EllipsesRenderer extends BaseRenderer {
    public radiusX: number;
    public radiusY: number;
    public degrees: number;
    public alignment: RendererAlignment = RendererAlignment.CENTER;

    constructor(parent: GameObject, radiusX: number, radiusY: number, degrees: number = Math.PI * 2) {
        super(parent, "rect renderer");
        this.radiusX = radiusX;
        this.radiusY = radiusY;
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
                ctx.ellipse(pos.x, pos.y, this.radiusX, this.radiusY, 0, 0, this.degrees);
            }
        });
    }

    public get boundingBox(): Dimension2 {
        return {
            "width": this.radiusX * 2,
            "height": this.radiusY * 2
        }
    }
}