/*
 * @Author: hyt
 * @Date: 2023-03-14 14:32:14
 * @LastEditors: hyt
 * @LastEditTime: 2023-03-15 11:31:21
 * @Description: 文件头的一些描述
 */
import { window, Range, commands } from 'vscode'
import { showErrorMessage } from '../index'
import { getSettingValue } from '../getSettingValue'

// 删除页面中全部 log
export const deleteFilterLog = context => {
  const deleteFilterLogStatements = commands.registerCommand(
    'consoleLog.deleteFilterLogStatements',
    () => {
      const editor = window.activeTextEditor
      if (!editor) {
        showErrorMessage()
        return
      }      

      const document = editor.document
      const documentText = editor.document.getText()
      const logStatements = getAllLogStatements(document, documentText)
      deleteFoundLogStatements(logStatements)
    }
  )
  context.subscriptions.push(deleteFilterLogStatements)
}


// 获取全部 log 语句
const getAllLogStatements = (document, documentText) => {
  // 默认情况下只删除没有被注释的log，清除全部的时候再把所有的log删除掉
  const prefixLogo = getSettingValue('Prefix Logo')
  const defaultLogg = '🚀';
  const filterRegex = new RegExp(`\\b${prefixLogo}\\b`)
  const logStatements = []
  const logRegex = /console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\(([\s\S]*?)\);?/g
  let match
  while ((match = logRegex.exec(documentText))) {
    if (filterRegex.test(match[0]) || match[0].indexOf(defaultLogg) != -1) {          
      const matchRange = new Range(
        document.positionAt(match.index),
        document.positionAt(match.index + match[0].length)
      )
      if (!matchRange.isEmpty) logStatements.push(matchRange)
    }
  }
  return logStatements
}

// 删除所有找到的 log 语句
const deleteFoundLogStatements = logs => {
  const editor = window.activeTextEditor
  const { document } = editor
  editor.edit(edit => {
    logs.forEach(range => {
      deleteFoundLogLines(range, edit, document)
    })
    deleteSuccessShowMessage(logs)
  })
}

// 执行删除 log 每行操作
const deleteFoundLogLines = (range, edit, document) => {
  for (let index = range.start.line; index <= range.end.line; index++) {
    edit.delete(document.lineAt(index).rangeIncludingLineBreak)
  }
}

// 删除成功提示信息
const deleteSuccessShowMessage = logs => {
  const message = logs.length
    ? `${logs.length} console.logs deleted`
    : `${logs.length} console.log deleted`
  window.showInformationMessage(message)
}
