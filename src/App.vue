<script setup>
import { ref } from 'vue'
import GameView from './components/GameView/GameView.vue'
import NewGameButton from './components/NewGameButton.vue'
import { game, dealHand } from './stores/game'

const currentGame = ref(null)

const startNewGame = () => {
  currentGame.value = true
  dealHand()
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
      <GameView :current-hand="game.currentHand" />
    </div>
  </main>
</template>
