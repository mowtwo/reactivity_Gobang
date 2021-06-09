export class BaseVec2 {
  X = 0
  Y = 0
}
export class Vec2 {
  #x = 0
  #y = 0
  constructor(x = 0, y = 0) {
    this.#x = x
    this.#y = y
  }
  get X() {
    return this.#x
  }
  get Y() {
    return this.#y
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  move(x, y) {
    this.#x = x
    this.#y = y
  }
  toArray() {
    return [this.#x, this.#y]
  }
  toBaseVec2() {
    const v2 = new BaseVec2()
    v2.X = this.X
    v2.Y = this.Y
    return v2
  }
  /**
   * @param {BaseVec2} item
   */
  equal(item) {
    return this.X == item.X && this.Y == item.Y
  }
}
/**
 * @param {number} size
 */
export function Vec2List(size) {
  /**
   * @type {Vec2[]}
   */
  const list = []
  if (size > 0) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        list.push(new Vec2(x, y))
      }
    }
  }
  return {
    get List() {
      return [
        ...list.map((item) => {
          return {
            X: item.X,
            Y: item.Y,
          }
        }),
      ]
    },
    /**
     * @param {(item1:Vec2,item2:Vec2)=>typeof list} sortMethod
     * @returns
     */
    Sort(
      sortMethod = () => {
        return 1
      },
    ) {
      if (list.length > 1) {
        for (let i = 0; i < list.length - 1; i++) {
          for (let j = i + 1; j < list.length; j++) {
            const item1 = list[i]
            const item2 = list[j]
            const sortResult = sortMethod(item1, item2)
            if (sortResult > 0) {
              const temp = {
                X: item1.X,
                Y: item2.Y,
              }
              item1.move(item2.X, item2.Y)
              item2.move(temp.X, temp.Y)
            }
          }
        }
      }
      return this
    },
    /**
     * @param {BaseVec2} item
     */
    Push(item) {
      list.push(new Vec2(item.X, item.Y))
      console.log(list, item)
      return this
    },
    /**
     * @param {BaseVec2} item
     */
    Remove(item) {
      const index = list.findIndex((findItem) => {
        return findItem.equal(item)
      })
      if (typeof index == 'number' && index >= 0) {
        list.splice(index, 1)
      }
      return this
    },
    /**
     * @param {BaseVec2} item
     */
    Has(item) {
      return list.some((findItem) => findItem.equal(item))
    },
  }
}
