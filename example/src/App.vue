<template>
  <div id="container"></div>
</template>

<script>
import {Main} from "../node_modules/gthree/dist/index.js"
export default {
  name: 'App',
  mounted(){
    const main = new Main('container')
    console.log(main)

  }
}
</script>
<style scoped>
  #container{
    width: 600px;
    height: 600px;
  }
</style>
