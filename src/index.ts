import App from "./App";
import demo from "./Scenes/demo";
import demo2 from "./Scenes/demo2";

let app: App;

$(function() {
    app = new App(window.innerWidth, window.innerHeight);

    app.addScene(new demo(app, "demo"));
    app.addScene(new demo2(app, "demo2"));

    app.enableScene("demo");

    app.loop = function() {
        if (app.inputDriver.keyPress == "1") {
            app.enableScene("demo");
        } else if (app.inputDriver.keyPress == "2") {
            app.enableScene("demo2");
        }
    }
});

$(window).on("resize", function() {
    app.width = window.innerWidth;
    app.height = window.innerHeight;
});