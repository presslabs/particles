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

$cell: 48px;
.particles-container {
  overflow: hidden;
  padding: 0 1px 1px 0;
  user-select: none;
  .particle {
    display: block;
    width: $cell;
    height: $cell;
    float: left;
    margin: 0 -1px -1px 0;
    line-height: $cell;
    font-size: $cell*.75;
    box-shadow: inset 0 0 0 1px lighten($gray-1, 60%);
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
