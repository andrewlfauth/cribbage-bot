<script setup>
import { onMounted } from 'vue'
import { game, startPeggingStage } from '../../stores/game'
import Card from '../Card.vue'
import GoIndicator from './GoIndicator.vue'

onMounted(() => {
  startPeggingStage()
})
</script>

<template>
  <div class="relative w-[700px] h-[180px] border border-white rounded-md">
    <GoIndicator
      :show="
        (game.pegging.turn === 'user' && game.pegging.opponent === 'go') ||
        game.pegging.doubleGo
      "
      :player="'bot'"
    />
    <div class="flex -space-x-8">
      <Card v-for="card in game.pegging.cards" :card="card" />
    </div>
    <div
      class="absolute -top-32 -left-32 flex flex-col items-center justify-start bg-gradient-to-br from-slate-800 to-purple-900 px-2 py-4 rounded-md border-2 border-white text-white"
    >
      <span>Pegging count:</span>
      <span class="text-4xl font-semibold">{{ game.pegging.count }}</span>
    </div>
    <GoIndicator
      :show="
        (game.pegging.turn === 'bot' && game.pegging.opponent === 'go') ||
        game.pegging.doubleGo
      "
      :player="'user'"
    />
  </div>
</template>
