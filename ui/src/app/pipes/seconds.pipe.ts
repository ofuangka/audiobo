import { Pipe, PipeTransform } from '@angular/core';

let MINUTE = 60,
  HOUR = MINUTE * 60;
@Pipe({
  name: 'seconds'
})
export class SecondsPipe implements PipeTransform {

  transform(value: any): string {
    let ret = '';
    let remainder = parseInt(value);
    if (isNaN(remainder)) {
      return '0:00';
    } else {
      if (remainder > HOUR) {
        let hours = Math.floor(remainder / HOUR);
        ret += hours + ':';
        remainder = remainder % HOUR;
      }
      let minutes = Math.floor(remainder / MINUTE);
      if (minutes < 10 && ret) {
        ret += '0';
      }
      ret += minutes + ':';
      remainder = remainder % MINUTE;
      if (remainder < 10) {
        ret += '0';
      }
      ret += remainder;
      return ret;
    }
  }

}