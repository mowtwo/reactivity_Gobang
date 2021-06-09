import { blackList, gameConfig, whiteList } from './Game.js'
import { renderToLogicPosition } from './Utils.js'
import { BaseVec2 } from './Vec2.js'

/**
 * @param {MouseEvent} e
 */
export function canvasMouseMove(e) {
  const { cursorPosition } = gameConfig.Value
  const logicPos = renderToLogicPosition({
    x: e.offsetX,
    y: e.offsetY,
  })
  if (hasChess(cursorPosition.toBaseVec2())) {
    gameConfig.Update({
      showCursor: false,
    })
  } else {
    gameConfig.Update({
      showCursor: true,
    })
  }
  cursorPosition.move(logicPos.X, logicPos.Y)
}

export function canvasMouseUp(e) {
  const { cursorPosition, onMainUser } = gameConfig.Value
  if (hasChess(cursorPosition.toBaseVec2())) {
    return
  }
  if (onMainUser) {
    blackList.Push(cursorPosition.toBaseVec2())
  } else {
    whiteList.Push(cursorPosition.toBaseVec2())
  }
  gameConfig.Update({
    onMainUser: !onMainUser,
    showCursor: false,
  })
}
/**
 * @param {BaseVec2} vec2
 */
function hasChess(vec2) {
  return blackList.Has(vec2) || whiteList.Has(vec2)
}
