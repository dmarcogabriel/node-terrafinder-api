import { redBright, blueBright } from 'chalk'
import { format } from 'date-fns'
import fs from 'fs-extra'
import path from 'path'

const { error, info, log } = console

const timestamp = () => format(new Date(), 'PPpp')

const registerLog = (logObject: { [key:string]: any}) => {
  /**
   * ! Don't call any console.log methods here, because it will enter in
   * ! an eternal loop.
   *
   * * This function will register a single log in a log file,
   * * the log file is generated each day
   */
  if (process.env.NODE_ENV !== 'production') return

  const filename = `log-${format(new Date(), 'dd-MM-yy')}.log`
  const pathToLogFile = path.join(__dirname, '..', 'logs', filename)
  const logData = JSON.stringify(logObject)
    .replace(/\\u([0-9]{3}b)/g, '')
    .replace(/\[([0-9]{2}m)/g, '') // * These 2 'replaces' removes the colors characteres
  try {
    fs.appendFileSync(pathToLogFile, `${logData}\n`)
    // todo: we can connect with grafana in the future
  } catch (err) {
    fs.writeFileSync(pathToLogFile, `${logData}\n`)
  }
}

console.error = (...data: any[]): void => {
  // registerLog({ error: { timestamp: timestamp(), data } })
  error(redBright('[error] | ', timestamp(), data))
}

console.info = (name: string, ...data: any[]): void => {
  // registerLog({ info: { timestamp: timestamp(), data } })
  info(`[${blueBright(name.toLowerCase())}] | ${timestamp()} > `, ...data)
}

console.log = (...data: any[]): void => {
  // registerLog({ log: { timestamp: timestamp(), data } })
  log(`[${blueBright('log')}] |`, ...data)
}
