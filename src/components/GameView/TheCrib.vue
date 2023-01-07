<script setup>
import { game } from '../../stores/game'
import CardBack from '../CardBack.vue'
</script>

<template>
  <div
    :class="{
      'top-0': game.dealer === 'bot',
      'bottom-0': game.dealer === 'user',
    }"
    class="w-[130px] h-[180px] border-white border-2 my-10 rounded-md font-semibold text-white flex items-center justify-center text-lg text-center tracking-wider left-4 absolute"
  >
    <span v-if="game.currentHand.crib.length !== 4">
      {{ game.dealer === 'user' ? 'Your' : 'Opponents' }} Crib
    </span>
    <CardBack v-else />
  </div>
</template>
