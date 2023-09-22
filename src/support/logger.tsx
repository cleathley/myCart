import {consoleTransport, logger} from 'react-native-logs';
import ENV from '../../.env';

const log = logger.createLogger<'debug' | 'info' | 'warn' | 'error'>({
  severity: __DEV__ ? 'debug' : 'error',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      debug: 'white',
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
    consoleFunc: (msg: any) => {
      console.log(ENV.IS_ANDROID === true ? '\x1b[32mAND' : '\x1b[36miOS', msg);
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
});

export default log;
