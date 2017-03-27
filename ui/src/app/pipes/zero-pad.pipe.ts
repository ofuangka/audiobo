import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroPad'
})
export class ZeroPadPipe implements PipeTransform {

  transform(value: any, totalDigits: number): any {
    let ret = '' + value;
    while (ret.length < totalDigits) {
      ret = '0' + ret;
    }
    return ret;
  }

}
