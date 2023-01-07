<script setup>
import { ref } from 'vue'
import { objectsEqual } from '../../utils/helpers'
import { assignToCrib, game } from '../../stores/game'
import Card from '../Card.vue'

const props = defineProps({
  cardsInHand: Array,
})

const selectedForCrib = ref([])

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
  <div class="text-center">
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
    <div class="flex -space-x-14">
      <Card
        @select-for-crib="handleCribSelection"
        v-for="card in cardsInHand"
        :key="card"
        :card="card"
        :is-selected-for-crib="
          selectedForCrib.some((c) => objectsEqual(c, card))
        "
      />
    </div>
  </div>
</template>
