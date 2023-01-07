<script setup>
import { ref } from 'vue'
import Card from './components/Card.vue'
import NewGameButton from './components/NewGameButton.vue'
import { Game } from './utils/game'

const currentGame = ref(null)

const startNewGame = () => {
  currentGame.value = new Game()
}
</script>

<template>
  <main
    style="
      background-image: url('https://res.cloudinary.com/dpnkrz8c8/image/upload/v1673046654/cribbage/uzrgmffjsrnto86lannl.jpg');
    "
    class="h-screen w-screen overflow-hidden bg-cover"
  >
    <div v-if="!currentGame">
      <NewGameButton @new-game="startNewGame" />
    </div>
    <div v-else></div>
  </main>
</template>
