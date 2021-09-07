<template>
  <div id="container"></div>
</template>

<script>
import {Main} from "../node_modules/gthree/dist/index.js"
export default {
  name: 'App',
  mounted(){
    const data = {
      nodes:[],
      edges:[]
    }
    const nodeLength = 5000
    const edgeLedgth = 1000
    for(let i=0;i<nodeLength;i++){
      data.nodes.push({
        id:i.toString(),
        name:'node'+i
      })
    }
    const TGraph = new Main('container')
    TGraph.data(data)
    TGraph.render();
  }
}
</script>
<style scoped>
  #container{
    width: 100%;
    height: 100%;
  }
</style>
