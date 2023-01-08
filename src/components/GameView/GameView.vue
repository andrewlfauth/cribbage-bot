<script setup>
import { game } from '../../stores/game'
import ComputersHand from './ComputersHand.vue'
import Deck from './Deck.vue'
import Pegging from './Pegging.vue'
import PlayersHand from './PlayersHand.vue'
import Score from './Score.vue'
import TheCrib from './TheCrib.vue'

const props = defineProps({
  currentHand: Object,
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-between h-screen p-4 select-none"
  >
    <ComputersHand :cards-in-hand="currentHand.bot.hand" />
    <div class="flex w-full justify-between items-center">
      <Score />
      <Pegging v-if="game.currentHand.stage === 'peg'" />
      <Deck />
    </div>
    <PlayersHand :cards-in-hand="currentHand.user.hand" />
    <TheCrib />
  </div>
</template>
