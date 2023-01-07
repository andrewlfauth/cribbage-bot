const SUITS = ['♠', '♥', '♣', '♦']

const VALUES = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
]

export class Game {
  constructor() {
    this.deck = new newDeck().sort(() => Math.random() - 0.5)
    this.dealer = 'bot'
    this.currentHand = { user: { hand: [] }, bot: { hand: [] } }
  }

  dealHand() {
    this.dealer = this.dealer === 'bot' ? 'user' : 'bot'
    for (let i = 0; i < 6; i++) {
      if (this.dealer === 'bot') {
        this.currentHand.user.hand.push(this.deck.shift())
        this.currentHand.bot.hand.push(this.deck.shift())
      } else {
        this.currentHand.bot.hand.push(this.deck.shift())
        this.currentHand.user.hand.push(this.deck.shift())
      }
    }
  }
}

class Card {
  constructor(suit, value) {
    ;(this.suit = suit), (this.value = value)
  }
}

function newDeck() {
  return SUITS.flatMap((suit) => VALUES.map((value) => new Card(suit, value)))
}
