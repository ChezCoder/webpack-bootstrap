import { ImageResource } from "../Resource";
import Scene from "../Scene";
import { Angle, Color, Random, TextHelper, Utils, Vector2 } from "../Util";

export default class extends Scene {
    private rotation1: number = Random.random(0, 180);
    private rotation2: number = Random.random(0, 180);
    private inc1: number = Random.random(0, 200) / 100;
    private inc2: number = Random.random(0, 200) / 100;
    private squareDims1 = 210;
    private squareDims2 = 200;

    private circleRotation: number = Random.random(0, 180);

    public setup(): void {
        this.resource.save("webpack", new ImageResource("./assets/webpack.png"));
    }

    public loop(): void {
        this.rotation1 += this.inc1 * this.app.deltaTime;
        this.rotation2 -= this.inc2 * this.app.deltaTime;
        this.circleRotation += 0.3 * this.app.deltaTime;

        this.rotation1 = Utils.wrapClamp(this.rotation1, 0, 360);
        this.rotation2 = Utils.wrapClamp(this.rotation2, 0, 360);
        this.circleRotation = Utils.wrapClamp(this.circleRotation, 0, 360);

        this.draw({
            "origin": Vector2.ORIGIN,
            "draw": ctx => {
                const image = this.resource.get<ImageResource>("webpack")!;

                if (image.loaded) {
                    if (image.data) {
                        ctx.drawImage(image.data, 0, 0);
                    }
                }
            }
        });

        this.draw({
            "fillStyle": new Color.Hex("#555555").toRGB().toHex().toString(),
            "origin": this.app.center,
            "rotation": Angle.toRadians(this.rotation1),
            "draw": ctx => {
                ctx.fillRect(-this.squareDims1 * this.app.zoom / 2, -this.squareDims1 * this.app.zoom / 2, this.squareDims1 * this.app.zoom, this.squareDims1 * this.app.zoom);
            }
        });

        this.draw({
            "fillStyle": "#333333",
            "origin": this.app.center,
            "rotation": Angle.toRadians(this.rotation2),
            "draw": ctx => {
                ctx.fillRect(0, 0, this.squareDims2 * this.app.zoom, this.squareDims2 * this.app.zoom);
            }
        });

        this.draw({
            "fillStyle": new Color.Hex(0xff0000).toString(),
            "origin": this.app.center,
            "rotation": Angle.toRadians(this.circleRotation),
            "draw": ctx => {
                ctx.arc(-150 * this.app.zoom, 0, 20 * this.app.zoom, 0, Math.PI * 2);
            },
            "alpha": 0.3
        });

        TextHelper.writeCenteredTextAt(this, "Demo Scene!", {
            "fillStyle": new Color.Hex("#ffffff").toString(),
            "origin": this.app.center,
            "alpha": 0.6,
            "lineWidth": 3,
            "strokeStyle": "black",
            "rotation": Angle.toRadians(-20)
        });
    }
}