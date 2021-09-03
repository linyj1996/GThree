import { IRendererProvider } from "../interface";
import {injectable, inject} from 'inversify';

@injectable()
export class ThreeRenderer implements IRendererProvider {
  public init(){
    console.log('init')
  }
}