import Scene from "../Scene";
import { Angle, Random, TextHelper, Utils, Vector2 } from "../util";

export default class extends Scene {
    private rotation1: number = Random.random(0, 180);
    private rotation2: number = Random.random(0, 180);
    private inc1: number = Random.random(0, 200) / 100;
    private inc2: number = Random.random(0, 200) / 100;
    private squareDims1 = 210;
    private squareDims2 = 200;

    private circleRotation: number = Random.random(0, 180);

    public loop(): void {
        this.rotation1 -= this.inc1 * this.app.deltaTime;
        this.rotation2 += this.inc2 * this.app.deltaTime;
        this.circleRotation += -0.3 * this.app.deltaTime;

        this.rotation1 = Utils.wrapClamp(this.rotation1, 0, 360);
        this.rotation2 = Utils.wrapClamp(this.rotation2, 0, 360);
        this.circleRotation = Utils.wrapClamp(this.circleRotation, 0, 360);

        this.app.draw({
            "fillStyle": "#555555",
            "origin": this.app.center,
            "rotation": Angle.toRadians(this.rotation1),
            "draw": ctx => {
                ctx.fillRect(-this.squareDims1 / 2, -this.squareDims1 / 2, this.squareDims1, this.squareDims1);
            }
        });

        this.app.draw({
            "fillStyle": "#333333",
            "origin": this.app.center,
            "rotation": Angle.toRadians(this.rotation2),
            "draw": ctx => {
                // ctx.fillRect(this.app.width / 2 - this.squareDims2 / 2, this.app.height / 2 - this.squareDims2 / 2, this.squareDims2, this.squareDims2);
                ctx.fillRect(0, 0, this.squareDims2, this.squareDims2);
            }
        });

        TextHelper.writeCenteredTextAt(this.ctx, "Demo Scene!", new Vector2(this.app.width / 2, this.app.height / 2), "white");
    }
}