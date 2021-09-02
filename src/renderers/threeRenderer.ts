import { IRendererService } from "../interface";
import {injectable, inject} from 'inversify';

@injectable()
export class ThreeRenderer implements IRendererService {
  public init(){
    console.log('init')
  }
}