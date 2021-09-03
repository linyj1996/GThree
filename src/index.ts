import 'reflect-metadata'
import {Container} from 'inversify'
import { createModules } from './modules'
import { IGraphService } from './interface'
/**
 * 创建图谱实例
 * @param selector 是一个 container ID
 */
export function Main(
  selector:string
){
  const container = new Container();
  const core = createModules()
  container.load(core)
  const service = container.get<IGraphService>(IGraphService)
  service.mount(selector)
  return service
}