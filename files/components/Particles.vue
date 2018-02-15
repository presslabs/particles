<template>
  <div class="particles-container">
    <particle-icon
      v-for="particle in particles"
      :key="particle.codepoint"
      :particle="particle"
      @click="zoom(particle)"
      :class="{ selected: particle === selected }"
      :style="{ fontSize: `${size}px` }"
    ></particle-icon>
  </div>
</template>

<script>
import ParticleIcon from './ParticleIcon'

export default {
  props: ['particles', 'size'],
  data () {
    return {
      zoomed: null,
      selected: null,
    }
  },
  methods: {
    zoom: function (particle) {
      this.$emit('zoom', particle);
      this.selected = particle
    }
  },
  components: { ParticleIcon },
}
</script>

<style lang="scss">
@import "./variables";
@import "./colors";

.particles-container {
  overflow: hidden;
  padding: 0 1px 1px 0;
  user-select: none;
  .selected i {
    background-color: $gray-1;
    color: #fff;
  }
  .particle {
    display: block;
    float: left;
    margin: 0 -1px -1px 0;
    box-shadow: inset 0 0 0 1px lighten($gray-1, 60%);
    @media screen and (max-width: 480px) {
      $cell: 32px;
      line-height: $cell !important;
      font-size: $cell*.75 !important;
      width: $cell !important;
      height: $cell !important;
      padding: 10px !important;
    }
    padding: 20px;
    cursor: pointer;
    &:hover {
      background: $blue-1;
      color: #fff;
    }
  }
}
</style>
