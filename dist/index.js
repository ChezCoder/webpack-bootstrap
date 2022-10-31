"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./lib/App"));
const demo_1 = __importDefault(require("./Scenes/demo"));
const demo2_1 = __importDefault(require("./Scenes/demo2"));
let app;
$(function () {
    return __awaiter(this, void 0, void 0, function* () {
        app = new App_1.default(window.innerWidth, window.innerHeight);
        app.addScene(new demo_1.default(app, "demo"));
        app.addScene(new demo2_1.default(app, "demo2"));
        app.enableScene("demo");
        app.loop = function () {
            if (app.input.keyPress == "1") {
                app.enableScene("demo");
            }
            else if (app.input.keyPress == "2") {
                app.enableScene("demo2");
            }
        };
    });
});
$(window).on("resize", function () {
    app.width = window.innerWidth;
    app.height = window.innerHeight;
});
//# sourceMappingURL=index.js.map