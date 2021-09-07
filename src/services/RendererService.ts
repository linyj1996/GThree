import {inject, injectable} from 'inversify'
import {IRendererProvider,IRendererService} from '../interface'

// 渲染层
@injectable()
export class RendererService implements IRendererService {
  @inject(IRendererProvider) public readonly provider:IRendererProvider
  public init (){
    this.provider.init()
  }
  public render() {
    this.provider.render();
  }
}