import { reactive } from 'vue'
import { SUITS, VALUES } from '../data/cards'
import { getBotCribCards } from '../utils/bot'
import { objectsEqual, sleep } from '../utils/helpers'

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
    opponent: '',
    waitForUserCard: false,
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

  game.currentHand.stage = 'peg'
}

export function startPeggingStage() {
  if (game.dealer === 'bot') game.pegging.turn = 'user'
  else game.pegging.turn = 'bot'
  const cutCard = game.deck[Math.floor(Math.random() * 40)]
  game.currentHand.cutCard = cutCard
  peggingTurn(game.pegging.turn)
}

async function peggingTurn(player) {
  if (endOfPegging()) {
    await sleep(1)
    game.currentHand.stage = 'count'
    return
  }
  if (!game.currentHand[player].hand?.length) {
    game.pegging.opponent = 'out'
    return peggingTurn(player)
  }
  if (checkForGo()) {
    return handleGo()
  }
  if (game.pegging.turn === 'bot') playCard()
  else game.pegging.waitForUserCard = true
}

async function handleGo() {
  if (game.pegging.opponent === 'go') {
    await sleep(1)
    resetPegging()
    return switchTurns()
  }
  if (game.pegging.opponent === 'out') {
    await sleep(1)
    resetPegging()
    return peggingTurn(game.pegging.turn)
  }
  game.pegging.opponent = 'go'
  return switchTurns()
}

export async function playCard(card) {
  let player = game.pegging.turn
  if (!card) {
    card = getBotsCard()
    await sleep(1)
    removeCardFromBotsHand(card)
  } else {
    removeCardFromUsersHand(card)
  }
  game.pegging.cards.push(card)
  game.pegging.count += card.count
  if (game.pegging.count === 31) {
    await sleep(1)
    resetPegging()
    return switchTurns()
  }
  if (!game.currentHand[player].hand?.length) {
    game.pegging.opponent = 'out'
  } else {
    game.pegging.opponent = ''
  }

  switchTurns()
}

function getBotsCard() {
  return game.currentHand.bot.hand.filter(
    (card) => card.count <= 31 - game.pegging.count
  )[0]
}

function checkForGo() {
  let player = game.pegging.turn
  if (
    !game.currentHand[player].hand.some(
      (card) => card.count <= 31 - game.pegging.count
    )
  )
    return true
}

function endOfPegging() {
  if (
    !game.currentHand.bot.hand?.length &&
    !game.currentHand.user.hand?.length
  ) {
    return true
  }
}

function switchTurns() {
  game.pegging.waitForUserCard = false
  if (game.pegging.turn === 'bot') game.pegging.turn = 'user'
  else game.pegging.turn = 'bot'
  peggingTurn(game.pegging.turn)
}

async function resetPegging() {
  game.pegging.count = 0
  game.pegging.cards = []
  game.pegging.opponent = ''
}

function getOppenentsHand(player) {
  if (player === 'bot') return game.currentHand.user.hand
  else return game.currentHand.bot.hand
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
