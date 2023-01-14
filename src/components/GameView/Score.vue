<script setup>
import { game } from '../../stores/game'
import TextSlider from '../TextSlider.vue'
</script>

<template>
  <div
    class="absolute px-4 pt-2 pb-3 bg-white border-2 border-gray-400 rounded-md top-4 right-4"
  >
    <span class="block text-sm font-semibold tracking-tight text-center"
      >Points</span
    >
    <div class="flex mt-2 space-x-2">
      <div class="flex flex-col items-center font-semibold text-red-500">
        <div
          class="w-16 text-center border border-gray-300 rounded shadow-inner shadow-gray-200"
        >
          <TextSlider
            :reactive-text="game.score.user"
            :text-class="'text-3xl'"
          />
        </div>
        <span class="mt-1 text-sm tracking-tight">You</span>
      </div>

      <div class="flex flex-col items-center font-semibold text-blue-500">
        <div
          class="w-16 text-center border border-gray-300 rounded shadow-inner shadow-gray-200"
        >
          <TextSlider
            :reactive-text="game.score.bot"
            :text-class="'text-3xl'"
          />
        </div>
        <span class="mt-1 text-sm tracking-tight text-blue-500">Bot</span>
      </div>
    </div>
  </div>
</template>
