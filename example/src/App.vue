<template>
  <div id="container"></div>
</template>

<script>
import * as GThree from "../node_modules/gthree/dist/main.js"
export default {
  name: 'App',
  mounted(){
    // const data = {
    //   nodes:[],
    //   edges:[]
    // }
    // const nodeLength = 5000
    // const edgeLedgth = 1000
    // for(let i=0;i<nodeLength;i++){
    //   data.nodes.push({
    //     id:i.toString(),
    //     name:'node'+i
    //   })
    // }
    // const TGraph = new GThree.Main('container')
    // TGraph.data(data)
    // TGraph.render();
    console.log(GThree)
  }
}
</script>
<style scoped>
  #container{
    width: 100%;
    height: 100%;
  }
</style>
