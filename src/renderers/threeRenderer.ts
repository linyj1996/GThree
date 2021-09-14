import {
  IFlexible,
  IRendererProvider,
  IContextService,
  INodeService,
  IEventService,
} from "../interface";
import { injectable, inject } from "inversify";
import * as THREE from "three";
import Worker from './d3.worker.js'
@injectable()
export class ThreeRenderer implements IRendererProvider {
  @inject(IContextService) public readonly contextService: IContextService;
  @inject(INodeService) public readonly nodeService: INodeService;
  @inject(IEventService) public readonly eventService: IEventService;
  private _scene: THREE.Object3D;
  private _camera: THREE.Camera;
  private _renderer: THREE.WebGLRenderer;
  private _nodeMesh: THREE.Points
  private _raycaster: THREE.Raycaster;
  private _pointer: THREE.Vector2;
  private _intersected: number; //记录鼠标选中实体
  private _worker:Worker;
  private t = 0;
  // 计算相机Z轴位置
  private getPositionZ(nodesCount: number): number {
    return (
      (3.04139028390183e16 - 150.128392537138) /
        (1 + Math.pow(nodesCount / 2.12316143430556e31, -0.461309470817812)) +
      150.128392537138
    );
  }
  private getDistance(nodesCount: number): number {
    return (60.5026920478786 - 19.6364818002641) / (1 + Math.pow(nodesCount / 11113.7184968341, -0.705912886177758)) + 19.6364818002641
  }
  private getStrength(nodesCount: number): number {
    return -1 * ((15.0568640234622 - 2.43316256810301) / (1 + Math.pow(nodesCount / 19283.3978670675, -0.422985777119439)) + 2.43316256810301)
  }
  private getCol(nodesCount: number): number {
    return (2148936082128.1 - 1.89052009608515) / (1 + Math.pow(nodesCount / 7.81339751933109E+33, -0.405575129002072)) + 1.89052009608515
  }
  public init() {
    const container = this.contextService.container;
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(
      1,
      container.offsetWidth / container.offsetHeight,
      0.1,
      this.getPositionZ(50000000)
    );
    this._camera.position.x = 0;
    this._camera.position.y = 0;
    this._camera.position.z = 2000;
    this._camera.lookAt(0,0,0)
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    // this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(container.offsetWidth, container.offsetHeight);
    this._renderer.render(this._scene, this._camera);
    container.appendChild(this._renderer.domElement);
    this.eventService.on("texture-loaded", () => {
      this._renderer.render(this._scene, this._camera);
    });
    this._raycaster = new THREE.Raycaster();
    this._pointer = new THREE.Vector2();
    document.addEventListener("pointermove", (event) => {
      this._pointer.set( ( event.clientX / container.offsetWidth ) * 2 - 1, - ( event.clientY / container.offsetHeight ) * 2 + 1 );
      // this._pointer.x = (event.clientX / window.innerWidth) * 2;
      // this._pointer.y = (event.clientY / window.innerHeight) * 2;
    });
  }
  public render() {
    this._worker = new Worker();
    const { nodes, edges } = this.contextService.output();
    let message = {
      type: 'start',
      nodes: nodes,
      DISTANCE: 10,
      STRENGTH: 10,
      COL: this.getCol(nodes.length),
      linksBuffer: new Int32Array([])
    }
    this._worker.postMessage(message)
    this._worker.onmessage = event=>{
      // if(event.data.currentTick>1){
      //   return;
      // }
      const positions =new Float32Array(event.data.nodes)
      if(this._nodeMesh){
        const tempPz = []
        for(let i =0;i<nodes.length;i++){
          tempPz[i*3] = positions[i*2]
          tempPz[i*3+1] = positions[i*2+1]
          tempPz[i*3+2] = 0
        }
        console.log(tempPz)
        this._nodeMesh.geometry.attributes.position = new THREE.Float32BufferAttribute(tempPz,3)
        this._nodeMesh.geometry.attributes.position.needsUpdate = true
        // this._renderer.render(this._scene, this._camera);
        // this.animate()
        console.log(this._scene)
        console.log(this._camera)
        console.log(this._renderer)
      }

    }
    this._nodeMesh = this.nodeService.create(nodes);
    this._scene.add(this._nodeMesh);
    this._camera.position.z = this.getPositionZ(nodes.length)*0.8
    this._camera.updateMatrixWorld()
    this._renderer.render(this._scene, this._camera);
    // this._raycaster.setFromCamera(this._pointer,this._camera)
    // let intersects = mesh ?this._raycaster.intersectObject(mesh):null
    // this.highLight()
    this.animate()
  }
  private animate() {
    // this.t += 0.1;
    // this._camera.position.x = 10 * Math.sin((Math.PI / 180) * this.t);
    // this._camera.position.y = 10 * Math.cos((Math.PI / 180) * this.t);
    // this._camera.position.z += 50 * Math.sin((Math.PI / 180) * this.t);
    // this.highLight();
    // this._camera.updateMatrixWorld();
    this._renderer.render(this._scene, this._camera);
    window.requestAnimationFrame(this.animate.bind(this));
  }
  private highLight() {
    // console.log(111111)
    this._raycaster.setFromCamera(this._pointer,this._camera);
    const intersects = this._raycaster.intersectObject(this._nodeMesh)
    const position = this._nodeMesh.geometry.attributes.position.array;

    if(intersects.length>0){
      const index = intersects[0].index

      const delt = Math.sqrt(Math.pow(intersects[0].point.x-position[index*3],2)+Math.pow(intersects[0].point.y-position[index*3+1],2))
        // console.log(delt)
        if(delt>0.4){
          // this._intersected = undefined;

          if(this._intersected === intersects[0].index){
            this._intersected = undefined;
            this._scene.remove(this._scene.getObjectByName('test-points'))
            this._renderer.render(this._scene,this._camera)
            
          }
        }else {
          if(this._intersected !==intersects[0].index){
            const index = intersects[0].index
            this._intersected = intersects[0].index
    
            
            const highLightPosition = []
            highLightPosition.push(position[index*3],position[index*3+1],position[index*3+2])
            // highLightPosition.push(0,0,0)
            let bufferGeometry = new THREE.BufferGeometry();
            bufferGeometry.setAttribute(
              "position",
              new THREE.Float32BufferAttribute(highLightPosition, 3)
            );
            bufferGeometry.computeBoundingBox();  
            let material = new THREE.PointsMaterial({
              size: Math.sqrt(1800),
              vertexColors: true,
              transparent: true,
              opacity: 1,
              sizeAttenuation: true,
              color: "#00ff00",
            });
            let mesh = new THREE.Points(bufferGeometry, material);
            mesh.name = 'test-points'
            this._scene.add(mesh)
            this._renderer.render(this._scene, this._camera);
          }
        }
      
    }
  }
}
