<script setup>
import { ref } from 'vue'
import { game } from '../../stores/game'
import Card from '../Card.vue'

const turn = ref(game.dealer === 'bot' ? 'user' : 'bot')
</script>

<template>
  <div class="relative w-[700px] h-[200px] border border-white rounded-md">
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
