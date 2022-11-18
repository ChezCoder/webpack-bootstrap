type ResourceElementNames = "video" | "audio" | "img";
type ResourceRawTypes = HTMLElementTagNameMap[ResourceElementNames];
type ResourceTypes = ImageResource | AudioResource | VideoResource;

abstract class RawResource<T extends ResourceRawTypes> {
    readonly source: string;
    protected readonly elementName!: ResourceElementNames;

    protected _data!: T;
    protected _loaded: boolean = false;

    constructor(source: URL | string, data?: T) {
        this.source = source instanceof URL ? source.href : source;

        if (data) {
            this._data = data;
            this._loaded = true;
        }
    }

    public load(): Promise<void> {
        return new Promise<void>((res, rej) => {
            if (this.loaded) return res();

            this._data = document.createElement(this.elementName) as T;
            
            this._data!.onload = () => {
                this._loaded = true;
                res();
            }
            this._data!.onerror = () => rej();
            this._data!.onabort = () => rej();

            this._data!.src = this.source;
        });
    }

    public isVideo(): this is VideoResource { return false; }
    public isAudio(): this is AudioResource { return false; }
    public isImage(): this is ImageResource { return false; }

    public get loaded(): boolean { return this._loaded; }
    public get data(): T | undefined { return this._data; }
}

export namespace Resource {
    export enum Type {
        VIDEO,
        AUDIO,
        IMAGE
    }
}

export class ImageResource extends RawResource<HTMLImageElement> {
    protected elementName: ResourceElementNames = "img";

    public isImage(): this is ImageResource { return true; }
}

export class AudioResource extends RawResource<HTMLAudioElement> {
    protected elementName: ResourceElementNames = "audio";

    public isAudio(): this is AudioResource { return true; }
}

export class VideoResource extends RawResource<HTMLVideoElement> {
    protected elementName: ResourceElementNames = "video";
    
    public isVideo(): this is VideoResource { return true; }
}

export class ResourceManager {
    private _resourceMap: Map<string, ResourceTypes> = new Map();

    public save(name: string, resource: ResourceTypes): Promise<void> {
        return new Promise((res, rej) => {
            this._resourceMap.set(name, resource);

            if (!resource.loaded) resource.load()
                .then(() => res())
                .catch(() => rej(new Error("Failed to load resource")));
        });
    }

    public has(name: string): boolean {
        return this._resourceMap.has(name);
    }

    public get<T extends ResourceTypes>(name: string): T | null {
        return (this._resourceMap.get(name) as T) || null;
    }

    public clear() {
        this._resourceMap.clear();
    }
}