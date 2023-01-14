<script setup>
import { onUpdated, ref } from 'vue'
import { game } from '../stores/game'
import { gsap } from 'gsap'

const props = defineProps(['initalText', 'reactiveText', 'textClass'])

const container = ref(null)
const displayed = ref(null)
const next = ref(null)

let startingText = ref(props.reactiveText)

onUpdated(() => {
  let tl = gsap.timeline()
  tl.to(container.value, { y: '50%' })
  tl.add(() => {
    startingText.value = props.reactiveText
  })
  tl.to(container.value, { y: '0%', duration: 0 }, '+=.1')
})
</script>

<template>
  <span className="relative inline-flex overflow-hidden">
    <span class="text-transparent" :class="props.textClass" aria-hidden>
      {{ reactiveText }}
    </span>
    <span
      ref="container"
      className="absolute top-0 left-0 overflow-hidden text-center sm:text-left text-opacity-80 text-4xl whitespace-nowrap -translate-y-[50%]"
    >
      <span ref="displayed" class="block" :class="props.textClass">{{
        props.reactiveText
      }}</span>
      <span ref="next" class="block" :class="props.textClass">{{
        props.initalText || startingText
      }}</span>
    </span>
  </span>
</template>
