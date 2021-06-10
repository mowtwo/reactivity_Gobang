import { blackList, gameConfig, init, whiteList } from './libs/Game.js'
import { restoreGame } from './libs/Events.js'

window['mowDevtools'] = {
  testPushChess(X, Y, mainUser = true) {
    if (mainUser) {
      blackList.Push({
        X,
        Y,
      })
    } else {
      whiteList.Push({
        X,
        Y,
      })
    }
  },
  gameover() {
    gameConfig.Update({
      gameover: true,
    })
  },
  gameRestore() {
    restoreGame()
  },
}

function initDebug() {
  const mapper = document.querySelector('#configMapper')
  for (const key in gameConfig.Value) {
    const option = document.createElement('option')
    option.value = key
    option.innerHTML = key
    mapper.appendChild(option)
  }
  const print = document.querySelector('#debugPrint')
  print.addEventListener('click', () => {
    const key = mapper.value
    if (key && key in gameConfig.Value) {
      console.log(gameConfig.Get(key))
    } else {
      console.log('没有搜索到对应配置字段')
    }
  })
}

export function run() {
  init()
  initDebug()
}
