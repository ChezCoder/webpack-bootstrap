import Loopable from "./Loopable";

export default class ChildList<T extends Loopable> {
    private _children: T[] = [];

    public at(...args: Parameters<T[]["at"]>) { return Array.prototype.at.bind(this._children)(...args); }
    public entries(...args: Parameters<T[]["entries"]>) { return Array.prototype.entries.bind(this._children)(...args); }
    public every(...args: Parameters<T[]["every"]>) { return Array.prototype.every.bind(this._children)(...args); }
    public fill(...args: Parameters<T[]["fill"]>) { return Array.prototype.fill.bind(this._children)(...args); }
    public find(...args: Parameters<T[]["find"]>) { return Array.prototype.find.bind(this._children)(...args); }
    public findIndex(...args: Parameters<T[]["findIndex"]>) { return Array.prototype.findIndex.bind(this._children)(...args); }
    public forEach(...args: Parameters<T[]["forEach"]>) { return Array.prototype.forEach.bind(this._children)(...args); }
    public getObjectById(id: number): T | null { return this._children.find(o => o.id === id) || null; }
    public getObjectsByName(name: string): T[] { return this._children.filter(o => o.name === name); }
    public includes(...args: Parameters<T[]["includes"]>) { return Array.prototype.includes.bind(this._children)(...args); }
    public indexOf(...args: Parameters<T[]["indexOf"]>) { return Array.prototype.indexOf.bind(this._children)(...args); }
    public join(...args: Parameters<T[]["join"]>) { return Array.prototype.join.bind(this._children)(...args); }
    public keys(...args: Parameters<T[]["keys"]>) { return Array.prototype.keys.bind(this._children)(...args); }
    public lastIndexOf(...args: Parameters<T[]["lastIndexOf"]>) { return Array.prototype.lastIndexOf.bind(this._children)(...args); }
    public pop(...args: Parameters<T[]["pop"]>) { return Array.prototype.pop.bind(this._children)(...args); }
    public push(...objects: T[]) { objects.forEach(o => { o.setup(); this._children.push(o) }); }
    public map(...args: Parameters<T[]["map"]>) { return Array.prototype.map.bind(this._children)(...args); }
    public reduce(...args: Parameters<T[]["reduce"]>) { return Array.prototype.reduce.bind(this._children)(...args); }
    public reduceRight(...args: Parameters<T[]["reduceRight"]>) { return Array.prototype.reduceRight.bind(this._children)(...args); }
    public reverse(...args: Parameters<T[]["reverse"]>) { return Array.prototype.reverse.bind(this._children)(...args); }
    public shift(...args: Parameters<T[]["shift"]>) { return Array.prototype.shift.bind(this._children)(...args); }
    public some(...args: Parameters<T[]["some"]>) { return Array.prototype.some.bind(this._children)(...args); }
    public sort(...args: Parameters<T[]["sort"]>) { return Array.prototype.sort.bind(this._children)(...args); }
    public splice(...args: Parameters<T[]["splice"]>) { return Array.prototype.splice.bind(this._children)(...args); }
    public unshift(...args: Parameters<T[]["unshift"]>) { return Array.prototype.unshift.bind(this._children)(...args); }
    public values(...args: Parameters<T[]["values"]>) { return Array.prototype.values.bind(this._children)(...args); }
    public get length() { return this._children.length; }
}