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
  <div class="relative text-center">
    <div v-if="game.currentHand.stage === 'discard'" class="mb-4">
      <button
        v-if="selectedForCrib.length === 2"
        @click="handleAssignToCrib"
        class="px-6 py-2 text-xl font-semibold text-white duration-200 -translate-y-4 bg-blue-500 border rounded-md hover:bg-blue-600"
      >
        To Crib
      </button>
      <span v-else class="text-lg font-semibold"
        >Select 2 cards for the crib</span
      >
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
