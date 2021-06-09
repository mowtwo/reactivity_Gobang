const saveTimeData = {
  lastTime: 0,
  nextTime: 0,
  get timeStep() {
    //ms
    return this.nextTime - this.lastTime
  },
  get fps() {
    // console.log(this.timeStep)
    return 1 / (this.timeStep / 1000)
  },
}

export function updateTime(next) {
  saveTimeData.lastTime = saveTimeData.nextTime
  saveTimeData.nextTime = next
}

export function getFps() {
  return saveTimeData.fps.toFixed(2)
}
