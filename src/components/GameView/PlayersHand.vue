<script setup>
import { ref, computed } from 'vue'
import { objectsEqual } from '../../utils/helpers'
import { assignToCrib, game, playCard } from '../../stores/game'
import Card from '../Card.vue'

const props = defineProps({
  cardsInHand: Array,
})

const cardsInOrder = computed(() =>
  props.cardsInHand.sort((a, b) => a.order - b.order)
)

const selectedForCrib = ref([])
let showGo = ref(false)

const handleCribSelection = (card) => {
  const alreadySelected = selectedForCrib.value.some((c) =>
    objectsEqual(c, card)
  )

  if (selectedForCrib.value.length === 2) {
    if (alreadySelected) {
      selectedForCrib.value = selectedForCrib.value.filter(
        (c) => !objectsEqual(c, card)
      )
    } else return
  } else if (alreadySelected) {
    selectedForCrib.value = selectedForCrib.value.filter(
      (c) => !objectsEqual(c, card)
    )
  } else {
    selectedForCrib.value.push(card)
  }
}

const handleAssignToCrib = () => {
  assignToCrib(selectedForCrib.value)
  selectedForCrib.value = []
}
</script>

<template>
  <div class="text-center relative">
    <div v-if="game.currentHand.stage === 'discard'" class="mb-4">
      <button
        v-if="selectedForCrib.length === 2"
        @click="handleAssignToCrib"
        class="rounded-md text-xl font-semibold px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 duration-200 border -translate-y-4"
      >
        To Crib
      </button>
      <span v-else class="font-semibold text-lg"
        >Select 2 cards for the crib</span
      >
    </div>

    <div
      v-if="showGo"
      class="text-2xl font-semibold px-6 py-2 rounded-md bg-gradient-to-b from-pink-400 to-purple-300 border-2 border-black absolute top-44 mt-4"
    >
      Go
    </div>

    <div class="flex -space-x-14">
      <Card
        @select-for-crib="handleCribSelection"
        @select-for-peg="playCard"
        v-for="card in cardsInOrder"
        :key="card"
        :card="card"
        :is-selected-for-crib="
          selectedForCrib.some((c) => objectsEqual(c, card))
        "
      />
    </div>
  </div>
</template>
