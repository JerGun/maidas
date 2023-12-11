import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor() {}

  getClockAngle(hh_mm: string): number {
    const [hours, minutes] = hh_mm.split(':').map(Number)
    const formatHours = hours % 12
    const hourAngle = 0.5 * (60 * formatHours + minutes)
    const minuteAngle = 6 * minutes
    const clockAngle = Math.abs(hourAngle - minuteAngle)
    return Math.min(clockAngle, 360 - clockAngle)
  }

  getQuestionPart(phrases: string[]): string[] {
    const firstPhrase = phrases[0]
    let commonWord = ''

    for (let i = 0; i < firstPhrase.length; i++) {
      const currentLetter = `${commonWord}${firstPhrase[i]}`
      if (phrases.every((phrase) => phrase.includes(currentLetter))) {
        commonWord = currentLetter
      }
      if (commonWord.length === 1) commonWord = firstPhrase[i]
    }

    return phrases.map((phrase) => phrase.replace(commonWord, '').trim())
  }

  quickestPath(board: { ladders: [number, number][]; snakes: [number, number][] }) {
    const target = 100
    const { ladders, snakes } = board
    let position = 1
    let diceRolls = []

    while (position != target) {
      const nearestLadder = ladders.find((ladder) => ladder[0] - position > 0 && ladder[0] - position <= 6)
      if (nearestLadder) {
        diceRolls.push(nearestLadder[0] - position)
        position = nearestLadder[1]
      } else {
        const distance = target - position
        let rollDice = distance < 6 ? distance : 6
        rollDice = snakes.find((snake) => snake[0] === position + rollDice) ? rollDice - 1 : rollDice
        diceRolls.push(rollDice)
        position += rollDice
      }
    }
    return diceRolls
  }

  minEnergy(start: number, shops: number[], stations: number[], target: number): number {
    let position = start
    let energy = 0
    let j = 0

    for (let i = 0; i < shops.length; i++) {
      if (stations[j + 1] < shops[i] && position < stations[j + 1]) {
        const stationNearPosition = stations.reduce((nearest, current) =>
          Math.abs(position - current) < Math.abs(position - nearest) ? current : nearest,
        )
        const stationNearShop = stations.reduce((nearest, current) =>
          Math.abs(shops[i] - current) < Math.abs(shops[i] - nearest) ? current : nearest,
        )
        energy += Math.abs(position - stationNearPosition)
        position = stationNearShop
        j = stations.indexOf(stationNearShop)
      }
      energy += Math.abs(position - shops[i])
      position = shops[i]
    }

    if (position < target) {
      energy += Math.abs(position - target)
      position = target
    }

    return energy
  }
}
