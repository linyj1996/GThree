import {inject, injectable} from 'inversify'
import { IContextService} from '../interface'

// 基础数据服务层
@injectable()
export class ContextService implements IContextService {
  private _container:HTMLElement | null | undefined
  public init(selector:string){
    this._container = document.getElementById(selector)
  }
  public get container () {
    return this._container
  }
}