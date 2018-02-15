<template>
  <div id="app">
    <particle :particle="{ liga: 'particles_alt' }" :zoom="true" :class="[ 'logo' ]" />
    <h1>Presslabs Particles</h1>
    <div class="input-wrapper">
      <input type="text" v-model="search" placeholder="Search particle.." class="input" @focus="zoomedParticle = null" />
    </div>
    <div class="input-wrapper">
      <input type="range" v-model="size" min="16" max="96" name="size" /> Size: {{ size }}px
    </div>
    <div class="particles-show">
      <particles :particles="filteredList" :size="size" v-on:zoom="zoomParticle($event)" />
      <div class="particle-zoom" v-if="zoomedParticle && showCard">
        <particleCard :particle="zoomedParticle" :dark="dark" v-on:dark="switchDark" v-on:close="closeCard"></particleCard>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Particles from './components/Particles'
import ParticleCard from './components/ParticleCard'
import Particle from './components/Particle'
import AppFooter from './components/Footer'
import particlesData from './resources/particles.json'

export default {
  data: function () {
    return {
      search: '',
      size: 32,
      dark: false,
      showCard: false,
      particlesData,
      zoomedParticle: null
    }
  },
  methods: {
    zoomParticle: function(particle) {
      this.zoomedParticle = particle
      this.showCard = true
    },
    closeCard: function() {
      this.showCard = false
    },
    switchDark: function() {
      this.dark = !this.dark
    },
  },
  computed: {
    filteredList() {
      return this.particlesData.filter(particle => {
        return particle.liga.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  components: { Particle, Particles, ParticleCard, AppFooter }
}
</script>

<style lang="scss">
@import "./components/variables";
@import "./components/colors";

#app {
  font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $gray-1;
  margin-top: 60px;
}
i.logo {
  width: 96px;
  height: 96px;
  margin: 0 auto;
  color: $gray-1;
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
  background: #fff;
  border-radius: 3px;
  box-shadow: none;
  box-sizing: border-box;
  height: 40px;
  outline: none;
  padding: 10px 8px;
  line-height: 24px;
  font-size: 18px;
  width: 100%;
}
.particles-show {
  display: flex;
  .particles-container {
    flex: 1;
  }
  .particle-zoom {
    flex: 0 0 400px;
    label {
      display: block;
      margin-top: 20px;
    }
  }
}
</style>
