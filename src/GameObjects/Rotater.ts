import { RendererAlignment } from "../Components/BaseRenderer";
import SquareRenderer from "../Components/SquareRenderer";
import { App } from "../lib/App";
import GameObject from "../lib/GameObject";
import { Angle, Vector2 } from "../lib/Util";

export default class extends GameObject {
    public setup(): void {
        this.transform.angularVelocity = Angle.toRadians(5);
        // this.transform.velocity.magnitude = 5;
        this.transform.position = new Vector2(400, 400);

        this.components.push(new SquareRenderer(this, 100)
            .setAlignment(RendererAlignment.TOP_LEFT)
            .setFillStyle("#888888"));
    }

    public loop(): void {
        const f = App.input.mousePos.toForce(this.transform.position);
        
        f.magnitude *= 0.1;
        this.transform.velocity = f;
    }

    public onmessage(data: any): void {
        console.log(data);
    }
}