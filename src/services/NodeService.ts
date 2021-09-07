import { injectable } from "inversify";
import { INode, INodeService } from "../interface";

import {
  Float32BufferAttribute,
  BufferGeometry,
  Color,
  PointsMaterial,
  Points,
  Texture
} from "three";

@injectable()
export class NodeService implements INodeService {
  private nodeCanvas () {
    const canvas = document.createElement('canvas')
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.arc(50,50,50,0,Math.PI*2,true)
    ctx.closePath()
    ctx.fillStyle = 'red'
    ctx.fill
    return canvas;
  }
  public create(nodes: INode[]) {
    let bufferGeometry = new BufferGeometry();
    const NODE_TEXTURE = new Texture(this.nodeCanvas());
    NODE_TEXTURE.needsUpdate = true;
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
    let material = new PointsMaterial({
      size: 100,
      // vertexColors: true,
      // transparent: true,
      // map: NODE_TEXTURE,
      opacity: 1,
      // sizeAttenuation: true,
      color:"#ccffcc"
    });
    let mesh = new Points(bufferGeometry, material);
    mesh.name = "points";
    return mesh;
  }
}
