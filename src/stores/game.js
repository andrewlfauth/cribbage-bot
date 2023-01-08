import { reactive } from 'vue'
import { SUITS, VALUES } from '../data/cards'
import { getBotCribCards } from '../utils/bot'
import { objectsEqual } from '../utils/helpers'

export const game = reactive({
  deck: newDeck().sort(() => Math.random() - 0.5),
  dealer: 'bot',
  currentHand: {
    user: { hand: [], selectedForCrib: [] },
    bot: { hand: [], selectedForCrib: [] },
    stage: 'discard',
    crib: [],
    cutCard: {},
  },
  pegging: {
    count: 0,
    cards: [],
    turn: 'bot',
    go: 0,
  },
})

function newDeck() {
  const preCount = SUITS.flatMap((suit) =>
    VALUES.map((value) => ({ suit, value }))
  )
  return preCount.map((card) => {
    switch (card.value) {
      case 'A':
        return { ...card, count: 1, order: 1 }
      case 'J':
        return { ...card, count: 10, order: 11 }
      case 'Q':
        return { ...card, count: 10, order: 12 }
      case 'K':
        return { ...card, count: 10, order: 13 }
      default:
        return {
          ...card,
          count: parseInt(card.value),
          order: parseInt(card.value),
        }
    }
  })
}

export function dealHand() {
  game.dealer = game.dealer === 'bot' ? 'user' : 'bot'

  game.currentHand = {
    user: { hand: [], selectedForCrib: [] },
    bot: { hand: [], selectedForCrib: [] },
    stage: 'discard',
    crib: [],
    cutCard: {},
  }

  for (let i = 0; i < 6; i++) {
    if (game.dealer === 'bot') {
      game.currentHand.user.hand.push(game.deck.shift())
      game.currentHand.bot.hand.push(game.deck.shift())
    } else {
      game.currentHand.bot.hand.push(game.deck.shift())
      game.currentHand.user.hand.push(game.deck.shift())
    }
  }
}

export function assignToCrib(userCards) {
  userCards.forEach((card) => {
    game.currentHand.crib.push(card)
    removeCardFromUsersHand(card)
  })

  const cribCards = getBotCribCards(game.currentHand.bot.hand)
  cribCards.forEach((card) => {
    game.currentHand.crib.push(card)
    removeCardFromBotsHand(card)
  })

  startPeggingStage()
}

function startPeggingStage() {
  game.currentHand.stage = 'peg'
  const cutCard = game.deck[Math.floor(Math.random() * 40)]

  game.currentHand.cutCard = cutCard
}

function removeCardFromUsersHand(card) {
  game.currentHand.user.hand = game.currentHand.user.hand.filter(
    (c) => !objectsEqual(c, card)
  )
}

function removeCardFromBotsHand(card) {
  game.currentHand.bot.hand = game.currentHand.bot.hand.filter(
    (c) => !objectsEqual(c, card)
  )
}
