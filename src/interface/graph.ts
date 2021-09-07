import {Object3D} from "three";

export interface IFlexible {
  [key: string]: any;
}
export type ID = string;

export interface IEntity {
  id: ID;
  name?: string;
}

export interface INode extends IEntity {
  image?: string;
  properties: IFlexible;
}
export interface IEdge extends IEntity {
  source: ID;
  target: ID;
}

export interface IGraphOptions {
  nodes: INode[];
  edges: IEdge[];
}
export interface IGraphContext {
  readonly nodes: Map<ID, INode>
  readonly edges: Map<ID, IEdge>
  id: ID
}
// 渲染器，目前由three实现
export const IRendererProvider = Symbol("IRendererProvider");
export interface IRendererProvider {
  init(): void;
  render(): void;
}

// 渲染器服务
export const IRendererService = Symbol("IRendererService");
export interface IRendererService {
  init(): void;
  render():void;
}

// 基础数据服务
export const IContextService = Symbol("IContextService");
export interface IContextService {
  readonly container: HTMLElement;
  init(selector: string): void;
  put(graphData:IGraphOptions):void;
  output():{
    nodes:INode[],
    edges:IEdge[],
  }
}

// 图谱服务
export const IGraphService = Symbol("IGraphService");
export interface IGraphService {
  mount(selector: string, options?: {}): void;
  data(graphData:IGraphOptions):void;
  render();
}
export const INodeService = Symbol("INodeService");
export interface INodeService {
  create(nodes:INode[]):Object3D
}
