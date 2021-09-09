import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if(!value) return false
  const services = ['services factories', 'services factories, companies', 'Air conditioning maintenance', 'Encapsulation', 'Furniture maintenance', 'Insect extermination', 'Laborers', 'Storage', 'Unpack and install the air conditioners', 'Unpack and install the furniture', 'Winches', 'the cars'];
  const filterValue:any[] =[]
  for (let index = 0; index < services.length; index++) {
    const element = value[index];
      if (value != services[index]) 
      filterValue.push(services[index] != value)
      
  }
  console.log(filterValue);

    if(value != services) {

    }
    let catgServices = (args) ? args : ['services factories', 'services factories, companies', 'Air conditioning maintenance', 'Encapsulation', 'Furniture maintenance', 'Insect extermination', 'Laborers', 'Storage', 'Unpack and install the air conditioners', 'Unpack and install the furniture', 'Winches', 'the cars'];
    const calue = catgServices.forEach(element => {
      console.log(element);

    });
    return value;

  }

}
