import { blackList, gameConfig, init, whiteList } from './Game.js'
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
/**
 * @param {KeyboardEvent} e
 */
export function canvasMouseUp(e) {
  const { cursorPosition, onMainUser } = gameConfig.Value
  if (hasChess(cursorPosition.toBaseVec2())) {
    return
  }
  if (onMainUser) {
    blackList.Push(cursorPosition.toBaseVec2()).Sort(sortList)
  } else {
    whiteList.Push(cursorPosition.toBaseVec2()).Sort(sortList)
  }
  gameJudge()
  gameConfig.Update({
    onMainUser: !onMainUser,
    showCursor: false,
  })
}
/**
 * @param {KeyboardEvent} e
 */
export function documentEnter(e) {
  // console.log(e.key)
  if (e.key == 'Enter' || e.keyCode == 13) {
    // console.log(e.keyCode)
    restoreGame()
  }
}

/**
 * @param {BaseVec2} vec2
 */
function hasChess(vec2) {
  return blackList.Has(vec2) || whiteList.Has(vec2)
}

function restoreGame() {
  blackList.Clear()
  whiteList.Clear()
  gameConfig.Update({
    victory: null,
    gameover: false,
    showCursor: true,
    onMainUser: true,
  })
  document.removeEventListener('keyup', documentEnter)
  init()
}
/**
 * @param {BaseVec2} item1
 * @param {BaseVec2} item2
 */
function sortList(item1, item2) {
  if (item1.X > item2.X) {
    return 1
  } else if (item1.X < item2.X) {
    return -1
  } else {
    if (item1.Y > item2.Y) {
      return 1
    } else if (item1.Y < item2.Y) {
      return -1
    } else {
      return 0
    }
  }
}

function gameJudge() {
  const { currentJudgeList } = gameConfig.Value
  console.log(currentJudgeList)
}
