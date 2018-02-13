<template>
  <i class="particle" :class="{ zoom: zoom }" @click="handleClick">
    {{ particle.liga }}
  </i>
</template>

<script>
export default {
  props: ['particle', 'zoom'],
  methods: {
  	handleClick() {
    	this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
.particle {
  font-size: 24px;
  display: block;
  width: 24px;
  height: 24px;
  margin: 5px;
}
.zoom {
  font-size: 96px;
}
</style>
