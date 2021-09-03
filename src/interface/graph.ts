export interface IFlexible {
  [key: string]: any;
}
// 渲染器，目前由three实现
export const IRendererProvider = Symbol("IRendererProvider");
export interface IRendererProvider {
  init(): void;
}

// 渲染器服务
export const IRendererService = Symbol("IRendererService");
export interface IRendererService {
  init(): void;
}

// 图谱服务
export const IGraphService = Symbol("IGraphService")
export interface IGraphService {
  mount(selector:string,options?:{}):void
}
