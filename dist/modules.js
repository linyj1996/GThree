"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModules = void 0;
var inversify_1 = require("inversify");
var interface_1 = require("./interface");
var renderers_1 = require("./renderers");
function createModules() {
    return new inversify_1.ContainerModule(function (bind) {
        bind(interface_1.IRendererService)
            .to(renderers_1.ThreeRenderer)
            .inSingletonScope();
    });
}
exports.createModules = createModules;
//# sourceMappingURL=modules.js.map