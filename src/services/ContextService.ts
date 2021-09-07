import { injectable } from "inversify";
import { ID, INode, IEdge, IContextService } from "../interface";

// 基础数据服务层
@injectable()
export class ContextService implements IContextService {
  private _container: HTMLElement | null | undefined;
  private _context = {
    id: "",
    nodes: new Map<ID, INode>(),
    edges: new Map<ID, IEdge>(),
  };
  public init(selector: string) {
    this._container = document.getElementById(selector);
    this._context.id = `#${selector}`;
  }
  public get container() {
    return this._container;
  }
  put(graphData: { nodes: INode[]; edges: IEdge[] }) {
    graphData.nodes.forEach((node) => {
      this._context.nodes.set(node.id, node);
    });
    graphData.edges.forEach((edge) => {
      this._context.edges.set(edge.id, edge);
    });
  }

  public output() {
    const nodes = Array.from(this._context.nodes.values()).map((node) => node);
    const edges = Array.from(this._context.edges.values()).map((edge) => edge);
    return {
      nodes,
      edges,
    };
  }
}
