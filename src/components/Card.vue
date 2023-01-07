<script setup>
import { ref } from 'vue'
import { game } from '../stores/game'

const props = defineProps({
  card: Object,
  isSelectedForCrib: Boolean,
})

// const card = { suit: props.card.suit, value: props.value, count: props.count }

const color = ref(
  props.card.suit === '♥' || props.card.suit === '♦'
    ? 'color: red;'
    : 'color: black;'
)

const emit = defineEmits(['selectForCrib'])

const handleClick = () => {
  switch (game.currentHand.stage) {
    case 'discard':
      return emit('selectForCrib', props.card)
    default:
      return
  }
}
</script>

<template>
  <div
    :style="isSelectedForCrib && 'transform: scale(1.1);'"
    @click="handleClick"
    class="relative flex items-center justify-center w-[130px] p-4 bg-white border border-black rounded-md h-[180px] origin-bottom duration-100"
  >
    <span :style="color" class="absolute text-3xl top-12 left-4">{{
      props.card.suit
    }}</span>
    <span
      :style="color"
      class="absolute text-3xl -translate-y-1 bottom-12 right-4"
      >{{ props.card.suit }}</span
    >

    <span :style="color" class="text-8xl">{{ props.card.suit }}</span>

    <span class="absolute text-5xl font-bold top-1 left-2">{{
      props.card.value
    }}</span>
    <span class="absolute text-5xl font-bold rotate-180 bottom-1 right-2">{{
      props.card.value
    }}</span>
  </div>
</template>
