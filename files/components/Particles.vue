<template>
  <div class="particles-container">
    <particle
      v-for="particle in particles"
      :key="particle.codepoint"
      :particle="particle"
      @click="zoom(particle)"
      :class="{ selected: particle === selected }"
      :style="{ fontSize: `${size*.75}px`, lineHeight: `${size}px`, width: `${size}px`, height: `${size}px` }"
    ></particle>
  </div>
</template>

<script>
import Particle from './Particle'

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
  components: { Particle },
}
</script>

<style lang="scss">
@import "./variables";
@import "./colors";

.particles-container {
  overflow: hidden;
  padding: 0 1px 1px 0;
  user-select: none;
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
    &.selected {
      background: $gray-1;
      color: #fff;
    }
  }
}
</style>
