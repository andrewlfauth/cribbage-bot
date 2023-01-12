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
  </div>
</template>
