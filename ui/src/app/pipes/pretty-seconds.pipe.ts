import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

const SECOND = 1,
  MINUTE = 60 * SECOND,
  HOUR = 60 * MINUTE,
  DAY = 24 * HOUR,
  WEEK = 7 * DAY;
@Pipe({
  name: 'prettySeconds'
})
export class PrettySecondsPipe extends DecimalPipe implements PipeTransform {

  pluralize(num: number, unit: string): string {
    return num === 1 ? `${super.transform(num)} ${unit}` : `${super.transform(num)} ${unit}s`;
  }

  transform(value: any, args?: any): any {
    var buf: string[] = [], seconds = parseInt(value);
    if (seconds === 0) {
      return '0 seconds';
    }
    if (seconds > WEEK) {
      buf.push(this.pluralize(Math.floor(seconds / WEEK), 'week'));
      seconds = seconds % WEEK;
    }
    if (seconds > DAY) {
      buf.push(this.pluralize(Math.floor(seconds / DAY), 'day'));
      seconds = seconds % DAY;
    }
    if (seconds > HOUR) {
      buf.push(this.pluralize(Math.floor(seconds / HOUR), 'hour'));
      seconds = seconds % HOUR;
    }
    if (seconds > MINUTE) {
      buf.push(this.pluralize(Math.floor(seconds / MINUTE), 'minute'));
      seconds = seconds % MINUTE;
    }
    if (seconds > 0) {
      buf.push(this.pluralize(seconds, 'second'));
    }
    return buf.join(' ');
  }

}
