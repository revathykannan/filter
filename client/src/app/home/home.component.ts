import { Component, OnInit } from '@angular/core';
import { EmpService } from '../emp.service'
import { Employee } from '../employee'
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Search Data';
  name="";
  position="";
  department="";
  salary="";

  constructor(public empService:EmpService , public http:Http) { }

  ngOnInit() {
    this.getEmployees();
  }
  
  employees:Employee;
  
  getEmployees(){
    this.empService.getEmployees()
        .subscribe(employees => {
          this.employees = employees;
        });
  }
  deleteEmployee(id){
    this.empService.deleteEmployee(id)
      .subscribe(()=>{
        this.getEmployees();
      });
  }
  searchEmployee(name,position,department,salary){
    this.empService.searchEmployee(name,position,department,salary)
    .subscribe(employees => {
      this.employees = employees;
    });
  }
  clear(){
    this.name="";
    this.position="";
    this.department="";
    this.salary="";
    this.empService.getEmployees()
    .subscribe(employees => {
      this.employees = employees;
    });
  }

}