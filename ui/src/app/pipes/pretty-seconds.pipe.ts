import { Pipe, PipeTransform } from '@angular/core';

function pluralize(num: number, unit: string): string {
  return num === 1 ? `${num} ${unit}` : `${num} ${unit}s`;
}

const SECOND = 1,
  MINUTE = 60 * SECOND,
  HOUR = 60 * MINUTE,
  DAY = 24 * HOUR,
  WEEK = 7 * DAY;
@Pipe({
  name: 'prettySeconds'
})
export class PrettySecondsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var buf: string[] = [], seconds = parseInt(value);
    if (seconds === 0) {
      return '0 seconds';
    }
    if (seconds > WEEK) {
      buf.push(pluralize(Math.floor(seconds / WEEK), 'week'));
      seconds = seconds % WEEK;
    }
    if (seconds > DAY) {
      buf.push(pluralize(Math.floor(seconds / DAY), 'day'));
      seconds = seconds % DAY;
    }
    if (seconds > HOUR) {
      buf.push(pluralize(Math.floor(seconds / HOUR), 'hour'));
      seconds = seconds % HOUR;
    }
    if (seconds > MINUTE) {
      buf.push(pluralize(Math.floor(seconds / MINUTE), 'minute'));
      seconds = seconds % MINUTE;
    }
    if (seconds > 0) {
      buf.push(pluralize(seconds, 'second'));
    }
    return buf.join(' ');
  }

}
