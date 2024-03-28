import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degrees',
})
export class DegreesPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) {
      return value;
    }
    if (typeof value !== 'number') {
      try {
        value = +value;
      } catch (error) {
        return value;
      }
    }
    return value.toFixed(0);
  }
}
