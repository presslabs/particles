<template>
  <div id="app">
    <h1>Presslabs Particles</h1>
    <input type="text" v-model="search" placeholder="Search particle.."/>
    <particleCard v-if="zoomedParticle" :particle="zoomedParticle"></particleCard>
    <particles :particles="filteredList" v-on:zoom="zoomParticle($event)" />
  </div>
</template>

<script>
import Particles from './components/Particles'
import ParticleCard from './components/ParticleCard'
import particlesData from './resources/particles.json'

export default {
  data: function () {
    return {
      search: '',
      particlesData,
      zoomedParticle: null
    }
  },
  methods: {
    zoomParticle: function (particle) {
      this.zoomedParticle = particle
    }
  },
  computed: {
    filteredList() {
      return this.particlesData.filter(particle => {
        return particle.liga.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  components: { Particles, ParticleCard }
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
