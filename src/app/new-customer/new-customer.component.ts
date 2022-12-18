import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  newCustomerFormGroup!: FormGroup

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      nom: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.email, Validators.required])
    })
  }

  handleSaveCustomer(){
    let customer: Customer = this.newCustomerFormGroup?.value

    this.customerService.saveCustomer(customer).subscribe({
      next : data => {
        alert("Customer has been succesfully saved!")
        console.log("Nom: " + data.nom + " Email: " + data.email)
        this.router.navigateByUrl("/customers")
      },
      error(err) {
        console.log(err)
      },
    })
  }

}
