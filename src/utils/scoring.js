import { game } from '../stores/game'

export function checkForPegPoints() {
  // 15
  if (game.pegging.count == 15 || game.pegging.count == 31) {
    game.pegging.count == 15
      ? awardPoints(2, '15 for 2')
      : awardPoints(2, '31 for 2')
  }

  checkForPeggingPairs()
  checkForPeggingRun()
}

function checkForPeggingPairs() {
  let cards = [...game.pegging.cards]
  let pairs = 0

  if (cards.length < 2) return
  for (let i = 0; i < cards.length; i++) {
    let c = cards.pop()
    if (c.value === cards[cards.length - 1].value) {
      pairs++
    } else break
  }

  if (pairs) {
    return awardPoints(pairs * (pairs + 1), 'Pair for ' + pairs * (pairs + 1))
  }
}

function checkForPeggingRun() {
  let cards = [...game.pegging.cards].map((c) => c.order)
  let card = cards.pop()

  let idxs = []
  let nextCard = card - 1
  for (let i = 0; i < cards.length; i++) {
    let nextIdx = cards.lastIndexOf(nextCard)
    if (nextIdx !== -1) {
      nextCard -= 1
      idxs.push(nextIdx)
    } else break
  }

  nextCard = card + 1
  for (let i = 0; i < cards.length; i++) {
    let nextIdx = cards.lastIndexOf(nextCard)
    if (nextIdx !== -1) {
      nextCard += 1
      idxs.push(nextIdx)
    } else break
  }

  if (idxs.length < 2 || Math.max(...idxs) < cards.length - 1) {
    return
  }

  let sorted = [...idxs].sort((a, b) => b - a)
  let run = []

  for (let i = 0; i < sorted.length; i++) {
    let n = sorted[i]
    if (sorted[i + 1] == n - 1) {
      run.push(n)
    } else {
      run.push(n)
      break
    }
  }
  if (run.length < 2) return

  let sliced = cards
    .slice(Math.min(...run))
    .concat([card])
    .sort((a, b) => a - b)

  for (let i = 0; i < sliced.length; i++) {
    if (i == sliced.length - 1) {
      return awardPoints(
        sliced.length,
        `Run of ${sliced.length} for ${sliced.length}`
      )
    }
    if (sliced[i + 1] == sliced[i] + 1) {
      continue
    } else {
      break
    }
  }
}

export function awardPoints(points, message) {
  game.pegging.pointsMessage = message
  let player = game.pegging.turn
  game.score[player] += points
}
