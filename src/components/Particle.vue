<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 1024 1024"
    fill="currentColor"
  >
    <path
      v-for="(path, i) in paths"
      :key="i"
      fill-rule="evenodd"
      :d="path"
      fill="#454B5"
    />
  </svg>
</template>

<script>
export default {
  props: {
    'paths': {
      type: [String, Array]
    },
    'size': {
      type: [Number, String],
      default: 32
    },
  },
}
</script>

<style lang="scss">
svg {
  display: block;
}
</style>
