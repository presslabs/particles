<template>
  <div id="app">
    <particle :particles="particles" />
  </div>
</template>

<script>
import Particle from './components/Particle'
import particles from './resources/particles.json'

export default {
  data: () => {
    return {
      particles
    }
  },
  components: { Particle }
}
</script>

<style type="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
