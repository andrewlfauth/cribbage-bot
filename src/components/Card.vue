<script setup>
import { ref } from 'vue'

const props = defineProps({
  suit: String,
  value: String,
})

const color = ref(props.suit === '♥' || props.suit === '♦' ? 'color: red;' : '')
</script>

<template>
  <div
    class="w-40 h-60 border border-black rounded-md p-4 bg-white relative flex items-center justify-center"
  >
    <span :style="color" class="top-12 left-4 absolute text-3xl">{{
      props.suit
    }}</span>
    <span
      :style="color"
      class="bottom-12 -translate-y-1 right-4 absolute text-3xl"
      >{{ props.suit }}</span
    >

    <span :style="color" class="text-8xl">{{ props.suit }}</span>

    <span class="absolute top-1 left-2 font-bold text-5xl">{{
      props.value
    }}</span>
    <span class="absolute bottom-1 right-2 font-bold text-5xl rotate-180">{{
      props.value
    }}</span>
  </div>
</template>
