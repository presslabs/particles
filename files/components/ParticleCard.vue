<template>
  <div class="particle-card" :class="{ dark }">
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
  props: ['particle', 'dark'],
  data: function() {
    return {
      dark,
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
  color: #2c3e50;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(#000, .2);
  padding: 20px;
  margin: 0 auto;
  transition: all ease .15s;
}
.particle-card small {
  display: block;
}
.particle-card.dark {
  background: #2c3e50;
  color: #fff;
}
</style>
