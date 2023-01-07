<script setup>
import CardBack from '../CardBack.vue'

const props = defineProps({
  cardsInHand: Array,
})
</script>

<template>
  <div class="flex mx-auto -space-x-14">
    <CardBack v-for="card in cardsInHand" :key="card" />
  </div>
</template>
