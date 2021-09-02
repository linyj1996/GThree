"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
require("reflect-metadata");
var inversify_1 = require("inversify");
var modules_1 = require("./modules");
var interface_1 = require("./interface");
/**
 * 创建图谱实例
 * @param selector 是一个 container ID
 */
function Main(selector) {
    var container = new inversify_1.Container();
    var core = (0, modules_1.createModules)();
    container.load(core);
    var service = container.get(interface_1.IRendererService);
    return service;
}
exports.Main = Main;
//# sourceMappingURL=index.js.map