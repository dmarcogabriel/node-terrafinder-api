import { redBright, blueBright } from 'chalk'
import { format } from 'date-fns'

const { error, info, log } = console

const timestamp = format(new Date(), 'PPpp')

console.error = (...data: any[]): void => {
  error(redBright('[ERROR] | ', format(new Date(), 'PPpp')))
  error(...data)
}

console.info = (name: string, ...data: any[]): void => {
  info(`[${blueBright(name.toLowerCase())}] | ${timestamp} > `, ...data)
}

console.log = (...data: any[]): void => {
  log(`[${blueBright('log')}] |`, ...data)
}
