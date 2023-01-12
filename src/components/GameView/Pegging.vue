<script setup>
import { watchEffect, watch, onMounted } from 'vue'
import { game, startPeggingStage } from '../../stores/game'
import Card from '../Card.vue'

onMounted(() => {
  startPeggingStage()
})
</script>

<template>
  <p class="absolute top-12 left-0 font-semibold pl-2">
    {{ game.pegging.turn }}'s turn
  </p>
  <p class="absolute top-0 left-0 font-semibold pl-2">
    {{ game.pegging.opponent }}
  </p>
  <div class="relative w-[700px] h-[180px] border border-white rounded-md">
    <div class="flex -space-x-8">
      <Card v-for="card in game.pegging.cards" :card="card" />
    </div>
    <div
      class="absolute -top-32 -left-32 flex flex-col items-center justify-start bg-gradient-to-br from-slate-800 to-purple-900 px-2 py-4 rounded-md border-2 border-white text-white"
    >
      <span>Pegging count:</span>
      <span class="text-4xl font-semibold">{{ game.pegging.count }}</span>
    </div>
  </div>
</template>
