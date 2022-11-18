import Component from "../lib/Component";
import GameObject from "../lib/GameObject";
import { Force, Vector2 } from "../lib/Util";

export default class Transform extends Component {
    public position: Vector2 = new Vector2(0, 0);
    public scale: Vector2 = new Vector2(1, 1);
    public velocity: Force = new Force(0, 0);
    public rotation: number = 0;
    public angularVelocity: number = 0;

    constructor(parent: GameObject) {
        super(parent, "transform");
    }

    public loop(): void {
        this.position.addForce(this.velocity);
        this.rotation = (this.rotation % (Math.PI * 2)) + this.angularVelocity;
    }

    public get renderPosition(): Vector2 {
        if (this.parent.parent) {
            return Vector2.add(Vector2.dot(this.scale, this.position), this.parent.parent.transform.renderPosition);
        }
        return this.position;
    }
}