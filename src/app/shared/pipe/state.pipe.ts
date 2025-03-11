import { Pipe, PipeTransform } from '@angular/core';
import { stateValues } from '../constant/state.values';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {

  transform(value: number | null): unknown {
    if(value == null){
      return ''
    }
    const state = stateValues.find(state => state.key == value)
    return state ? state.value : '';
  }

}
