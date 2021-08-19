/**
 * Should cleanup extra symbols in such examples as:
 * '1h 30m'   => '1h 30m'
 * ' 1h 30m'  => '1h 30m'
 * '1h 30m '  => '1h 30m'
 * '1 h 30m'  => '1h 30m'
 * '1h 30 m'  => '1h 30m'
 * '1 h 30 m' => '1h 30m',
 * '1.3 h'    => '1.3h',
 * '1h30m'    => '1h 30m',
 * '1h some text between 30m' => '1h 30m'
 * @param str
 */

export function cleanupInput(str: string): string {
  const parts = str
    .trim()
    /**
     * Cleanup step
     *
     * Here we are trying to fix most popular user mistakes i.e.: 1 h 30 m, 1.3 h and etc.
     */
    .replace(/(?<=(\d*\.?\d*))\s+(?=[ydhms])/gi, '')
    /**
     * Extract
     *
     * For cases like "1h30m" or "1h some text between 30m".
     * Just extract target time values
     */
    .match(/(\d*\.?\d)+[ydhms]/gi);

  if (parts) {
    /**
     * Join extractions into expected string
     */
    return parts.join(' ');
  }

  return '';
}
