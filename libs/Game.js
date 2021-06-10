import { BaseVec2, Vec2List } from './Vec2.js'
import { initConfig } from './Config.js'
import { getRenderPosition, getRenderSize } from './Utils.js'
import { getFps, updateTime } from './Time.js'
import { canvasMouseMove, canvasMouseUp, documentEnter } from './Events.js'

export const gameConfig = initConfig(document.querySelector('#canvas'))
export const blackList = Vec2List(0)
export const whiteList = Vec2List(0)
export function init() {
  const { canvas, boxShadow, cursorPosition, size } = gameConfig.Value
  canvas.width = getRenderSize()
  canvas.height = getRenderSize()
  canvas.style.boxShadow = boxShadow
  cursorPosition.move(Math.floor(size / 2), Math.floor(size / 2))
  gameConfig.Update({
    chessMap: {
      get black() {
        return blackList.List
      },
      get white() {
        return whiteList.List
      },
    },
  })
  requestAnimationFrame(update)
  canvas.addEventListener('mousemove', canvasMouseMove)
  canvas.addEventListener('mouseup', canvasMouseUp)
}
let frameHandle = null
function update() {
  const { gameover } = gameConfig.Value
  // console.log(frameHandle)
  if (gameover && frameHandle != null) {
    gameAllPause()
    return cancelAnimationFrame(frameHandle)
  }
  updateTime(Date.now())
  draw()
  frameHandle = requestAnimationFrame(update)
}

/**
 *
 * @param {import('./Config.js').OutConfig} config
 */
function draw(step) {
  const { context, bgColor } = gameConfig.Value
  context.fillStyle = bgColor
  context.fillRect(0, 0, getRenderSize(), getRenderSize())
  drawLine()
  drawChess('#000', blackList.List)
  drawChess('#fff', whiteList.List)
  drawFloatCursor(step)
  drawFps()
}

function drawLine() {
  const { lineColor, lineWidth, size, context } = gameConfig.Value
  context.strokeStyle = lineColor
  context.lineWidth = lineWidth
  for (let vertical = 0; vertical < size + 1; vertical++) {
    context.beginPath()
    context.moveTo(getRenderPosition(vertical), getRenderPosition(0))
    context.lineTo(
      getRenderPosition(vertical),
      getRenderSize() - getRenderPosition(0),
    )
    context.closePath()
    context.stroke()
  }
  for (let horizontal = 0; horizontal < size + 1; horizontal++) {
    context.beginPath()
    context.moveTo(getRenderPosition(0), getRenderPosition(horizontal))
    context.lineTo(
      getRenderSize() - getRenderPosition(0),
      getRenderPosition(horizontal),
    )
    context.closePath()
    context.stroke()
  }
}

/**
 * @param {string} color
 * @param {BaseVec2[]} vec2List
 */
function drawChess(color, vec2List) {
  const { context, baseUnit } = gameConfig.Value
  context.strokeStyle = '#000'
  context.fillStyle = color
  for (const vec2 of vec2List) {
    context.beginPath()
    context.arc(
      getRenderPosition(vec2.X),
      getRenderPosition(vec2.Y),
      baseUnit / 2,
      0,
      2 * Math.PI,
    )
    context.closePath()
    context.fill()
    context.stroke()
  }
}

function drawFloatCursor(step) {
  const {
    context,
    baseUnit,
    cursorColor,
    cursorPosition,
    showCursor,
  } = gameConfig.Value
  if (showCursor) {
    context.strokeStyle = cursorColor
    context.beginPath()
    context.rect(
      getRenderPosition(cursorPosition.X) - baseUnit / 2,
      getRenderPosition(cursorPosition.Y) - baseUnit / 2,
      baseUnit,
      baseUnit,
    )
    context.closePath()
    context.stroke()
  }
}

function drawFps() {
  const { context } = gameConfig.Value
  const fps = getFps()
  context.fillStyle = '#000'
  context.fillText(`fps:${fps}`, 10, 10)
}

function gameAllPause() {
  const { context, baseUnit, victory, canvas } = gameConfig.Value
  const padding = baseUnit * 2
  const pausePanelSize = getRenderSize() - padding * 2
  context.save()
  context.fillStyle = '#aaa'
  context.fillRect(padding + 10, padding + 10, pausePanelSize, pausePanelSize)
  context.fillStyle = '#fff'
  context.fillRect(padding, padding, pausePanelSize, pausePanelSize)
  context.strokeStyle = '#000'
  context.lineWidth = 1
  context.strokeRect(padding, padding, pausePanelSize, pausePanelSize)
  context.strokeStyle = '#aaa'
  context.strokeRect(
    padding * 2,
    padding * 2,
    pausePanelSize - padding * 2,
    pausePanelSize - padding * 2,
  )
  context.textBaseline = 'middle'
  context.textAlign = 'center'
  context.font = '50px bold'
  context.fillStyle = '#aaa'
  context.fillText('游戏结束', getRenderSize() / 2, padding * 3)
  context.font = '30px normal'
  context.fillText(
    `${victory ? `胜者为:${victory}` : '结局为平手'}`,
    getRenderSize() / 2,
    padding * 5,
  )
  context.font = '16px normal'
  context.fillText('按下enter以重开', getRenderSize() / 2, padding * 7)
  context.restore()
  canvas.removeEventListener('mousemove', canvasMouseMove)
  canvas.removeEventListener('mouseup', canvasMouseUp)
  document.addEventListener('keyup', documentEnter)
}
