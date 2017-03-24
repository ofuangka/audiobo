import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hyphenZeroes'
})
export class HyphenZeroesPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace(/0/g, '-');
  }

}
