import { App } from "./lib/App";
import {demo} from "./Scenes/demo";
import demo2 from "./Scenes/demo2";

$(async function() {
    const a = new demo("demo");
    a.transform.scale.x = 1.5;
    App.addScene(a);

    const b = new demo2("demo2");
    b.transform.position.x = 100;
    App.addScene(b);

    App.loop = function() {
        if (App.input.keyPress == "1") {
            App.scenes[0].enabled = true;
            App.scenes[1].enabled = false;
        } else if (App.input.keyPress == "2") {
            App.scenes[1].enabled = true;
            App.scenes[0].enabled = false;
        }
    }

    App.init();

    (window as any)["app"] = App;
});

$(window).on("resize", function() {
    App.setWidth(window.innerWidth);
    App.setWidth(window.innerHeight);
});