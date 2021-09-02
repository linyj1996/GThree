<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script>
import * as GThree from "../node_modules/gthree/dist/index.js"
export default {
  name: 'App',
  mounted(){
    console.log(GThree)
  }
}
</script>
