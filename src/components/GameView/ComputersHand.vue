<script setup>
import CardBack from '../CardBack.vue'
import { watch, ref, watchEffect } from 'vue'
import { game } from '../../stores/game'

const props = defineProps({
  cardsInHand: Array,
})
</script>

<template>
  <div class="flex flex-col items-center relative">
    <div class="flex mx-auto -space-x-14">
      <CardBack v-for="card in cardsInHand" :key="card" />
    </div>
    <!-- <div
      v-if="showGo"
      class="text-2xl font-semibold px-6 py-2 rounded-md bg-gradient-to-b from-pink-400 to-purple-300 border-2 border-black absolute top-44 mt-4"
    >
      Go
    </div> -->
  </div>
</template>
