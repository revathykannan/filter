import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map' ;

@Injectable()
export class EmpService {

  constructor( private http:Http) { }
  getEmployees(){
    return this.http.get("/api/employees")
        .map(res => res.json());
  }
   addEmployee(info){
    return this.http.post("/api/employees",info)
        .map(res => res.json());
  }
  getEmployee(id){
    return this.http.get("/api/employees/"+id)
        .map(res => res.json());
  }
  deleteEmployee(id){
    return this.http.delete("/api/employees/"+id)
        .map(res => res.json());
  }
  updateEmployee(id, info){
    return this.http.put("/api/employees/"+id,info)
        .map(res => res.json());
  }
  searchEmployee(name,position,department,salary){
      return this.http.get('/?name='+name+'&position='+position+'&department='+department+'&salary='+salary)
      .map(res => res.json());
  }
}
