<script setup>
import { ref } from 'vue'
import { game } from '../stores/game'

const props = defineProps({
  suit: String,
  value: String,
  isSelectedForCrib: Boolean,
})

const card = { suit: props.suit, value: props.value }

const color = ref(
  props.suit === '♥' || props.suit === '♦' ? 'color: red;' : 'color: black;'
)

const emit = defineEmits(['selectForCrib'])

const handleClick = () => {
  switch (game.currentHand.stage) {
    case 'discard':
      return emit('selectForCrib', card)
    default:
      return
  }
}
</script>

<template>
  <div
    :style="isSelectedForCrib && 'transform: scale(1.1);'"
    @click="handleClick"
    class="relative flex items-center justify-center w-40 p-4 bg-white border border-black rounded-md h-60 origin-bottom duration-100"
  >
    <span :style="color" class="absolute text-3xl top-12 left-4">{{
      props.suit
    }}</span>
    <span
      :style="color"
      class="absolute text-3xl -translate-y-1 bottom-12 right-4"
      >{{ props.suit }}</span
    >

    <span :style="color" class="text-8xl">{{ props.suit }}</span>

    <span class="absolute text-5xl font-bold top-1 left-2">{{
      props.value
    }}</span>
    <span class="absolute text-5xl font-bold rotate-180 bottom-1 right-2">{{
      props.value
    }}</span>
  </div>
</template>
