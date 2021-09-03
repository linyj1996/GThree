import { IFlexible, IRendererProvider, IContextService } from "../interface";
import { injectable, inject } from "inversify";
import * as THREE from "three";

@injectable()
export class ThreeRenderer implements IRendererProvider {
  @inject(IContextService) public readonly contextService: IContextService;
  private _scene: THREE.Object3D;
  private _camera: THREE.Camera;
  public init() {
    const container = this.contextService.container;
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(
      1,
      container.offsetWidth / container.offsetHeight,
      0.1,
      5000
    );
    this._camera.position.z = 2500;
    
    let geometry = new THREE.IcosahedronGeometry(0.2, 3);
    // let material = new THREE.MeshNormalMaterial();
    let bufferGeometry=new THREE.BufferGeometry();
    let positions:number[] = []
    let colors:number[]=[]
    const pointLength = 10
    const n=50;
    const n2 = 25
    let color = new THREE.Color()
    for(let i =0;i<pointLength;i++){
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
    // console.log(positions)
    // console.log(colors)
    bufferGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3))
    bufferGeometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3))
    bufferGeometry.computeBoundingBox();
    let material = new THREE.PointsMaterial({
      　　size: 100,
      　　vertexColors: true,
      　　transparent: true,
      　　opacity: 1,
      　　sizeAttenuation: true
      });
    let mesh = new THREE.Points(bufferGeometry, material);
    this._scene.add(mesh);
    

    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.render(this._scene, this._camera);
    container.appendChild(renderer.domElement);
  }
}
