<script setup>
import { game } from '../../stores/game'
</script>

<template>
  <div class="bg-white rounded-md px-4 pt-2 pb-4 h-min absolute top-6 right-6">
    <h2 class="text-center font-medium text-gray-500 text-sm">Points</h2>
    <div class="flex space-x-6">
      <div class="text-blue-900 text-center font-semibold">
        <p class="text-xl">You</p>
        <span class="text-5xl">{{ game.score.user }}</span>
      </div>
      <div class="text-red-900 text-center font-semibold">
        <p class="text-xl">Bot</p>
        <span class="text-5xl">{{ game.score.bot }}</span>
      </div>
    </div>
  </div>
</template>
