export function convertNumberToTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const newSeconds = Math.floor(minutes % 60)

  return `${minutes}:${newSeconds < 10 ? `0${newSeconds}` : newSeconds}`
}
