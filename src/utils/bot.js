export function getBotCribCards(cards) {
  let card1 = Math.floor(Math.random() * 7)
  let card2 = Math.floor(Math.random() * 7)

  while (card1 === card2) {
    card2 = Math.floor(Math.random() * 7)
  }

  return [cards[card1], cards[card2]]
}
