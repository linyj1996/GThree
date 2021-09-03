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

// 基础数据服务
export const IContextService = Symbol("IContextService")
export interface IContextService {
  readonly container: HTMLElement;
  init(selector:string):void;
}

// 图谱服务
export const IGraphService = Symbol("IGraphService")
export interface IGraphService {
  mount(selector:string,options?:{}):void
}
