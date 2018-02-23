<template>
  <i class="particle"><slot>{{ particle }}</slot></i>
</template>
<script>
export default { props: ['particle'] }
</script>
