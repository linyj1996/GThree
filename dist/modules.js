import { ContainerModule } from 'inversify';
import { IRendererService } from './interface';
import { ThreeRenderer } from './renderers';
export function createModules() {
    return new ContainerModule(function (bind) {
        bind(IRendererService)
            .to(ThreeRenderer)
            .inSingletonScope();
    });
}
//# sourceMappingURL=modules.js.map