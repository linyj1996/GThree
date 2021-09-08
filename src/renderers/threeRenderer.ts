import {
  IFlexible,
  IRendererProvider,
  IContextService,
  INodeService,
} from "../interface";
import { injectable, inject } from "inversify";
import * as THREE from "three";

@injectable()
export class ThreeRenderer implements IRendererProvider {
  @inject(IContextService) public readonly contextService: IContextService;
  @inject(INodeService) public readonly nodeService: INodeService;
  private _scene: THREE.Object3D;
  private _camera: THREE.Camera;
  private _renderer: THREE.Renderer;
  private t = 0
  // 计算相机Z轴位置
  private getPositionZ(nodesCount: number): number {
    return (
      (3.04139028390183e16 - 150.128392537138) /
        (1 + Math.pow(nodesCount / 2.12316143430556e31, -0.461309470817812)) +
      150.128392537138
    );
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
  }
  public render() {
    const { nodes, edges } = this.contextService.output();
    const mesh = this.nodeService.create(nodes);
    console.log(mesh)
    mesh && this._scene.add(mesh);
    this._renderer.render(this._scene, this._camera);
    console.log(this._renderer)
    console.log(this._scene)
    console.log(this._camera)
    this.animate()
    // setTimeout(()=>{
    //   this._renderer.render(this._scene,this._camera)
    // },10000)
  }
  private animate(){
    setInterval(()=>{
      // this._camera.position.x = 500*Math.sin(Math.PI/180*this.t++)
      // this._camera.position.y = 500*Math.cos(Math.PI/180*this.t++)
      this._renderer.render(this._scene,this._camera)
      console.log(1111111)
    },1000)
    
  }
}
