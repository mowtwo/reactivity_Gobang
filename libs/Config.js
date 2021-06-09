import { BaseVec2, Vec2 } from './Vec2.js'

const config = {
  baseUnit: 40, //单位，默认为px
  size: 18,
  /**
   * @type {HTMLCanvasElement}
   */
  canvas: null,
  /**
   * @type {CanvasRenderingContext2D}
   */
  context: null,
  lineColor: '#aaa',
  lineWidth: 1,
  bgColor: '#fff',
  boxShadow: '#000 0 0 5px',
  offset: 1,
  cursorPosition: new Vec2(0, 0),
  cursorColor: '#f00',
  showCursor: true,
  onMainUser: true,
  gameover: false,
  victory: null,
  /**
   * @type {Record<'black'|'white',BaseVec2[]>}
   */
  chessMap: {
    black: [],
    white: [],
  },
  get currentJudgeList() {
    if (this.onMainUser) {
      return this.chessMap.black
    } else {
      return this.chessMap.white
    }
  },
}

/**
 * 初始化配置列表
 * @param {HTMLCanvasElement} canvas
 */
export function initConfig(canvas) {
  config.canvas = canvas
  config.context = canvas.getContext('2d')
  return {
    /**
     * @type {typeof config}
     */
    get Value() {
      return { ...config }
    },
    /**
     * @param {Partial<typeof config>} configOptions
     * @returns {typeof config}
     */
    Update(configOptions) {
      for (const key in configOptions) {
        const option = configOptions[key]
        if (key in config) {
          config[key] = option
        }
      }
      return this.Value
    },
    /**
     * @param {string} key
     * @returns {Number|HTMLCanvasElement|CanvasRenderingContext2D|string}
     */
    Get(key) {
      if (key in config) {
        return config[key]
      }
    },
  }
}

/**
 * @typedef {{
 *  Value:Readonly<typeof config>;
 *  Update:(configOptions:Partial<typeof config>)=>Readonly<typeof config>;
 *  Get:(key:string)=>Number|HTMLCanvasElement|CanvasRenderingContext2D|string;
 * }} OutConfig
 */
