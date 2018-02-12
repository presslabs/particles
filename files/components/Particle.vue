<template>
  <div class="particle">
    <h2>Zoom: {{ zoomed }}</h2>
    <i
      :class="{ 'particle': true, 'zoom': zoomed === particle.liga }"
      v-for="particle in particles"
      @click="zoom(particle)"
    >{{ particle.liga }}</i>
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: ['particles'],
  data () {
    return {
      zoomed: null,
    }
  },
  methods: {
    zoom: function (particle) {
      this.zoomed = particle.liga
    }
  }
}
</script>

<style type="scss">
.zoom {
  font-size: 48px;
}
</style>
