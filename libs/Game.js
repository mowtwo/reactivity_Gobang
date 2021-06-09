import { BaseVec2, Vec2List } from './Vec2.js'
import { initConfig } from './Config.js'
import { getRenderPosition, getRenderSize } from './Utils.js'
import { getFps, updateTime } from './Time.js'
import { canvasMouseMove, canvasMouseUp } from './Events.js'

export const gameConfig = initConfig(document.querySelector('#canvas'))
export const blackList = Vec2List(0)
export const whiteList = Vec2List(0)
export function init() {
  const { canvas, boxShadow, cursorPosition, size } = gameConfig.Value
  canvas.width = getRenderSize()
  canvas.height = getRenderSize()
  canvas.style.boxShadow = boxShadow
  cursorPosition.move(Math.floor(size / 2), Math.floor(size / 2))
  requestAnimationFrame(update)
  canvas.addEventListener('mousemove', canvasMouseMove)
  canvas.addEventListener('mouseup', canvasMouseUp)
}

function update(step) {
  updateTime(Date.now())
  draw()
  requestAnimationFrame(update)
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
  const { lineColor, lineWidth, size, context, offset } = gameConfig.Value
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
    offset,
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
