/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const UserInput_1 = __webpack_require__(/*! ./UserInput */ "./src/UserInput.ts");
class App {
    constructor(width, height) {
        this.setup = () => { };
        this.loop = () => { };
        this.clear = true;
        this._lastFrameTimestamp = Date.now();
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this._scenes = new Map();
        this.inputDriver = new UserInput_1.InputDriver(this);
        this.width = width;
        this.height = height;
        document.body.appendChild(this.canvas);
        this._setup();
    }
    addScene(scene) {
        this._scenes.set(scene.name, scene);
    }
    enableScene(name) {
        var _a;
        (_a = this._scenes.get(name)) === null || _a === void 0 ? void 0 : _a.setup();
        this._scene = name;
    }
    _setup() {
        this.setup.apply(this);
        this.raf();
    }
    raf() {
        var _a;
        window.requestAnimationFrame(this.raf.bind(this));
        this.inputDriver.step();
        this.loop.apply(this);
        if (this.clear)
            this.ctx.clearRect(0, 0, this._width, this._height);
        (_a = this._scenes.get(this._scene || "")) === null || _a === void 0 ? void 0 : _a.loop();
        this._lastFrameTimestamp = Date.now();
    }
    get currentScene() {
        return this._scenes.get(this._scene || "");
    }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
        this.canvas.width = width;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
        this.canvas.height = height;
    }
    get deltaTime() {
        return 1 / (Date.now() - this._lastFrameTimestamp);
    }
}
exports["default"] = App;


/***/ }),

/***/ "./src/Scene.ts":
/*!**********************!*\
  !*** ./src/Scene.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Scene {
    constructor(app, name) {
        this.app = app;
        this.name = name;
        this.ctx = app.ctx;
    }
    setup() { }
    loop() { }
}
exports["default"] = Scene;


/***/ }),

/***/ "./src/Scenes/demo.ts":
/*!****************************!*\
  !*** ./src/Scenes/demo.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Scene_1 = __importDefault(__webpack_require__(/*! ../Scene */ "./src/Scene.ts"));
