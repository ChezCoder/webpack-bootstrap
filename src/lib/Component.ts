import GameObject from "./GameObject";
import Loopable from "./Loopable";

let id = 0;

export default abstract class Component extends Loopable {
    public readonly id: number = id++;
    public parent: GameObject;
    
    constructor(parent: GameObject, name: string = "component") {
        super(name);
        this.parent = parent;
    }

    public setParent(parent: GameObject) {
        this.parent.children.splice(this.parent.children.findIndex(o => o.id == this.id), 1);
        parent.components.push(this);
        this.parent = parent;
    }
}