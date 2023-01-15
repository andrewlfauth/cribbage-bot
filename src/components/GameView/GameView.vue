<script setup>
import { game } from '../../stores/game'
import ComputersHand from './ComputersHand.vue'
import Deck from './Deck.vue'
import Pegging from './Pegging.vue'
import PeggingPointsMessage from './PeggingPointsMessage.vue'
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
    <Score />
    <div class="h-[180px]">
      <ComputersHand :cards-in-hand="currentHand.bot.hand" />
    </div>
    <div class="relative flex w-full">
      <Deck />
      <Pegging v-if="game.currentHand.stage === 'peg'" />
      <div class="absolute left-0 right-0 z-10 mx-auto w-fit">
        <PeggingPointsMessage />
      </div>
    </div>
    <div class="min-h-[180px]">
      <PlayersHand :cards-in-hand="currentHand.user.hand" />
      <TheCrib />
    </div>
  </div>
</template>
