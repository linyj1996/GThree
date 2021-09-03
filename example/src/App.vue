<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script>
import {Main} from "../node_modules/gthree/dist/index.js"
export default {
  name: 'App',
  mounted(){
    const main = new Main('qq')
    console.log(main)

  }
}
</script>
