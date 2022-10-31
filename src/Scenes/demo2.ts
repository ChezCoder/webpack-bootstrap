import { ImageResource } from "../lib/Resource";
import Scene from "../lib/Scene";
import { Angle, Color, Random, TextHelper, Utils } from "../lib/Util";
import { Square2 } from "../SceneObjects/Square2";
export default class extends Scene {
    private circleRotation: number = Random.random(0, 180);

    public setup(): void {
        this.resource.save("webpack", new ImageResource("./assets/images/javascript.png"));
        this.addRenderable(new Square2(this, -Random.random(0, 200) / 100, 210, Color.Enum.DIM_GRAY));
        this.addRenderable(new Square2(this, Random.random(0, 200) / 100, 200, Color.Enum.GRAY));
    }

    public loop(): void {
        this.draw({
            "draw": ctx => {
                const image = this.resource.get<ImageResource>("webpack")!;
        
                if (image.loaded) {
                    if (image.data) {
                        ctx.drawImage(image.data, 0, 0);
                    } else {
                        console.log("Not loaded");
                    }
                } else {
                    console.log("Not loaded");
                }
            }
        });
        
        this.circleRotation += 0.3 * this.app.deltaTime;
        this.circleRotation = Utils.wrapClamp(this.circleRotation, 0, 360);

        this.draw({
            "fillStyle": new Color.Hex(0x0000ff).toString(),
            "origin": this.app.center,
            "rotation": Angle.toRadians(this.circleRotation),
            "draw": ctx => {
                ctx.arc(-150 * this.app.zoom, 0, 20 * this.app.zoom, 0, Math.PI * 2);
            },
            "alpha": 0.3
        });

        TextHelper.writeCenteredTextAt(this, "Demo Scene 2!", {
            "fillStyle": new Color.Hex("#ffffff").toString(),
            "origin": this.app.center,
            "alpha": 0.6,
            "lineWidth": 3,
            "strokeStyle": "black",
            "rotation": Angle.toRadians(20)
        });
    }
}