import { ContainerModule } from "inversify";
import {
  IRendererProvider,
  IRendererService,
  IGraphService,
} from "./interface";
import { ThreeRenderer } from "./renderers";
import { RendererService, GraphService } from "./services";
export function createModules() {
  return new ContainerModule((bind) => {
    bind<IRendererProvider>(IRendererProvider)
      .to(ThreeRenderer)
      .inSingletonScope();
    bind<IRendererService>(IRendererService)
      .to(RendererService)
      .inSingletonScope();
    bind<IGraphService>(IGraphService).to(GraphService).inSingletonScope();
  });
}
