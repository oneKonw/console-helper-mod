/*
 * @Author: hyt
 * @Date: 2023-03-14 16:38:36
 * @LastEditors: hyt
 * @LastEditTime: 2023-03-14 16:41:50
 * @Description: 文件头的一些描述
 */
// 拼接模板
export const tempJoin = (temp, styles, selectVariable, defatltType) => {
  let consoleType = 'log'
  if (defatltType === 'warn') {
    consoleType = 'warn'
  }
  if (defatltType === 'error') {
    consoleType = 'error'
  }

  if (styles) {
    return `console.${consoleType}('🚀 %c ${temp}', '${styles}', ${selectVariable})`
  } else if (temp) {
    return `console.${consoleType}('🚀 ${temp}', ${selectVariable})`
  }
  return `console.${consoleType}(🚀 ${selectVariable})`
}
