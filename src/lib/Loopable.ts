let id = 0;

export default class Loopable {
    public readonly id: number = id++;
    public name: string;
    public enabled: boolean = true;

    constructor(name: string) {
        this.name = name;
    }

    public setup() {}
    public loop() {}
}