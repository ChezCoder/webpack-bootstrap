"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routine = exports.WaitForSeconds = exports.WaitForMillis = exports.WaitForPromise = exports.WaitFor = void 0;
class WaitFor {
    constructor(test, process) {
        this.test = test;
        this.process = process || (function () { });
        this.tick();
    }
    tick() {
        if (this.test())
            return this.process();
        setTimeout(this.tick.bind(this));
    }
}
exports.WaitFor = WaitFor;
class WaitForPromise extends WaitFor {
    constructor(promise) {
        super(() => this.done);
        this.done = false;
        const self = this;
        promise.then(function () {
            self.done = true;
        }).catch(function () {
            self.done = true;
        });
    }
}
exports.WaitForPromise = WaitForPromise;
class WaitForMillis extends WaitFor {
    constructor(millis = 1, process) {
        const now = Date.now() + millis;
        super(() => (Date.now() >= now), process);
        this.millis = millis;
    }
}
exports.WaitForMillis = WaitForMillis;
class WaitForSeconds extends WaitForMillis {
    constructor(seconds = 1, process) {
        super(seconds * 1000, process);
    }
}
exports.WaitForSeconds = WaitForSeconds;
var Routine;
(function (Routine) {
    function continueGeneratorTask(task) {
        const result = task.next();
        const continueTask = () => continueGeneratorTask(task);
        if (result.done)
            return;
        if (result.value instanceof WaitFor)
            result.value.process = continueTask;
        else
            new WaitForMillis(1, continueTask);
    }
    function startTask(process) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = process();
            continueGeneratorTask(task);
        });
    }
    Routine.startTask = startTask;
})(Routine = exports.Routine || (exports.Routine = {}));
//# sourceMappingURL=Scheduler.js.map