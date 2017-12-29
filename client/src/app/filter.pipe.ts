import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(employees: any[], name: string): any {
    if(name === undefined) return employees;
    return employees.filter(function(employee){
      return employee.name.toLowerCase().includes(name.toLowerCase());
    }) 
  }
  

}
