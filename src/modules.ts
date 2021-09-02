import { ContainerModule } from 'inversify'
import { IRendererService } from './interface'
import { ThreeRenderer } from './renderers'
export function createModules() {
  return new ContainerModule(bind => {
    bind<IRendererService>(IRendererService)
      .to(ThreeRenderer)
      .inSingletonScope()
  })
}