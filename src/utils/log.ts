type Actions = 'info' | 'success' | 'warning' | 'error'

const implementFunc = (color: string, type: keyof Console, action: Actions, ...args: any[]) => {
  const prevConsole = console
  let logFunc
  if (type === 'log') {
    logFunc = prevConsole.info
  } else {
    logFunc = prevConsole[type]
  }
  logFunc(`%c jssdk print.${action}: `, `background-color: ${color}; color: white`, ...args)
}

export default {
  info: (...args: any[]) => implementFunc('#0095fb', 'log', 'info', ...args),
  success: (...args: any[]) => implementFunc('#52c41a', 'log', 'success', ...args),
  warning: (...args: any[]) => implementFunc('#faad14', 'log', 'warning', ...args),
  error: (...args: any[]) => implementFunc('#f5222d', 'log', 'error', ...args)
}
