import { ContainerModule } from "inversify";
import {
  IRendererProvider,
  IRendererService,
  IContextService,
  IGraphService,
  INodeService,
  IEventService
} from "./interface";
import { ThreeRenderer } from "./renderers";
import { RendererService, ContextService, GraphService, NodeService, EventService } from "./services";
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
    bind<IGraphService>(IGraphService)
      .to(GraphService)
      .inSingletonScope();
    bind<INodeService>(INodeService)
      .to(NodeService)
      .inSingletonScope();
    bind<IEventService>(IEventService)
      .to(EventService)
      .inSingletonScope()
  });
}
