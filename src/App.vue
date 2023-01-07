<script setup>
import { ref } from 'vue'
import Card from './components/Card.vue'
import GameView from './components/GameView/GameView.vue'
import NewGameButton from './components/NewGameButton.vue'
import { Game } from './utils/game'

const currentGame = ref(null)
const currentHand = ref()

const startNewGame = () => {
  currentGame.value = new Game()
  currentGame.value.dealHand()
  currentHand.value = currentGame.value.currentHand
}
</script>

<template>
  <main
    style="
      background-image: url('https://res.cloudinary.com/dpnkrz8c8/image/upload/v1673046654/cribbage/uzrgmffjsrnto86lannl.jpg');
    "
    class="w-screen h-screen overflow-hidden bg-cover"
  >
    <div v-if="!currentGame">
      <NewGameButton @new-game="startNewGame" />
    </div>
    <div v-else>
      <GameView :current-hand="currentHand" />
    </div>
  </main>
</template>
