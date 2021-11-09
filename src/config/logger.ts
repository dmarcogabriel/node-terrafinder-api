import { redBright } from 'chalk'
import { format } from 'date-fns'

const { error } = console

console.error = (...data: any[]): void => {
  error(redBright('[ERROR] | ', format(new Date(), 'PPpp')))
  error(...data)
}
