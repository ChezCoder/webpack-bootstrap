import { ImageResource } from "../lib/Resource";
import Scene, { DrawOptions, Renderable } from "../lib/Scene";
import { Angle, Color, Random, TextHelper, Utils } from "../lib/Util";

class Square extends Renderable {
    public rotation: number;
    public dims: number;
    public increment: number;
    public color: string;

    constructor(scene: Scene, increment: number, dimentions: number, color: string) {
        super(scene);

        this.rotation = Random.random(0, 180);
        this.increment = increment;
        this.dims = dimentions;
        this.color = color;
    }

    public value(): DrawOptions {
        this.rotation += this.increment * this.scene.app.deltaTime;
        this.rotation = Utils.wrapClamp(this.rotation, 0, 360);

        return {
            "fillStyle": new Color.Hex(this.color).toRGB().toHex().toString(),
            "origin": this.scene.app.center,
            "rotation": Angle.toRadians(this.rotation),
            "draw": ctx => {
                ctx.fillRect(-this.dims * this.scene.app.zoom / 2, -this.dims * this.scene.app.zoom / 2, this.dims * this.scene.app.zoom, this.dims * this.scene.app.zoom);
            }
        };
    }
}

export default class extends Scene {
    public square1: Square = new Square(this, Random.random(0, 200) / 100, 210, Color.Enum.GRAY);
    public square2: Square = new Square(this, -Random.random(0, 200) / 100, 200, Color.Enum.DIM_GRAY);

    private circleRotation: number = Random.random(0, 180);

    public setup(): void {
        this.resource.save("webpack", new ImageResource("./assets/webpack.png"));
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

        this.draw(this.square1);
        this.draw(this.square2);

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