import { gameConfig } from './Game.js'
import { Vec2 } from './Vec2.js'

export function getRenderSize() {
  const { size, baseUnit, offset } = gameConfig.Value
  return (size + offset * 2) * baseUnit
}

/**
 * @param {number} point
 */
export function getRenderPosition(point) {
  const { baseUnit, offset } = gameConfig.Value
  return (point + offset) * baseUnit
}

export function renderToLogicPosition({ x, y }) {
  const { baseUnit, offset, size } = gameConfig.Value
  x = Math.round((x - baseUnit * offset) / baseUnit)
  y = Math.round((y - baseUnit * offset) / baseUnit)
  if (x < 0) {
    x = 0
  }
  if (y < 0) {
    y = 0
  }
  if (x > size) {
    x = size
  }
  if (y > size) {
    y = size
  }
  return new Vec2(x, y).toBaseVec2()
}
