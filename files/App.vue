<template>
  <div id="app">
    <particle particle="particles_alt" :size="128" :class="[ 'logo' ]" />
    <h1>Presslabs Particles</h1>
    <div class="input-wrapper">
      <input type="text" v-model="search" placeholder="Search particle.." class="input" @focus="zoomedParticle = null, currentIndex = null" />
    </div>
    <div class="input-wrapper size">
      <input type="range" v-model="size" min="16" max="96" name="size" /> Size: {{ size }}px
    </div>
    <div class="particles-show">
      <particles
        :particles="filteredList"
        :size="size"
        :index="currentIndex"
        v-on:zoom="zoomParticle($event)"
      />
      <div class="particle-zoom" v-if="zoomedParticle && showCard">
        <!-- <a href="#" @click.prevent="prev()"><particle particle="arrow_w" /></a> {{ currentIndex }} <a href="#" @click.prevent="next()"><particle particle="arrow_e" /></a> -->
        <particleCard
          :particle="zoomedParticle"
          :dark="dark"
          v-on:dark="switchDark"
          v-on:close="closeCard"
          v-on:prev="prev"
          v-on:next="next"
        ></particleCard>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Particles from './components/Particles'
import ParticleCard from './components/ParticleCard'
import ParticleIcon from './components/ParticleIcon'
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
      zoomedParticle: null,
      currentIndex: null,
    }
  },
  methods: {
    zoomParticle: function(data) {
      const { particle, index } = data
      this.currentIndex = index
      this.zoomedParticle = particle
      this.showCard = true
    },
    closeCard: function() {
      this.showCard = false
    },
    switchDark: function() {
      this.dark = !this.dark
    },
    next: function () {
      if (this.currentIndex < this.filteredList.length - 1) {
        this.currentIndex += 1
      }
      this.zoomedParticle = this.filteredList[this.currentIndex]
      this.showCard = true
    },
    prev: function () {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1
      }
      this.zoomedParticle = this.filteredList[this.currentIndex]
      this.showCard = true
    },
  },
  computed: {
    filteredList() {
      return this.particlesData.filter(particle => {
        return particle.liga.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  components: { Particle, ParticleIcon, Particles, ParticleCard, AppFooter }
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
  font-size: 128px;
  margin: 0 auto;
  color: $gray-1;
}
.input-wrapper {
  max-width: 500px;
  margin: 0 auto 40px;
  &.size {
    @media screen and (max-width: 480px) {
      display: none;
    }
    display: block;
  }
}
input[type="range"] {
  height: 24px;
  margin: 0;
  vertical-align: middle;
  margin-right: 10px;
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
    flex: 0 0 296px;
    @media screen and (min-width: 480px) {
      flex: 0 0 400px;
    }
    label {
      display: block;
      margin-top: 20px;
    }
  }
}
</style>
