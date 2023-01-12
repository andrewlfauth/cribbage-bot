export const objectsEqual = (o1, o2) =>
  JSON.stringify(o1) === JSON.stringify(o2)

export async function sleep(seconds) {
  await new Promise((res) => setTimeout(res, seconds * 1000))
}
