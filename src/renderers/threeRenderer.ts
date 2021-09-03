import { IRendererProvider,IContextService } from "../interface";
import {injectable, inject} from 'inversify';

@injectable()
export class ThreeRenderer implements IRendererProvider {
  @inject(IContextService) public readonly contextService: IContextService
  public init(){
    console.log('init')
  }
}