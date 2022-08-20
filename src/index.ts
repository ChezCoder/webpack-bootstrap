import App from "./App";
import demo from "./Scenes/demo";

let app: App;

$(function() {
    app = new App(window.innerWidth, window.innerHeight);

    app.addScene(new demo(app, "demo"));

    app.enableScene("demo");
});

$(window).on("resize", function() {
    app.width = window.innerWidth;
    app.height = window.innerHeight;
});