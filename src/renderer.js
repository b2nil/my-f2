/**
 * f2 专为适配微信小程序绘图上下文 context 而封装的伪 Canvas
 * @authors (sima.zhang1990@gmail.com)
 * @version 1.0.0
 */

/**
   * wxapp textAlign align 可选值为 left|center|right
   * 标准canvas textAlign align 可选值为 left|center|right|start|end
 */
const TEXT_ALIGN_MAP = {
  start: 'left',
  end: 'right'
};

const CAPITALIZED_ATTRS_MAP = {
  fillStyle: 'FillStyle',
  fontSize: 'FontSize',
  globalAlpha: 'GlobalAlpha',
  opacity: 'GlobalAlpha',
  lineCap: 'LineCap',
  lineJoin: 'LineJoin',
  lineWidth: 'LineWidth',
  miterLimit: 'MiterLimit',
  strokeStyle: 'StrokeStyle',
  textAlign: 'TextAlign',
  textBaseline: 'TextBaseline'
};

class WxRenderer extends require('wolfy87-eventemitter/EventEmitter.min.js') {
  constructor(wxCtx) {
    super();
    const self = this;
    self.ctx = wxCtx;
    self.style = {};
    self._initContext(wxCtx);
  }
  getContext(type) {
    if (type === '2d') {
      return this.ctx;
    }
  }
  _initContext(wxCtx) {
    Object.keys(CAPITALIZED_ATTRS_MAP).map(key => {
      Object.defineProperty(wxCtx, key, {
        set(value) {
          if (key === 'textAlign') {
            value = TEXT_ALIGN_MAP[value] ? TEXT_ALIGN_MAP[value] : value;
          }
          const name = `set${CAPITALIZED_ATTRS_MAP[key]}`;
          wxCtx[name](value);
        }
      });
      return key;
    });
  }
}

class MyRenderer {
  constructor(myCtx) {
    const self = this;
    self.ctx = myCtx;
    self.style = {};
    self._initContext(myCtx);
  }
  getContext(type) {
    if (type === '2d') {
      return this.ctx;
    }
  }
  _initContext(myCtx) {
    Object.keys(CAPITALIZED_ATTRS_MAP).map(key => {
      Object.defineProperty(myCtx, key, {
        set(value) {
          const name = `set${CAPITALIZED_ATTRS_MAP[key]}`;
          myCtx[name](value);
        }
      });
      return key;
    });
  }
}

if (typeof wx !== 'undefined' && wx.getSystemInfo) {
  module.exports = WxRenderer;
} else if (typeof my !== 'undefined' && my.getSystemInfo) {
  module.exports = MyRenderer;
}
