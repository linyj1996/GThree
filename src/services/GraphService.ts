import {inject, injectable} from 'inversify'
import {IRendererService,IGraphService,IContextService} from '../interface'

@injectable()
export class GraphService implements IGraphService {
  @inject(IRendererService) public readonly rendererService: IRendererService
  @inject(IContextService) public readonly contextService : IContextService
  public mount(selector:string){
    this.contextService.init(selector)
    this.rendererService.init();
  }
}