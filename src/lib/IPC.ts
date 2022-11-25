export interface IPCMessage<T> {
    label: string
    message: T
}

type IPCHandler<T> = (data: IPCMessage<T>) => void;

export namespace IPC {
    const handlers: Map<string, IPCHandler<any>[]> = new Map();

    /**
     * Send a message to all IPC event handlers
     * @param data Data to send
     */
    export function sendToAll(data: any) {
        const iListeners = handlers.values();
        let result = iListeners.next();

        while (!result.done) {
            result.value.forEach(handler => handler(data));
            result = iListeners.next();
        }
    }

    /**
     * Sends a message to an IPC event label
     * @param label Event label to send a message to
     * @param data Data to send
     * @returns
     */
    export function send(label: string, data: any = null) {
        if (!handlers.has(label)) return;

        handlers.get(label)?.forEach(handler => handler(data));
    }

    /**
     * Registers an IPC message handler
     * @param label Event label to listen to
     * @param handler Callback for the event listener
     * @returns Index of the handler
     */
    export function on<T>(label: string, handler: IPCHandler<T>): number {
        if (!handlers.has(label))
            handlers.set(label, []);
        return handlers.get(label)!.push(handler) - 1;
    }

    /**
     * Removes a handler by it's index
     * @param label Event label to unregister
     * @param handlerIndex Index of the handler to remove
     */
    export function unregisterHandler<T = unknown>(label: string, handlerIndex: number = -1): IPCHandler<T>[] | null {
        if (!handlers.has(label)) return null;
        if (handlerIndex == -1)
            return handlers.get(label)!.splice(0, handlers.get(label)!.length);
        return handlers.get(label)!.splice(handlerIndex, 1);
    }
}