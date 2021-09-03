import { ContainerModule } from "inversify";
import {
  IRendererProvider,
  IRendererService,
  IContextService,
  IGraphService,
} from "./interface";
import { ThreeRenderer } from "./renderers";
import { RendererService, ContextService, GraphService } from "./services";
export function createModules() {
  return new ContainerModule((bind) => {
    bind<IRendererProvider>(IRendererProvider)
      .to(ThreeRenderer)
      .inSingletonScope();
    bind<IRendererService>(IRendererService)
      .to(RendererService)
      .inSingletonScope();
    bind<IContextService>(IContextService)
      .to(ContextService)
      .inSingletonScope();
    bind<IGraphService>(IGraphService).to(GraphService).inSingletonScope();
  });
}
