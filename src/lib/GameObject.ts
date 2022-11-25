import Transform from "../Components/Transform";
import ChildList from "./ChildList";
import Component from "./Component";
import Loopable from "./Loopable";

let id = 0;

export default abstract class GameObject extends Loopable {
    public readonly id: number = id++;
    public readonly transform: Transform = new Transform(this);
    public children: ChildList<GameObject> = new ChildList<GameObject>();
    public parent: GameObject | null;
    public components: ChildList<Component> = new ChildList<Component>();

    constructor(parent: GameObject | null = null, name: string = "GameObject") {
        super(name);
        this.parent = parent;
    }

    public readonly setParent = (parent: GameObject)  => {
        if (this.parent) {
            this.parent.children.splice(this.parent.children.findIndex(o => o.id == this.id), 1);
        }
        parent.children.push(this);
        this.parent = parent;
    }

    public setup(): void {};
    public loop(): void {};
    public render(): void {};
}