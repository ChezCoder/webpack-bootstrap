import { Vector2 } from "./Util";

export class Input {
    public mousePos!: Vector2;
    public mouseDown: boolean = false;
    public mouseClick: boolean = false;
    public keysDown: string[] = [];
    public keyPress: string = "";
    
    private _mouseClickFrames = 0;
    private _keyPressFrames = 0;
    private _keyPressEnable = true;
    private _lastKeyPress: string = "";

    constructor() {
        const driver = this;

        window.addEventListener("load", function() {
            driver.mousePos = new Vector2(0, 0);
        });

        window.addEventListener("mousemove", function(e) {
            driver.mousePos.x = e.clientX;
            driver.mousePos.y = e.clientY;
        });
        
        window.addEventListener("mousedown", function() {
            driver.mouseDown = true;
            driver._mouseClickFrames = 1;
        });
        
        window.addEventListener("mouseup", function() {
            driver.mouseDown = false;
        });
        
        window.addEventListener("keydown", function(e) {
            if (!driver.keysDown.includes(e.key)) driver.keysDown.push(e.key);
            driver.keyPress = (driver._keyPressEnable || (e.key != driver._lastKeyPress)) ? e.key : "";
            driver._lastKeyPress = e.key;
            driver._keyPressFrames = 1;
            driver._keyPressEnable = false;
        });
        
        window.addEventListener("keyup", function(e) {
            if (driver.keysDown.includes(e.key)) driver.keysDown.splice(driver.keysDown.indexOf(e.key), 1);
            driver._keyPressEnable = true;
        });
    }

    public step() {
        this.mouseClick = !!this._mouseClickFrames;
        this.keyPress = !!this._keyPressFrames ? this.keyPress : "";
        this._mouseClickFrames = Math.max(0, this._mouseClickFrames - 1);
        this._keyPressFrames = Math.max(0, this._keyPressFrames - 1);
    }
}