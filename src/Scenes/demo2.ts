import { App } from "../lib/App";
import { ImageResource } from "../lib/Resource";
import Scene from "../lib/Scene";
import { Angle, Color, TextUtils } from "../lib/Util";
export default class extends Scene {
    public setup(): void {
        App.resource.save("javascript", new ImageResource("./assets/images/javascript.png"));
        this.enabled = false;
    }

    public loop(): void {
        App.draw({
            "draw": ctx => {
                const image = App.resource.get<ImageResource>("javascript")!;
        
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

        TextUtils.writeCenteredTextAt("Demo Scene 2!", {
            "fillStyle": new Color.Hex("#ffffff").toString(),
            "origin": App.center(),
            "alpha": 0.6,
            "lineWidth": 3,
            "strokeStyle": "black",
            "rotation": Angle.toRadians(20)
        });
    }
}