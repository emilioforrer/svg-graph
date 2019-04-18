<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <svg-layout>
      
    </svg-layout>
  </div>
</template>

<script>
import SvgLayout from './components/SVG/Layout.vue'

export default {
  name: 'app',
  components: {
    'svg-layout': SvgLayout
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
