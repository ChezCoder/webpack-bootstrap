import { App, DrawOptions } from "../lib/App";
import Component from "../lib/Component";
import { Dimension2, Vector2 } from "../lib/Util";

export enum RendererAlignment {
    TOP_LEFT,    TOP_CENTER,    TOP_RIGHT,
    CENTER_LEFT, CENTER,        CENTER_RIGHT,
    BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT
}

function alignmentOffset(alignment: RendererAlignment) {
    switch (alignment) {
        case RendererAlignment.TOP_LEFT:
            return new Vector2(0, 0);
        case RendererAlignment.TOP_CENTER:
            return new Vector2(0.5, 0);
        case RendererAlignment.TOP_RIGHT:
            return new Vector2(1, 0);
        case RendererAlignment.CENTER_LEFT:
            return new Vector2(0, 0.5);
        case RendererAlignment.CENTER:
            return new Vector2(0.5, 0.5);
        case RendererAlignment.CENTER_RIGHT:
            return new Vector2(1, 0.5);
        case RendererAlignment.BOTTOM_LEFT:
            return new Vector2(0, 1);
        case RendererAlignment.BOTTOM_CENTER:
            return new Vector2(0.5, 1);
        case RendererAlignment.BOTTOM_RIGHT:
            return new Vector2(1, 1);
    }
}

export namespace Alignment {
    export function offsetFromAlignment(alignment: RendererAlignment, width: number, height: number, fromAlignment: RendererAlignment = RendererAlignment.TOP_LEFT): Vector2 {
        let from: Vector2 = Vector2.dot(alignmentOffset(fromAlignment), new Vector2(width, height));
        let offset: Vector2 = Vector2.dot(alignmentOffset(alignment), new Vector2(width, height));
        return Vector2.difference(offset, from);
    }
}

export default abstract class BaseRenderer extends Component {   
    public alpha: DrawOptions["alpha"];
    public fillStyle: DrawOptions["fillStyle"];
    public strokeStyle: DrawOptions["strokeStyle"];
    public lineWidth: DrawOptions["lineWidth"];
    public alignment: RendererAlignment = RendererAlignment.TOP_LEFT;

    public loop(): void {
        App.draw({
            "origin": this.parent.transform.renderPosition,
            "alpha": this.alpha,
            "fillStyle": this.fillStyle,
            "strokeStyle": this.strokeStyle,
            "lineWidth": this.lineWidth,
            "rotation": this.parent.transform.rotation,
            "scale": this.parent.transform.scale,
            "draw": _ => {}
        });
    }

    public setAlpha(alpha: DrawOptions["alpha"]): this {
        this.alpha = alpha;
        return this;
    }

    public setFillStyle(fillStyle: DrawOptions["fillStyle"]): this {
        this.fillStyle = fillStyle;
        return this;
    }

    public setStrokeStyle(strokeStyle: DrawOptions["strokeStyle"]): this {
        this.strokeStyle = strokeStyle;
        return this;
    }

    public setLineWidth(lineWidth: DrawOptions["lineWidth"]): this {
        this.lineWidth = lineWidth;
        return this;
    }

    public setAlignment(alignment: RendererAlignment): this {
        this.alignment = alignment;
        return this;
    }

    /**
     * @returns {Dimension2} Bounding box of the shape **_before rotation_**.
     */
    public get boundingBox(): Dimension2 {
        return {
            "width": 0,
            "height": 0
        }
    }
}