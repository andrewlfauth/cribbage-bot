<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { game, startPeggingStage } from '../../stores/game'
import Card from '../Card.vue'
import GoIndicator from './GoIndicator.vue'

onMounted(() => {
  startPeggingStage()
})
const spentCards = ref(null)

watchEffect(() => {
  if (game.pegging.spentCards?.length) {
    spentCards.value.classList.add('right-0')
  }
})
</script>

<template>
  <div class="relative ml-[250px] w-full h-[180px] rounded-md flex border">
    <GoIndicator
      :show="
        (game.pegging.turn === 'user' && game.pegging.opponent === 'go') ||
        game.pegging.doubleGo
      "
      :player="'bot'"
    />
    <div class="flex -space-x-20">
      <Card v-for="card in game.pegging.cards" :card="card" />
    </div>
    <div ref="spentCards" class="flex -space-x-20 duration-500 absolute">
      <Card
        v-for="card in game.pegging.spentCards?.length
          ? game.pegging.spentCards
          : game.pegging.cards"
        :card="card"
      />
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