const util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
class default_1 extends Scene_1.default {
    constructor() {
        super(...arguments);
        this.rotation1 = util_1.Random.random(0, 180);
        this.rotation2 = util_1.Random.random(0, 180);
        this.inc1 = util_1.Random.random(0, 200) / 100;
        this.inc2 = util_1.Random.random(0, 200) / 100;
        this.squareDims1 = 210;
        this.squareDims2 = 200;
        this.circleRotation = util_1.Random.random(0, 180);
    }
    loop() {
        this.rotation1 += this.inc1;
        this.rotation2 -= this.inc2;
        this.circleRotation += 0.1;
        this.rotation1 = util_1.Utils.wrapClamp(this.rotation1, 0, 360);
        this.rotation2 = util_1.Utils.wrapClamp(this.rotation2, 0, 360);
        this.circleRotation = util_1.Utils.wrapClamp(this.circleRotation, 0, 360);
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#555555";
        this.ctx.translate(this.app.width / 2, this.app.height / 2);
        this.ctx.rotate(util_1.Angle.toRadians(this.rotation1));
        this.ctx.translate(-this.app.width / 2, -this.app.height / 2);
        this.ctx.fillRect(this.app.width / 2 - this.squareDims1 / 2, this.app.height / 2 - this.squareDims1 / 2, this.squareDims1, this.squareDims1);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#333333";
        this.ctx.translate(this.app.width / 2, this.app.height / 2);
        this.ctx.rotate(util_1.Angle.toRadians(this.rotation2));
        this.ctx.translate(-this.app.width / 2, -this.app.height / 2);
        this.ctx.fillRect(this.app.width / 2 - this.squareDims2 / 2, this.app.height / 2 - this.squareDims2 / 2, this.squareDims2, this.squareDims2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "red";
        this.ctx.translate(this.app.width / 2, this.app.height / 2);
        this.ctx.rotate(this.circleRotation);
        this.ctx.translate(-this.app.width / 2, -this.app.height / 2);
        this.ctx.arc(this.app.height / 2 - 150, this.app.height / 2, 20, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        this.ctx.beginPath();
        util_1.TextHelper.writeCenteredTextAt(this.ctx, "Demo Scene!", new util_1.Vector2(this.app.width / 2, this.app.height / 2), "white");
        this.ctx.closePath();
    }
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/Scenes/demo2.ts":
/*!*****************************!*\
  !*** ./src/Scenes/demo2.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Scene_1 = __importDefault(__webpack_require__(/*! ../Scene */ "./src/Scene.ts"));
const util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
class default_1 extends Scene_1.default {
    constructor() {
        super(...arguments);
        this.rotation1 = util_1.Random.random(0, 180);
        this.rotation2 = util_1.Random.random(0, 180);
        this.inc1 = util_1.Random.random(0, 200) / 100;
        this.inc2 = util_1.Random.random(0, 200) / 100;
        this.squareDims1 = 210;
        this.squareDims2 = 200;
        this.circleRotation = util_1.Random.random(0, 180);
    }
    loop() {
        this.rotation1 -= this.inc1;
        this.rotation2 += this.inc2;
        this.circleRotation -= 0.1;
        this.rotation1 = util_1.Utils.wrapClamp(this.rotation1, 0, 360);
        this.rotation2 = util_1.Utils.wrapClamp(this.rotation2, 0, 360);
        this.circleRotation = util_1.Utils.wrapClamp(this.circleRotation, 0, 360);
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#555555";
        this.ctx.translate(this.app.width / 2, this.app.height / 2);
        this.ctx.rotate(util_1.Angle.toRadians(this.rotation1));
        this.ctx.translate(-this.app.width / 2, -this.app.height / 2);
        this.ctx.fillRect(this.app.width / 2 - this.squareDims1 / 2, this.app.height / 2 - this.squareDims1 / 2, this.squareDims1, this.squareDims1);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#333333";
        this.ctx.translate(this.app.width / 2, this.app.height / 2);
        this.ctx.rotate(util_1.Angle.toRadians(this.rotation2));
        this.ctx.translate(-this.app.width / 2, -this.app.height / 2);
        this.ctx.fillRect(this.app.width / 2 - this.squareDims2 / 2, this.app.height / 2 - this.squareDims2 / 2, this.squareDims2, this.squareDims2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "blue";
        this.ctx.translate(this.app.width / 2, this.app.height / 2);
        this.ctx.rotate(this.circleRotation);
        this.ctx.translate(-this.app.width / 2, -this.app.height / 2);
        this.ctx.arc(this.app.height / 2 - 150, this.app.height / 2, 20, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        this.ctx.beginPath();
        util_1.TextHelper.writeCenteredTextAt(this.ctx, "Demo2 Scene!", new util_1.Vector2(this.app.width / 2, this.app.height / 2), "white");
        this.ctx.closePath();
    }
}
exports["default"] = default_1;


/***/ }),

/***/ "./src/UserInput.ts":
/*!**************************!*\
  !*** ./src/UserInput.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputDriver = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
class InputDriver {
    constructor(app) {
        this.mousePos = new util_1.Vector2(0, 0);
        this.mouseDown = false;
        this.mouseClick = false;
        this.keysDown = [];
        this.keyPress = "";
        this.mouseClickFrames = 0;
        this.keyPressFrames = 0;
        this.keyPressEnable = true;
        this.lastKeyPress = "";
        this.app = app;
        const driver = this;
        $(window).on("mousemove", function (e) {
            driver.mousePos.x = e.clientX;
            driver.mousePos.y = e.clientY;
        });
        $(window).on("mousedown", function () {
            driver.mouseDown = true;
            driver.mouseClickFrames = 1;
        });
        $(window).on("mouseup", function () {
            driver.mouseDown = false;
        });
        $(window).on("keydown", function (e) {
            !driver.keysDown.includes(e.key) ? driver.keysDown.push(e.key) : "";
            driver.keyPress = (driver.keyPressEnable || (e.key != driver.lastKeyPress)) ? e.key : "";
            driver.lastKeyPress = e.key;
            driver.keyPressFrames = 1;
            driver.keyPressEnable = false;
        });
        $(window).on("keyup", function (e) {
            driver.keysDown.includes(e.key) ? driver.keysDown.splice(driver.keysDown.indexOf(e.key), 1) : "";
            driver.keyPressEnable = true;
        });
    }
    step() {
        this.mouseClick = !!this.mouseClickFrames;
        this.keyPress = !!this.keyPressFrames ? this.keyPress : "";
        this.mouseClickFrames = Math.max(0, this.mouseClickFrames - 1);
        this.keyPressFrames = Math.max(0, this.keyPressFrames - 1);
    }
}
exports.InputDriver = InputDriver;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const App_1 = __importDefault(__webpack_require__(/*! ./App */ "./src/App.ts"));
const demo_1 = __importDefault(__webpack_require__(/*! ./Scenes/demo */ "./src/Scenes/demo.ts"));
const demo2_1 = __importDefault(__webpack_require__(/*! ./Scenes/demo2 */ "./src/Scenes/demo2.ts"));
let app;
$(function () {
    app = new App_1.default(window.innerWidth, window.innerHeight);
    app.addScene(new demo_1.default(app, "demo"));
    app.addScene(new demo2_1.default(app, "demo2"));
    app.enableScene("demo");
    app.loop = function () {
        if (app.inputDriver.keyPress == "1") {
            app.enableScene("demo");
        }
        else if (app.inputDriver.keyPress == "2") {
            app.enableScene("demo2");
        }
    };
});
$(window).on("resize", function () {
    app.width = window.innerWidth;
    app.height = window.innerHeight;
});


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Resource = exports.LerpUtils = exports.Utils = exports.TextHelper = exports.Random = exports.Angle = exports.Force = exports.Vector2 = void 0;
/**
 * Class representing an x and y value in euclidean geometry
 *
 * Converting to a force will use it's x and y vectors as the force's x and y vectors
 */
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distanceTo(vector) {
        return Math.sqrt(((this.x - vector.x) ** 2) + ((this.y - vector.y) ** 2));
    }
    toForce(fromVector = Vector2.ORIGIN) {
        return new Force(Math.atan2(this.y - fromVector.y, this.x - fromVector.x), this.distanceTo(fromVector));
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
    addForce(force) {
        this.add(force.toVector());
    }
    static difference(from, to) {
        return new Vector2(to.x - from.x, to.y - from.y);
    }
    static dot(vector1, vector2) {
        return new Vector2(vector1.x * vector2.x, vector1.y * vector2.y);
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    simplify() {
        return {
            x: this.x,
            y: this.y
        };
    }
    static get ORIGIN() {
        return new Vector2(0, 0);
    }
    static add(vector1, vector2) {
        return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
    }
}
exports.Vector2 = Vector2;
/**
 * Class representing a force with magnitude and radians.
 *
 * Manipulate individual x and y vectors with Force#setVectors()
 */
class Force {
    constructor(radians, magnitude) {
        this.radians = radians;
        this.magnitude = magnitude;
    }
    toVector() {
        return new Vector2(Math.cos(this.radians) * this.magnitude, Math.sin(this.radians) * this.magnitude);
    }
    setVectors(vectors) {
        const force = new Vector2(vectors.x, vectors.y).toForce(Vector2.ORIGIN);
        this.magnitude = force.magnitude;
        this.radians = force.radians;
    }
    clone() {
        return new Force(this.radians, this.magnitude);
    }
    add(force) {
        const resultant = Vector2.add(this.toVector(), force.toVector()).toForce(Vector2.ORIGIN);
        this.radians = resultant.radians;
        this.magnitude = resultant.magnitude;
    }
    simplify() {
        return {
            magnitude: this.magnitude,
            radians: this.radians
        };
    }
    get degrees() {
        return Angle.toDegrees(this.radians);
    }
    set degrees(degrees) {
        this.radians = Angle.toRadians(degrees);
    }
    static add(force1, force2) {
        return Vector2.add(force1.toVector(), force2.toVector()).toForce(Vector2.ORIGIN);
    }
}
exports.Force = Force;
/**
 * Utility class for converting between radians (0 - 2π) and degrees (0 - 360).
 *
 * Values are unclamped
 */
var Angle;
(function (Angle) {
    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    Angle.toRadians = toRadians;
    function toDegrees(radians) {
        return radians * (180 / Math.PI);
    }
    Angle.toDegrees = toDegrees;
})(Angle = exports.Angle || (exports.Angle = {}));
var Random;
(function (Random) {
    function random(min = 0, max = 100) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    Random.random = random;
    function weightedRandom(weightMap) {
        let dcWeightMap = {};
        Object.assign(dcWeightMap, weightMap);
        let sum = 0;
        let random = Math.random();
        for (let i in dcWeightMap) {
            sum += dcWeightMap[i];
            if (random <= sum)
                return i;
        }
        return Object.keys(dcWeightMap).filter(item => dcWeightMap[item] == (Math.max(...Object.values(dcWeightMap))))[0];
    }
    Random.weightedRandom = weightedRandom;
    function sample(array, amount = 1) {
        return array.sort(() => 0.5 - Math.random()).slice(0, amount);
    }
    Random.sample = sample;
})(Random = exports.Random || (exports.Random = {}));
var TextHelper;
(function (TextHelper) {
    function measureTextMetrics(ctx, text, fontStyle) {
        const oldFont = ctx.font;
        ctx.font = fontStyle;
        const textm = ctx.measureText(text);
        ctx.font = oldFont;
        return textm;
    }
    TextHelper.measureTextMetrics = measureTextMetrics;
    function measureTextHeight(ctx, text, fontStyle) {
        const metrics = measureTextMetrics(ctx, text, fontStyle);
        return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    }
    TextHelper.measureTextHeight = measureTextHeight;
    function measureTextWidth(ctx, text, fontStyle) {
        return measureTextMetrics(ctx, text, fontStyle).width;
    }
    TextHelper.measureTextWidth = measureTextWidth;
    function writeCenteredTextAt(ctx, text, position, color = "black", fontStyle = "30px Arial") {
        const width = measureTextWidth(ctx, text, fontStyle);
        const height = measureTextHeight(ctx, text, fontStyle);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.font = fontStyle;
        ctx.fillText(text, position.x - width / 2, position.y + height / 2);
        ctx.closePath();
    }
    TextHelper.writeCenteredTextAt = writeCenteredTextAt;
})(TextHelper = exports.TextHelper || (exports.TextHelper = {}));
var Utils;
(function (Utils) {
    function rbgToHex(red, blue, green) {
        return `#${prefixSpacing(red.toString(16), "0", 2)}${prefixSpacing(blue.toString(16), "0", 2)}${prefixSpacing(green.toString(16), "0", 2)}`;
    }
    Utils.rbgToHex = rbgToHex;
    function rbgaToHex(red, blue, green, alpha) {
        return `#${prefixSpacing(red.toString(16), "0", 2)}${prefixSpacing(blue.toString(16), "0", 2)}${prefixSpacing(green.toString(16), "0", 2)}${prefixSpacing((Math.round(255 * alpha)).toString(16), "0", 2)}`;
    }
    Utils.rbgaToHex = rbgaToHex;
    function clamp(n, min = 0, max = 1) {
        return Math.max(min, Math.min(n, max));
    }
    Utils.clamp = clamp;
    function wrapClamp(n, min = 0, max = 1) {
        const clamped = clamp(n, min, max);
        min--;
        max++;
        if (clamped === n) {
            return clamped;
        }
        else {
            const difference = clamped - n;
            if (difference < 0)
                return wrapClamp(min - difference, min, max);
            return wrapClamp(max - difference, min, max);
        }
    }
    Utils.wrapClamp = wrapClamp;
    function prefixSpacing(text, prefix, length) {
        if (text.length >= length)
            return text;
        return prefix.repeat(length - text.length) + text;
    }
    Utils.prefixSpacing = prefixSpacing;
    function suffixSpacing(text, suffix, length) {
        if (text.length >= length)
            return text;
        return text + suffix.repeat(length - text.length);
    }
    Utils.suffixSpacing = suffixSpacing;
    function between(n, min, max) {
        return n >= min && n <= max;
    }
    Utils.between = between;
    function normalize(n, max = 1, min = 0) {
        return (n - min) / (max - min);
    }
    Utils.normalize = normalize;
    function isPositionOnLine(pos, linePos1, linePos2, fault = 1) {
        const posFromLinePoints = pos.distanceTo(linePos1) + pos.distanceTo(linePos2);
        const lineLength = linePos1.distanceTo(linePos2);
        return between(posFromLinePoints, lineLength - fault, lineLength + fault);
    }
    Utils.isPositionOnLine = isPositionOnLine;
    function isLineIntersectingLine(lp1, lp2, lp3, lp4) {
        let a = lp1.x, b = lp1.y, c = lp2.x, d = lp2.y, p = lp3.x, q = lp3.y, r = lp4.x, s = lp4.y;
        var det, gamma, lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
            return false;
        }
        else {
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    }
    Utils.isLineIntersectingLine = isLineIntersectingLine;
    function isPointInRectangle(point, rectPos, width, height) {
        return between(point.x, rectPos.x, rectPos.x + width) && between(point.y, rectPos.y, rectPos.y + height);
    }
    Utils.isPointInRectangle = isPointInRectangle;
    function isPointInPolygon(point, polygon, globalWidth, globalHeight) {
        let xIntersections = 0;
        let yIntersections = 0;
        let testLineX = [point, new Vector2(globalWidth, point.y)];
        let testLineY = [point, new Vector2(point.x, globalHeight)];
        polygon.forEach((position, posi) => {
            if (posi == (polygon.length - 1))
                return;
            if (isLineIntersectingLine(testLineX[0], testLineX[1], position, polygon[posi + 1]))
                xIntersections++;
            if (isLineIntersectingLine(testLineY[0], testLineY[1], position, polygon[posi + 1]))
                yIntersections++;
        });
        return (xIntersections % 2 === 1) && (yIntersections % 2 === 1);
    }
    Utils.isPointInPolygon = isPointInPolygon;
    function isPointInCircle(point, circle, radius) {
        if (radius === 0)
            return false;
        var dx = circle.x - point.x;
        var dy = circle.y - point.y;
        return dx * dx + dy * dy <= radius;
    }
    Utils.isPointInCircle = isPointInCircle;
    function isLineInCircle(lineSegment, circle, radius) {
        let t = new Vector2(0, 0);
        let nearest = new Vector2(0, 0);
        if (isPointInCircle(lineSegment[0], circle, radius) || isPointInCircle(lineSegment[1], circle, radius)) {
            return true;
        }
        let x1 = lineSegment[0].x, y1 = lineSegment[0].y, x2 = lineSegment[1].x, y2 = lineSegment[1].y, cx = circle.x, cy = circle.y;
        let dx = x2 - x1;
        let dy = y2 - y1;
        let lcx = cx - x1;
        let lcy = cy - y1;
        let dLen2 = dx * dx + dy * dy;
        let px = dx;
        let py = dy;
        if (dLen2 > 0) {
            let dp = (lcx * dx + lcy * dy) / dLen2;
            px *= dp;
            py *= dp;
        }
        if (!nearest)
            nearest = t;
        nearest.x = x1 + px;
        nearest.y = y1 + py;
        let pLen2 = px * px + py * py;
        return isPointInCircle(nearest, circle, radius) && pLen2 <= dLen2 && (px * dx + py * dy) >= 0;
    }
    Utils.isLineInCircle = isLineInCircle;
    function setMouseCursor(cursorSource = "default") {
        document.body.style.cursor = cursorSource || "default";
    }
    Utils.setMouseCursor = setMouseCursor;
    function safeDivide(x, y) {
        return isFinite(x / y) ? x / y : 0;
    }
    Utils.safeDivide = safeDivide;
})(Utils = exports.Utils || (exports.Utils = {}));
var LerpUtils;
(function (LerpUtils) {
    class Lerper {
        constructor(from, to, duration, clamped = true) {
            this.lerpFunction = Functions.Linear;
            this.from = from;
            this.to = to;
            this.duration = duration;
            this.clamped = clamped;
            this.startTime = Date.now();
        }
        value(currentTime = Date.now()) {
            if (this.clamped)
                return LerpUtils.lerp(this.from, this.to, this.lerpFunction(Utils.clamp((currentTime - this.startTime) / this.duration)));
            else
                return LerpUtils.lerp(this.from, this.to, this.lerpFunction((currentTime - this.startTime) / this.duration));
        }
        reset() {
            this.startTime = Date.now();
        }
        get done() {
            return (this.startTime + this.duration) < Date.now();
        }
    }
    LerpUtils.Lerper = Lerper;
    function lerp(from, to, rate) {
        return from + (to - from) * rate;
    }
    LerpUtils.lerp = lerp;
    let Functions;
    (function (Functions) {
        Functions.Linear = x => x;
        Functions.Reverse = x => 1 - x;
        Functions.EaseIn = x => x * x;
        Functions.EaseOut = x => Functions.EaseIn(Functions.Reverse(x));
        Functions.EaseInOut = x => LerpUtils.lerp(Functions.EaseIn(x), Functions.EaseOut(x), x);
        Functions.Spike = x => x <= 0.5 ? Functions.EaseIn(x / 0.5) : Functions.EaseIn(Functions.Reverse(x) / 0.5);
    })(Functions = LerpUtils.Functions || (LerpUtils.Functions = {}));
})(LerpUtils = exports.LerpUtils || (exports.LerpUtils = {}));
var Resource;
(function (Resource) {
    const resourceMap = new Map();
    function load(src) {
        return new Promise(function (res, rej) {
            if (src instanceof URL)
                src = src.href;
            const image = new Image();
            image.onload = () => res(image);
            image.onerror = err => rej(err);
            image.onabort = image.onerror;
            image.src = src;
        });
    }
    Resource.load = load;
    function loadAndSave(name, src) {
        return new Promise(function (res, rej) {
            load(src).then(img => res(void resourceMap.set(name, img))).catch(rej);
        });
    }
    Resource.loadAndSave = loadAndSave;
    function get(name) {
        return resourceMap.get(name) || null;
    }
    Resource.get = get;
})(Resource = exports.Resource || (exports.Resource = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map