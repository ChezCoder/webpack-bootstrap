"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputDriver = void 0;
const Util_1 = require("./Util");
class InputDriver {
    constructor(app) {
        this.mousePos = new Util_1.Vector2(0, 0);
        this.mouseDown = false;
        this.mouseClick = false;
        this.keysDown = [];
        this.keyPress = "";
        this._mouseClickFrames = 0;
        this._keyPressFrames = 0;
        this._keyPressEnable = true;
        this._lastKeyPress = "";
        this.app = app;
        const driver = this;
        $(window).on("mousemove", function (e) {
            driver.mousePos.x = e.clientX;
            driver.mousePos.y = e.clientY;
        });
        $(window).on("mousedown", function () {
            driver.mouseDown = true;
            driver._mouseClickFrames = 1;
        });
        $(window).on("mouseup", function () {
            driver.mouseDown = false;
        });
        $(window).on("keydown", function (e) {
            !driver.keysDown.includes(e.key) ? driver.keysDown.push(e.key) : "";
            driver.keyPress = (driver._keyPressEnable || (e.key != driver._lastKeyPress)) ? e.key : "";
            driver._lastKeyPress = e.key;
            driver._keyPressFrames = 1;
            driver._keyPressEnable = false;
        });
        $(window).on("keyup", function (e) {
            driver.keysDown.includes(e.key) ? driver.keysDown.splice(driver.keysDown.indexOf(e.key), 1) : "";
            driver._keyPressEnable = true;
        });
    }
    step() {
        this.mouseClick = !!this._mouseClickFrames;
        this.keyPress = !!this._keyPressFrames ? this.keyPress : "";
        this._mouseClickFrames = Math.max(0, this._mouseClickFrames - 1);
        this._keyPressFrames = Math.max(0, this._keyPressFrames - 1);
    }
}
exports.InputDriver = InputDriver;
//# sourceMappingURL=UserInput.js.map