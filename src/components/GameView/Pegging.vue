<script setup>
import { ref } from 'vue'
import { game } from '../../stores/game'

const turn = ref(game.dealer === 'bot' ? 'user' : 'bot')
</script>

<template>
  <div class="w-[700px] h-[200px] border border-white rounded-md"></div>
</template>
