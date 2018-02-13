<template>
  <div id="app">
    <particle :particle="{ liga: 'particles' }" :zoom="true" :class="[ 'logo' ]" />
    <h1>Presslabs Particles</h1>
    <div class="input-wrapper">
      <input type="text" v-model="search" placeholder="Search particle.." class="input" @focus="zoomedParticle = null" />
    </div>
    <div class="particle-zoom" v-if="zoomedParticle">
      <particleCard :particle="zoomedParticle" :dark="dark"></particleCard>
      <label>
        <input type="checkbox" v-model="dark" name="dark" /> Switch to dark mode
      </label>
    </div>
    <particles :particles="filteredList" v-on:zoom="zoomParticle($event)" />
  </div>
</template>

<script>
import Particles from './components/Particles'
import ParticleCard from './components/ParticleCard'
import Particle from './components/Particle'
import particlesData from './resources/particles.json'

export default {
  data: function () {
    return {
      search: '',
      dark: false,
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
  components: { Particle, Particles, ParticleCard }
}
</script>

<style lang="scss">
$particles-font-path: "../fonts/" !default;
@import "./resources/particles";

i.particle {
  font-family: "Presslabs Particles";
  display: inline-block;
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  speak: none;
  text-decoration: inherit;
  text-transform: none;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
i.logo {
  width: 96px;
  height: 96px;
  margin: 0 auto;
  color: #2c3e50;
}
.input-wrapper {
  max-width: 500px;
  margin: 0 auto 40px;
}
.input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  box-shadow: none;
  box-sizing: inherit;
  height: 40px;
  outline: none;
  padding: 10px 8px;
  line-height: 24px;
  font-size: 18px;
  width: 100%;
}
.particle-zoom {
  margin: 40px auto;
  label {
    display: block;
    margin-top: 20px;
  }
}
</style>
