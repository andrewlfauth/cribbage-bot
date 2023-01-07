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
    this.currentHand = 1
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
