<script setup>
import CardBack from '../CardBack.vue'
import Card from '../Card.vue'
import { game } from '../../stores/game'
</script>

<template>
  <div>
    <div class="w-fit text-center font-medium relative">
      <CardBack />
      <div
        v-if="game.currentHand.stage === 'peg' && game.currentHand.cutCard"
        class="absolute top-1 right-1"
      >
        <Card :card="game.currentHand.cutCard" />
      </div>
      <span class="mt-2 block">Deck</span>
    </div>
  </div>
</template>
