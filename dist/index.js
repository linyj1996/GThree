import 'reflect-metadata';
import { Container } from 'inversify';
import { createModules } from './modules';
import { IRendererService } from './interface';
/**
 * 创建图谱实例
 * @param selector 是一个 container ID
 */
export function Main(selector) {
    var container = new Container();
    var core = createModules();
    container.load(core);
    var service = container.get(IRendererService);
    return service;
}
//# sourceMappingURL=index.js.map