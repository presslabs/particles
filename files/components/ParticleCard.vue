<template>
  <div class="particle-card" @click="toggleDark()" :class="{ dark }">
    <particle :particle="particle"></particle>
    <particle :particle="particle" :zoom="true"></particle>
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

export default {
  props: ['particle'],
  data: function() {
    return {
      dark: false,
    }
  },
  methods: {
    toggleDark: function() {
      this.dark = !this.dark
    }
  },
  components: { Particle }
}
</script>

<style scoped>
.particle-card {
  max-width: 400px;
  text-align: left;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0 , 0, .1);
  padding: 20px;
  margin: 40px auto 80px;
}
.particle-card small {
  display: block;
}
.particle-card.dark {
  background: #222;
  color: #fff;
}
</style>
