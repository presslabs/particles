<template>
  <div @click="handleClick" class="particle" :data-name="particle.properties.name">
    <particle :paths="particle.icon.paths" :size="size" />
  </div>
</template>

<script>
import Particle from './Particle'

export default {
  props: ['particle', 'size'],
  methods: {
    handleClick() {
      this.$emit('click')
    }
  },
  components: { Particle }
}
</script>

<style media="screen" lang="scss">
  .particle {
    svg {
      fill: #5C6369;
    }

    &:hover {
      background: #EDEFF0;

      svg {
        fill: #454B51;
      }
    }
  }
</style>
