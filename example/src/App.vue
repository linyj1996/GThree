<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";
// const gthree = require('../node_modules/gthree/dist/main.js')
// import library from '../node_modules/gthree/dist/webpack-numbers.js'
import "../node_modules/gthree/dist/main.js";
export default {
  name: "App",
  mounted() {
    const data = {
      nodes: [],
      edges: [],
    };
    const nodeLength = 5000;
    const edgeLedgth = 1000;
    for (let i = 0; i < nodeLength; i++) {
      data.nodes.push({
        id: i.toString(),
        name: "node" + i,
      });
    }
    for(let i =0;i<edgeLedgth;i++){
      data.edges.push({
        source:Math.floor(Math.random()*nodeLength/2),
        target:Math.floor((1+Math.random())*nodeLength/2)
      })
    }
    const TGraph = new gthree.Main('container')
    TGraph.data(data)
    TGraph.render();

    // var scene = new THREE.Scene();

    // var camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );

    // var renderer = new THREE.WebGLRenderer();

    // renderer.setSize(window.innerWidth, window.innerHeight);

    // document.body.appendChild(renderer.domElement);
    // var geometry = new THREE.BoxGeometry(32, 32, 32);
    // const bufferGeometry = new THREE.BufferGeometry();
    // const positions = [-10,-10,-10,10,10,10];
    // bufferGeometry.setAttribute(
    //   "position",
    //   new THREE.Float32BufferAttribute(positions, 3)
    // );
    // bufferGeometry.computeBoundingBox();
    // const material1 = new THREE.PointsMaterial({
    //   size: 20,
    //   vertexColors: true,
    //   transparent: true,
    //   opacity: 1,
    //   sizeAttenuation: true,
    //   color: "#00ff00",
    // });
    // let mesh = new THREE.Points(bufferGeometry, material1);
    // scene.add(mesh)
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    // var x = Math.floor(Math.random() * 100 - 50);
    // var y = Math.floor(Math.random() * 100 - 50);
    // var z = 0;
    // console.log(x, y, z);
    // cube.position.set(100, 0, 0);
    // camera.position.x = 0;
    // camera.position.y = 0;
    // camera.position.z = 150;
    // camera.lookAt(0, 0, 0);
    // renderer.render(scene, camera);
    // const container = document.getElementById('container');
    // const scene = new THREE.Scene()
    // const camera = new THREE.PerspectiveCamera(
    //   1,
    //   container.offsetWidth / container.offsetHeight,
    //   0.1,
    //   20000
    // );
    // camera.position.z = 15000;
    // const render = new THREE.WebGLRenderer({ antialias: true });
    // const bufferGeometry = new THREE.BufferGeometry();
    // const positions = [];
    // for (let i = 0; i < 50000; i++) {
    //   let x = Math.random() * 500 - 250;
    //   let y = Math.random() * 500 - 250;
    //   let z = Math.random() * 500 - 250;
    //   positions.push(x, y, z);
    // }
    // bufferGeometry.setAttribute(
    //   "position",
    //   new THREE.Float32BufferAttribute(positions, 3)
    // );
    // bufferGeometry.computeBoundingBox();

    // const material = new THREE.PointsMaterial({
    //   size: 20000,
    //   vertexColors: true,
    //   transparent: true,
    //   opacity: 1,
    //   sizeAttenuation: true,
    //   color: "#ccffcc",
    // });
    // let mesh = new THREE.Points(bufferGeometry, material);
    // scene.add(mesh)
    // render.setSize(container.offsetWidth, container.offsetHeight);
    // render.render(scene,camera)
    // container.appendChild(render.domElement)
    // render.render(scene,camera)
    // console.log(render)
  },
};
</script>
<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
