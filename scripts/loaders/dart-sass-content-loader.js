
const XRegExp = require('xregexp')
/**
 * 处理默认配置选项
 * @param {*} source 源码
 * @returns {*} handledSource
 */
const loader  = (source) => {
  let handledSource = source;

  const exp = XRegExp('\\pC', 'gA')
  const ignoreList = ['%uFEFF', '%0A'];
  console.log('----exp----', exp)
  /**
   * 正则输出替换公式
   * @param {string} match 匹配对象
   * @returns {string} 匹配结果
   */
  const target = (match) => {
    const code = escape(match)
    if (ignoreList.includes(code)) return match;

    return code.replace('%u', '\\').toLocaleLowerCase();
  }
  debugger
  handledSource = XRegExp.replace(handledSource, exp, target)

  return handledSource;
}

module.exports = loader;
