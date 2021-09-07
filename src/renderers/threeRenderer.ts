import { IFlexible, IRendererProvider, IContextService } from "../interface";
import { injectable, inject } from "inversify";
import * as THREE from "three";

@injectable()
export class ThreeRenderer implements IRendererProvider {
  @inject(IContextService) public readonly contextService: IContextService;
  private _scene: THREE.Object3D;
  private _camera: THREE.Camera;
  private _renderer: THREE.Renderer;

  // 计算相机Z轴位置
  private getPositionZ(nodesCount: number): number {
    return (3.04139028390183E+16 - 150.128392537138) / (1 + Math.pow(nodesCount / 2.12316143430556E+31, -0.461309470817812)) + 150.128392537138
  }
  public init() {
    const container = this.contextService.container;
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(
      1,
      container.offsetWidth / container.offsetHeight,
      0.1,
      18000
    );
    this._camera.position.z = 1000;
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setSize(container.offsetWidth, container.offsetHeight);
    this._renderer.render(this._scene, this._camera);
    container.appendChild(this._renderer.domElement);
  };
  public render() {
    const {nodes,edges} = this.contextService.output()
    console.log(nodes);
    console.log(edges);
    let bufferGeometry=new THREE.BufferGeometry();
    const n=300;
    const n2 = 150;
    const positions = []
    let color = new THREE.Color()
    const colors = []
    for(let i =0;i<nodes.length;i++){
      let x = Math.random()*n-n2;
      let y = Math.random()*n-n2;
      let z = Math.random()*n-n2;
      positions.push(x,y,z)
      let vx = (x/n)+0.5
      let vy = (x/n)+0.5
      let vz = (x/n)+0.5
      color.setRGB(vx,vy,vz)
      colors.push(color.r,color.g,color.b)
    }
    bufferGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3))
    bufferGeometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3))

    bufferGeometry.computeBoundingBox();
    let material = new THREE.PointsMaterial({
      　　size: 10,
      　　vertexColors: true,
      　　transparent: true,
      　　opacity: 1,
      　　sizeAttenuation: true,
      });
      let mesh = new THREE.Points(bufferGeometry, material);
      mesh.name = 'points'
      this._scene.add(mesh);
      this._renderer.render(this._scene, this._camera);
  }
}
