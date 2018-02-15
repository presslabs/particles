<template>
  <div class="particle-card" :class="{ dark }">
    <a href="#" @click="toggleDark" class="dark">
      <particle :particle="{ liga: 'lightbulb' }"></particle>
    </a>
    <a href="#" @click="closeCard" class="close">
      <particle :particle="{ liga: 'delete' }"></particle>
    </a>
    <particle :particle="particle"></particle>
    <particle :particle="particle" :zoom="true"></particle>
    <particle-svg :size="256" :dark="dark" :particle="particle"></particle-svg>
    <p>
      <small>HTML Markup for ligature</small>
      <code>&lt;i class=&quot;particle&quot;&gt;{{ particle.liga }}&lt;/i&gt;</code>
    </p>
    <p>
      <small>HTML Markup for CSS <code>:before</code> method</small>
      <code>&lt;i class=&quot;particle {{ particle.liga }}&quot;&gt;&lt;/i&gt;</code>
    </p>
  </div>
</template>

<script>
import Particle from './Particle'
import ParticleSvg from './ParticleSvg'

export default {
  props: ['particle', 'dark'],
  methods: {
    toggleDark: function() {
      this.$emit('dark');
    },
    closeCard: function () {
      this.$emit('close');
    }
  },
  components: { Particle, ParticleSvg }
}
</script>

<style lang="scss">
@import "./variables";
@import "./colors";

.particle-card {
  text-align: left;
  background: #fff;
  color: $gray-1;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba($gray-1, .2);
  padding: 20px;
  transition: all ease .15s;
  position: sticky;
  top: 0px;
  small {
    display: block;
  }
  code {
    font-family: "Roboto Mono", monospace;
    font-size: 12px;
    color: $red-1;
  }
  &.dark {
    background: $gray-1;
    color: #fff;
    code {
      color: $teal-1;
    }
  }
  .close, .dark {
    position: absolute;
    top: 10px;
    right: 10px;
    text-decoration: none;
    color: $gray-5;
    &:hover {
      color: $secondColor;
    }
  }
  .dark {
    right: 40px;
  }
}
</style>
