import {inject, injectable} from 'inversify'
import {IRendererService,IGraphService} from '../interface'

@injectable()
export class GraphService implements IGraphService {
  @inject(IRendererService) public readonly rendererService: IRendererService
  public mount(selector:string){
    console.log(selector)
    this.rendererService.init();
  }
}