<template>
  <div class="particle-card" :class="{ dark }">
    <a href="#" @click.prevent="closeCard" class="action close">
      Close
    </a>
    <p>
      <small>Icon name</small>
      <code class="icon-name">{{ particle.properties.name }}</code>
    </p>

    <div class="sizes">
      <particle :size="16" :paths="particle.icon.paths" />
      <particle :size="32" :paths="particle.icon.paths" />
    </div>

    <particle-svg :size="256" :dark="dark" :particle="particle"></particle-svg>
  </div>
</template>

<script>
import Particle from './Particle'
import ParticleSvg from './ParticleSvg'
import { camelCase } from 'lodash'

export default {
  props: ['particle', 'dark'],
  data () {
    return {
      camelCase,
    }
  },
  methods: {
    toggleDark: function() {
      this.$emit('dark');
    },
    closeCard: function () {
      this.$emit('close');
    },
    next: function() {
      this.$emit('next');
    },
    prev: function() {
      this.$emit('prev');
    },
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
  top: 100px;
  h2 {
    margin-top: 30px;
    small {
      color: $gray-4;
      font-size: 12px;
      display: block;
      font-weight: 400;
    }
  }
  .action, .nav {
    font-size: 14px;
  }
  .icons td {
    vertical-align: bottom;
    i {
      border: 1px solid rgba($gray-4, .2);
    }
  }
  .sizes {
    display: flex;
    svg {
      margin: 10px;
    }
  }
  small {
    display: block;
  }
  code {
    font-family: "Roboto Mono", monospace;
    font-size: 24px;
    color: $red-1;
  }
  &.dark {
    background: $gray-1;
    color: #fff;
    code {
      color: $teal-1;
    }
  }
  .next, .prev, .close, .dark {
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
  .prev {
    right: auto;
    left: 20px;
  }
  .next {
    right: auto;
    left: 50px;
  }
}
</style>
