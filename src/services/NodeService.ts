import { inject, injectable } from "inversify";
import { INode, INodeService, IEventService } from "../interface";
import node from '../assets/image/node.png';
import {
  Float32BufferAttribute,
  BufferGeometry,
  Color,
  PointsMaterial,
  Points,
  TextureLoader,
} from "three";

@injectable()
export class NodeService implements INodeService {
  @inject(IEventService) public readonly eventService:IEventService;
  // 默认贴图
  private texture = new TextureLoader().load(node)
  public create(nodes: INode[]) {
    let bufferGeometry = new BufferGeometry();
    const n = 300;
    const n2 = 150;
    const positions = [];
    let color = new Color();
    const colors = [];
    for (let i = 0; i < nodes.length; i++) {
      let x = Math.random() * n - n2;
      let y = Math.random() * n - n2;
      let z = Math.random() * n - n2;
      positions.push(x, y, z);
      let vx = x / n + 0.5;
      let vy = x / n + 0.5;
      let vz = x / n + 0.5;
      color.setRGB(vx, vy, vz);
      colors.push(color.r, color.g, color.b);
    }
    bufferGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(positions, 3)
    );
    bufferGeometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

    bufferGeometry.computeBoundingBox();
    const loadTexture = this.load(
      node
    );
    let material = new PointsMaterial({
      size: 100,
      vertexColors: true,
      transparent: true,
      map: this.texture,
      opacity: 1,
      sizeAttenuation: true,
      color: "#ccffcc",
    });
    let mesh = new Points(bufferGeometry, material);
    mesh.name = "points";
    return mesh;
  }
  private load(url: string) {
    const textureLoader = new TextureLoader();
    const _this = this
    const texture = textureLoader.load(url,function(){
      _this.eventService.fire('texture-loaded')
    });
    return texture;
  }
}
