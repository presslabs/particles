<template>
  <div id="app">
    <div class="topbar">
      <div class="bar-section branding">
        <a href="/particles/">
          <particle :class="[ 'logo' ]">particles_alt</particle> <span>Presslabs Particles</span>
        </a>
      </div>
      <div class="bar-section input-wrapper search">
        <input type="text" v-model="search" placeholder="Search particle.." class="input" @focus="zoomedParticle = null, currentIndex = null" />
      </div>
      <div class="bar-section input-wrapper size">
        <input type="range" v-model="size" min="16" max="96" name="size" /> Size: {{ size }}px
      </div>
      <div class="bar-section github">
        <a href="https://github.com/PressLabs/particles" target="_blank">
          <particle :class="[ 'github' ]" name="github"></particle> <span>Github Project</span>
        </a>
      </div>
    </div>
    <div class="particles-show">
      <particles
        :particles="filteredList"
        :size="size"
        :index="currentIndex"
        v-on:zoom="zoomParticle($event)"
      />
      <div class="particle-zoom" v-if="zoomedParticle && showCard">
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
import particlesData from '../dist/icons/particles.json'

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

$particles-font-path: "../dist/fonts/" !default;
@import "../dist/style/particles";

#app {
  font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $gray-1;
  padding: 140px 20px 0;
  @media screen and (min-width: 768px) {
    padding: 100px 20px 0;
  }
}
.topbar {
  background: $gray-1;
  display: flex;
  position: absolute;
  @media screen and (min-width: 768px) {
    position: fixed;
  }
  padding: 0 20px;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  .bar-section {
    flex: 1;
    padding: 0 10px;
    @media screen and (min-width: 768px) {
      border-right: 1px solid $gray-2;
      &:last-child {
        border-right: none;
      }
    }
  }
}
.bar-section.branding {
  text-align: left;
  flex: 0 0 30px;
  @media screen and (min-width: 768px) {
    flex: 0 0 200px;
  }
  a {
    display: block;
    padding: 10px 0;
    color: #fff;
    text-decoration: none;
  }
  span {
    font-weight: bold;
    line-height: 40px;
    display: none;
    @media screen and (min-width: 768px) {
      display: inline;
    }
  }
  i.logo {
    font-size: 40px;
    margin: 0;
    color: $gray-8;
    float: left;
    vertical-align: middle;
    @media screen and (min-width: 768px) {
      margin: 0 10px 0 0;
    }
  }
}
.bar-section.github {
  text-align: right;
  flex: 0 0 30px;
  @media screen and (min-width: 768px) {
    flex: 0 0 200px;
  }
  a {
    color: #fff;
    text-decoration: none;
    display: block;
    padding: 18px;
    display: flex;

    span {
      line-height: 24px;
      display: none;
      @media screen and (min-width: 768px) {
        display: inline;
      }
    }

    i {
      width: 24px;
      margin: 0;
      display: block;
      font-size: 24px;
      @media screen and (min-width: 768px) {
        margin-right: 10px;
      }
    }

    &:hover {
      color: $blue-3;
    }
  }
}
.input-wrapper {
  // max-width: 500px;
  color: #fff;
  &.size {
    @media screen and (max-width: 768px) {
      display: none;
    }
    display: block;
    padding: 18px 20px;
    text-align: left;
  }
  &.search {
    @include particle('search');
    @include absolute(20px, 20px);
    @include particle-size(20px);
    &:before {
      color: $gray-3;
    }
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
  border: none;
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  box-sizing: border-box;
  height: 60px;
  outline: none;
  padding: 10px 8px;
  line-height: 24px;
  font-size: 18px;
  width: 100%;
  color: #fff;
  padding-left: 40px;
  &::placeholder {
    color: $gray-5;
  }
}
.particles-show {
  display: flex;
  flex-direction: column-reverse;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
  .particles-container {
    flex: 1;
  }
  .particle-zoom {
    flex: 0 0 296px;
    margin-bottom: 20px;
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
