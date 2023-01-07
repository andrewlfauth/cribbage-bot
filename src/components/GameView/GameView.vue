<script setup>
import ComputersHand from './ComputersHand.vue'
import PlayersHand from './PlayersHand.vue'

const props = defineProps({
  currentHand: Object,
})
</script>

<template>
  <div class="flex flex-col items-center p-4 select-none">
    <ComputersHand :cards-in-hand="currentHand.bot.hand" />
    <PlayersHand :cards-in-hand="currentHand.user.hand" />
  </div>
</template>
