<script setup>
import Card from '../Card.vue'

const props = defineProps({
  cardsInHand: Array,
})
</script>

<template>
  <div class="flex mx-auto -space-x-20">
    <Card
      v-for="card in cardsInHand"
      :key="card"
      :suit="card.suit"
      :value="card.value"
    />
  </div>
</template>
