import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>
  errorMessage!: string
  searchFormGroup!: FormGroup
  constructor(private customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
    this.customers = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err)
      })
    );
  }

  handleSearchCustomers(){
    let kw = this.searchFormGroup?.value.keyword
    console.log(kw)
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err)
      })
    )
  }

  handleDeleteCustomer(c: Customer) {
    if(confirm("Voulez-vous supprimer ce client ?") == true){
      this.customerService.deleteCustomer(c.id).subscribe({
        next: (resp) => {
          console.log(resp.toString)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}