import { Color } from "../src/Util";

describe("Testing color utility", () => {
    test("RGB class", () => {
        const rgb: Color.RGB = new Color.RGB(255, 127, 0);
        expect(rgb.red).toEqual(255);
        expect(rgb.green).toEqual(127);
        expect(rgb.blue).toEqual(0);
        expect(rgb.toString()).toEqual("rgb(255, 127, 0)");
    });

    test("Hex class", () => {
        const hex = new Color.Hex("#007fff");
        expect(hex.toString()).toEqual("#007fff");

        const hex1 = new Color.Hex(0xff7f7f);
        expect(hex1.toString()).toEqual("#ff7f7f");
    });

    test("RGB to Hex", () => {
        const rgb: Color.RGB = new Color.RGB(127, 0, 255);
        expect(rgb.toHex().toString()).toEqual("#7f00ff");
    });

    test("Hex to RGB", () => {
        const hex = new Color.Hex("#00ff7f");
        expect(hex.toRGB().toString()).toEqual("rgb(0, 255, 127)");
    });
});