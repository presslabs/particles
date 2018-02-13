<template>
  <div class="particles-container">
    <particle
      v-for="particle in particles"
      :key="particle.codepoint"
      :particle="particle"
      @click="zoom(particle)"
    ></particle>
  </div>
</template>

<script>
import Particle from './Particle'

export default {
  props: ['particles'],
  data () {
    return {
      zoomed: null,
    }
  },
  methods: {
    zoom: function (particle) {
      this.$emit('zoom', particle);
    }
  },
  components: { Particle },
}
</script>

<style lang="scss">
</style>
