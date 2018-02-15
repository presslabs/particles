<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      viewBox="0 0 64 64"
      fill="black"
      fill-rule="nonzero"
      class="grid"
    >
      <rect width="64" height="64" fill="none" stroke="#888888" stroke-width=".2" :stroke-opacity="dark ? .4 : .5" />
      <path stroke-width=".1" fill="none" stroke="#888888" :stroke-opacity="dark ? .4 : .5" d="M8,0V64M16,0V64M24,0V64M32,0V64M40,0V64M48,0V64M56,0V64M0,56H64M0,48H64M0,40H64M0,32H64M0,24H64M0,16H64M0,8H64"/>
      <path
        :stroke-opacity="dark ? .2 : .3"
        fill="none"
        stroke-width=".1"
        stroke="#888888" d="M1,0V64M2,0V64M3,0V64M4,0V64M5,0V64M6,0V64M7,0V64M9,0V64M10,0V64M11,0V64M12,0V64M13,0V64M14,0V64M15,0V64M17,0V64M18,0V64M19,0V64M20,0V64M21,0V64M22,0V64M23,0V64M25,0V64M26,0V64M27,0V64M28,0V64M29,0V64M30,0V64M31,0V64M33,0V64M34,0V64M35,0V64M36,0V64M37,0V64M38,0V64M39,0V64M41,0V64M42,0V64M43,0V64M44,0V64M45,0V64M46,0V64M47,0V64M49,0V64M50,0V64M51,0V64M52,0V64M53,0V64M54,0V64M55,0V64M57,0V64M58,0V64M59,0V64M60,0V64M61,0V64M62,0V64M63,0V64M0,63H64M0,62H64M0,61H64M0,60H64M0,59H64M0,58H64M0,57H64M0,55H64M0,54H64M0,53H64M0,52H64M0,51H64M0,50H64M0,49H64M0,47H64M0,46H64M0,45H64M0,44H64M0,43H64M0,42H64M0,41H64M0,39H64M0,38H64M0,37H64M0,36H64M0,35H64M0,34H64M0,33H64M0,31H64M0,30H64M0,29H64M0,28H64M0,27H64M0,26H64M0,25H64M0,23H64M0,22H64M0,21H64M0,20H64M0,19H64M0,18H64M0,17H64M0,15H64M0,14H64M0,13H64M0,12H64M0,11H64M0,10H64M0,9H64M0,7H64M0,6H64M0,5H64M0,4H64M0,3H64M0,2H64M0,1H64" />
      <path :fill="dark ? '#ffffff' : '#2C3656'" stroke="#009EFB" stroke-width=".2" fill-opacity=".2" :stroke-opacity="dark ? .3 : .5" :d="icons[particle.liga.replace(/_/g, '-')]" />
    </svg>
  </div>
</template>

<script>
import icons from '../resources/icons.json'

export default {
  props: ['particle', 'size', 'dark'],
  data () {
    return {
      icons: icons,
    }
  }
}
</script>

<style lang="scss">
.grid {
  display: block;
  margin: 20px 0;
}
</style>
