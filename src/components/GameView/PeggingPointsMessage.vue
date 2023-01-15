<script setup>
import { ref, watchEffect, onUpdated } from 'vue'
import { game } from '../../stores/game'
import { gsap } from 'gsap'

const el = ref(null)

onUpdated(() => {
  let tl = gsap.timeline()
  tl.to(el.value, { opacity: 1, y: -50, duration: 0.3 })
  tl.to(el.value, { opacity: 0, y: 0, duration: 0 }, '+=.7')
})
</script>

<template>
  <div
    ref="el"
    class="px-4 py-1 text-xl font-medium text-white bg-red-500 border-2 border-white rounded-full opacity-0 whitespace-nowrap"
  >
    {{ game.pegging.pointsMessage }}
  </div>
</template>
