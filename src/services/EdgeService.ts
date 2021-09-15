import { inject, injectable } from "inversify";
import { IEdgeService, IEdge } from "../interface";
import {
  Float32BufferAttribute,
  BufferGeometry,
  LineBasicMaterial,
  Vector3,
  LineSegments,
  TextureLoader,
} from "three";
@injectable()
export class EdgeService implements IEdgeService {
  public create(edges: IEdge[]) {
    const bufferGeometry = new BufferGeometry();
    const material = new LineBasicMaterial({ color: "#ccffcc", opacity: 1 });
    const vertex = new Vector3();
    const vertices = [];
    for (let i = 0; i < edges.length; i++) {
      vertex.x = Math.random() * 2 - 1;
      vertex.y = Math.random() * 2 - 1;
      vertex.z = Math.random() * 2 - 1;
      vertex.normalize();
      vertex.multiplyScalar(450);

      vertices.push(vertex.x, vertex.y, vertex.z);

      vertex.multiplyScalar(Math.random() * 0.09 + 1);

      vertices.push(vertex.x, vertex.y, vertex.z);
    }
    // console.log(vertices)
    bufferGeometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
    const line = new LineSegments( bufferGeometry, material );
    return line
  }
}
