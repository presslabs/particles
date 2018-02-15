<template>
  <div @click="handleClick">
    <particle :particle="particle.liga"></particle>
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
