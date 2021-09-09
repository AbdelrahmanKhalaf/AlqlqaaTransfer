import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<any>): any {
   if (!value) return false 
   return value.sort((a,b)=>{
    let x = new Date(a.outDate).getTime()
    let y = new Date(b.outDate).getTime()
    if(y>x){
      return 1
    
  }else{
    return -1
  }
  return 0

  })
  }

}
