import { ImageResource } from "../Resource";
import Scene from "../Scene";
import { Angle, Random, TextHelper, Utils, Vector2 } from "../Util";

export default class extends Scene {
    private rotation1: number = Random.random(0, 180);
    private rotation2: number = Random.random(0, 180);
    private inc1: number = Random.random(0, 200) / 100;
    private inc2: number = Random.random(0, 200) / 100;
    private squareDims1 = 210;
    private squareDims2 = 200;

    private circleRotation: number = Random.random(0, 180);

    public setup(): void {
        this.resource.save("javascript", new ImageResource("./assets/javascript.png"));
    }

    public loop(): void {
        this.rotation1 -= this.inc1 * this.app.deltaTime;
        this.rotation2 += this.inc2 * this.app.deltaTime;
        this.circleRotation += -0.3 * this.app.deltaTime;

        this.rotation1 = Utils.wrapClamp(this.rotation1, 0, 360);
        this.rotation2 = Utils.wrapClamp(this.rotation2, 0, 360);
        this.circleRotation = Utils.wrapClamp(this.circleRotation, 0, 360);

        this.app.draw({
            "origin": Vector2.ORIGIN,
            "draw": ctx => {
                const image = this.resource.get<ImageResource>("javascript")!;

                if (image.loaded) {
                    if (image.data) {
                        ctx.drawImage(image.data, 0, 0);
                    }
                }
            }
        });
        
        this.app.draw({
            "fillStyle": "#555555",
            "origin": this.app.center,
            "rotation": Angle.toRadians(this.rotation1),
            "draw": ctx => {
                ctx.fillRect(-this.squareDims1 * this.app.zoom / 2, -this.squareDims1 * this.app.zoom / 2, this.squareDims1 * this.app.zoom, this.squareDims1 * this.app.zoom);
            }
        });

        this.app.draw({
            "fillStyle": "#333333",
            "origin": this.app.center,
            "rotation": Angle.toRadians(this.rotation2),
            "draw": ctx => {
                ctx.fillRect(0, 0, this.squareDims2 * this.app.zoom, this.squareDims2 * this.app.zoom);
            }
        });

        this.app.draw({
            "fillStyle": "#0000ff",
            "origin": this.app.center,
            "rotation": Angle.toRadians(this.circleRotation),
            "draw": ctx => {
                ctx.arc(-150 * this.app.zoom, 0, 20 * this.app.zoom, 0, Math.PI * 2);
            }
        });

        TextHelper.writeCenteredTextAt(this.app, "Demo Scene 2!", {
            "fillStyle": "#00ffff",
            "origin": this.app.center
        });
    }
}