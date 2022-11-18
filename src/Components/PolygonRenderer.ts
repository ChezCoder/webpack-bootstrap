import { App } from "../lib/App";
import GameObject from "../lib/GameObject";
import { Dimension2, Vector2 } from "../lib/Util";
import BaseRenderer, { Alignment, RendererAlignment } from "./BaseRenderer";

export default class PolygonRenderer extends BaseRenderer {
    public points: Vector2[] = [];
    public alignment: RendererAlignment = RendererAlignment.TOP_LEFT;

    constructor(parent: GameObject, points: Vector2[] = []) {
        super(parent, "polygon renderer");
        this.points = points;
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

                if (this.points.length > 0) {
                    ctx.moveTo(this.points[0].x + pos.x, this.points[0].y + pos.y);
    
                    for (let i = 1;i < this.points.length;i++) {
                        ctx.lineTo(this.points[i].x + pos.x, this.points[i].y + pos.y);
                    }
                }
            }
        });
    }

    public addPoints(...point: Vector2[]): this {
        this.points.push(...point);
        return this;
    }

    public get boundingBox(): Dimension2 {
        const [ pxs, pys ] = [ this.points.map(p => p.x), this.points.map(p => p.y) ];

        return {
            "width": Math.max(...pxs) - Math.min(...pxs),
            "height": Math.max(...pys) - Math.min(...pys)
        }
    }
}