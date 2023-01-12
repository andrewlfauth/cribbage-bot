<script setup>
const props = defineProps({
  player: String,
  show: Boolean,
})
</script>

<template>
  <div
    :class="{
      '-top-16': player == 'bot',
      '-bottom-16': player == 'user',
      'opacity-100': props.show,
      'opacity-0': !props.show,
    }"
    class="absolute left-0 right-0 mx-auto w-20 bg-black border-2 border-white rounded-md text-white text-center text-2xl py-1 duration-300"
  >
    Go
  </div>
</template>
