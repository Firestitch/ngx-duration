import { SECONDS } from '@firestitch/date';

export function parse(value: string) {

  if (!value) {
    return 0;
  }

  let seconds = 0;

  value.split(' ').forEach((chunk) => {

    const matches = chunk.match(/^(\d*\.?\d*)([YMdhms])$/);

    if (!matches) {
      throw 'Invalid duration format';
    }

    const factor = {
      Y: SECONDS.YEAR,
      M: SECONDS.MONTH,
      d: SECONDS.DAY,
      h: SECONDS.HOUR,
      m: SECONDS.MINUTE,
      s: 1
    }[matches[2]];

    seconds += (<any>matches[1]) * factor;
  });

  return seconds;
}
