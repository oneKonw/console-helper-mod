import {
  checkForUpdate,
  deleteFilterLog,
  deleteAllLog,
  insertLogStatement,
  insertVariable
} from './common'

export const activate = context => {
  checkForUpdate()
  insertLogStatement(context)
  insertVariable(context)
  deleteFilterLog(context)
  deleteAllLog(context)
}

export const deactivate = () => {}
