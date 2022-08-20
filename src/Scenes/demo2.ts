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
        this.rotation1 -= this.inc1;
        this.rotation2 += this.inc2;
        this.circleRotation -= 0.1;

        this.rotation1 = Utils.wrapClamp(this.rotation1, 0, 360);
        this.rotation2 = Utils.wrapClamp(this.rotation2, 0, 360);
        this.circleRotation = Utils.wrapClamp(this.circleRotation, 0, 360);

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#555555";
        this.ctx.translate(this.app.width / 2, this.app.height / 2);
        this.ctx.rotate(Angle.toRadians(this.rotation1));
        this.ctx.translate(-this.app.width / 2, -this.app.height / 2);
        this.ctx.fillRect(this.app.width / 2 - this.squareDims1 / 2, this.app.height / 2 - this.squareDims1 / 2, this.squareDims1, this.squareDims1);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#333333";
        this.ctx.translate(this.app.width / 2, this.app.height / 2);
        this.ctx.rotate(Angle.toRadians(this.rotation2));
        this.ctx.translate(-this.app.width / 2, -this.app.height / 2);
        this.ctx.fillRect(this.app.width / 2 - this.squareDims2 / 2, this.app.height / 2 - this.squareDims2 / 2, this.squareDims2, this.squareDims2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "blue";
        this.ctx.translate(this.app.width / 2, this.app.height / 2);
        this.ctx.rotate(this.circleRotation);
        this.ctx.translate(-this.app.width / 2, -this.app.height / 2);
        this.ctx.arc(this.app.height / 2 - 150, this.app.height / 2, 20, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.beginPath();
        TextHelper.writeCenteredTextAt(this.ctx, "Demo2 Scene!", new Vector2(this.app.width / 2, this.app.height / 2), "white");
        this.ctx.closePath();
    }
}