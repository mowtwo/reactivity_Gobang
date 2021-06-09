import { blackList, init, whiteList } from './libs/Game.js'

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
}

export function run() {
  init()
}
