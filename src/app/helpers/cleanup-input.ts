/**
 * Should cleanup extra symbols in such examples as:
 * '1h 30m'   => '1h 30m'
 * ' 1h 30m'  => '1h 30m'
 * '1h 30m '  => '1h 30m'
 * '1 h 30m'  => '1h 30m'
 * '1h 30 m'  => '1h 30m'
 * '1 h 30 m' => '1h 30m',
 * '1.3 h'     => '1.3h'
 * @param str
 */

export function cleanupInput(str: string): string {
  str = str
    .trim()
    .replace(/(?<=(\d*\.?\d*))\s+(?=[ydhms])/gi, '');

  return str;
}
