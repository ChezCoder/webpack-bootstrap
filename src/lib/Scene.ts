import { Cursor } from "./App";
import GameObject from "./GameObject";

export default abstract class Scene extends GameObject {
    public parent!: never;
    public cursor: Cursor | string;

    constructor(name: string = "Scene") {
        super(null, name);
        this.cursor = "asd";
    }
}