import Rotater from "../GameObjects/Rotater";
import { App } from "../lib/App";
import { ImageResource } from "../lib/Resource";
import Scene from "../lib/Scene";
import { Angle, Color, TextUtils } from "../lib/Util";

export class demo extends Scene {
    public setup(): void {
        App.resource.save("webpack", new ImageResource("./assets/images/webpack.png"));

        console.log(this.children);

        const rotater = new Rotater(this, "Rotater");
        rotater.transform.scale.x = 1;

        this.children.push(rotater);
    }

    public render() {
        App.draw({
            "draw": ctx => {
                const image = App.resource.get<ImageResource>("webpack");
        
                if (image) {
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
            }
        });

        TextUtils.writeCenteredTextAt("Demo Scene!", {
            "fillStyle": new Color.Hex("#ffffff").toString(),
            "origin": App.center(),
            "alpha": 0.6,
            "lineWidth": 3,
            "strokeStyle": "black",
            "rotation": Angle.toRadians(-20)
        });
    }
}