import { SECONDS } from '@firestitch/date';


export function parse(value: string, inputUnit: string) {

  if (!value) {
    return 0;
  }

  let seconds = 0;

  value
    .split(' ')
    .forEach((chunk) => {
      const matches = chunk.match(/^(\d*\.?\d*)([YyMdhms])?$/);
      let modifier = matches && matches[2];

      if (!modifier) {
        switch (inputUnit) {
          case 'seconds': {
            modifier = 's';
          } break;

          case 'minutes': {
            modifier = 'm';
          } break;

          case 'hours': {
            modifier = 'h';
          } break;

          case 'days': {
            modifier = 'd';
          } break;

          case 'months': {
            modifier = 'M';
          } break;

          case 'years': {
            modifier = 'Y';
          } break;

          default: {
            throw 'Invalid duration format';
          }
        }
      }

      const factor = {
        Y: SECONDS.YEAR,
        y: SECONDS.YEAR,
        M: SECONDS.MONTH,
        d: SECONDS.DAY,
        h: SECONDS.HOUR,
        m: SECONDS.MINUTE,
        s: 1
      }[modifier];

      seconds += (<any>matches[1]) * factor;
    });

  return seconds;
}
