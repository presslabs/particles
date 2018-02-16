<template>
  <div class="particle-card" :class="{ dark }">
    <a href="#" @click.prevent="prev" class="nav prev">
      <particle particle="arrow_w"></particle>
    </a>
    <a href="#" @click.prevent="next" class="nav next">
      <particle particle="arrow_e"></particle>
    </a>


    <a href="#" @click.prevent="toggleDark" class="action dark">
      <particle :particle="dark ? 'lightbulb_on' : 'lightbulb_off'"></particle>
    </a>
    <a href="#" @click.prevent="closeCard" class="action close">
      <particle particle="delete"></particle>
    </a>
    <h2><small>Particle name:</small>{{ particle.liga }}</h2>
    <table>
      <tr class="icons">
        <td>
          <particle :particle="particle.liga" class="zoom-1x"></particle>
        </td>
        <td>
          <particle :particle="particle.liga" class="zoom-2x"></particle>
        </td>
        <td>
          <particle :particle="particle.liga" class="zoom-4x"></particle>
        </td>
        <td>
          <particle :particle="particle.liga" class="zoom-8x"></particle>
        </td>
      </tr>
      <tr class="sizes">
        <td>
          <small>16px</small>
        </td>
        <td>
          <small>32px</small>
        </td>
        <td>
          <small>64px</small>
        </td>
        <td>
          <small>128px</small>
        </td>
      </tr>
    </table>

    <particle-svg :size="256" :dark="dark" :particle="particle"></particle-svg>
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
import ParticleSvg from './ParticleSvg'

export default {
  props: ['particle', 'dark'],
  methods: {
    toggleDark: function() {
      this.$emit('dark');
    },
    closeCard: function () {
      this.$emit('close');
    },
    next: function() {
      this.$emit('next');
    },
    prev: function() {
      this.$emit('prev');
    },
  },
  components: { Particle, ParticleSvg }
}
</script>

<style lang="scss">
@import "./variables";
@import "./colors";

.particle-card {
  text-align: left;
  background: #fff;
  color: $gray-1;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba($gray-1, .2);
  padding: 20px;
  transition: all ease .15s;
  position: sticky;
  top: 0px;
  h2 {
    margin-top: 30px;
    small {
      color: $gray-4;
      font-size: 12px;
      display: block;
      font-weight: 400;
    }
  }
  .action, .nav {
    font-size: 24px;
  }
  .icons td {
    vertical-align: bottom;
    i {
      border: 1px solid rgba($gray-4, .2);
    }
  }
  .sizes {
    small {
      color: $gray-4;
      font-size: 12px;
    }
  }
  small {
    display: block;
  }
  code {
    font-family: "Roboto Mono", monospace;
    font-size: 12px;
    color: $red-1;
  }
  &.dark {
    background: $gray-1;
    color: #fff;
    code {
      color: $teal-1;
    }
  }
  .next, .prev, .close, .dark {
    position: absolute;
    top: 10px;
    right: 10px;
    text-decoration: none;
    color: $gray-5;
    &:hover {
      color: $secondColor;
    }
  }
  .dark {
    right: 40px;
  }
  .prev {
    right: auto;
    left: 20px;
  }
  .next {
    right: auto;
    left: 50px;
  }
  .zoom-1x {
    font-size: 16px;
  }
  .zoom-2x {
    font-size: 32px;
  }
  .zoom-4x {
    font-size: 64px;
  }
  .zoom-8x {
    font-size: 128px;
  }
}
</style>
