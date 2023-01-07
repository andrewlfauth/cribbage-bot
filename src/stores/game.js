import { reactive } from 'vue'
import { SUITS, VALUES } from '../data/cards'

export const game = reactive({
  deck: newDeck().sort(() => Math.random() - 0.5),
  dealer: 'bot',
  currentHand: { user: { hand: [] }, bot: { hand: [] } },
})

function newDeck() {
  return SUITS.flatMap((suit) => VALUES.map((value) => ({ suit, value })))
}

export function dealHand() {
  game.dealer = game.dealer === 'bot' ? 'user' : 'bot'

  game.currentHand = { user: { hand: [] }, bot: { hand: [] } }
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
