<script setup>
const emit = defineEmits(['new-game'])
</script>

<template>
  <button
    @click="emit('new-game')"
    class="w-52 py-4 rounded-md bg-blue-500 text-3xl font-semibold text-white tracking-tight border absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto"
  >
    New Game
  </button>
</template>
