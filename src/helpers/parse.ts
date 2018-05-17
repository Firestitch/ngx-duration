import { SECONDS } from '@firestitch/date';
import { Observable } from 'rxjs/Observable';

export function parse(value: string) {

  if (!value && typeof value !== 'string') {
    throw 'Invalid duration format';
  }

  let time = 0;

  value = value
    .trim()
    .replace(/(\d+)\s+/g, '$1')
    .replace(/\s+/, ' ')
    .replace(/^\./, '0.');

  value.split(' ').forEach((chunk) => {

    const matches = chunk.match(/^(\d+\.?\d*)([YMdhms])$/);

    if (!matches) {
      return;
    }

    const factor = {
      Y: SECONDS.YEAR,
      M: SECONDS.MONTH,
      d: SECONDS.DAY,
      h: SECONDS.HOUR,
      m: SECONDS.MINUTE,
      s: 1
    }[matches[2]];

    time += Math.round(+matches[1]) * factor;
  });

  return Number(time);
}
