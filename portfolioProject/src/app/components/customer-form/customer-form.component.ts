import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionDispatcher } from '../../ngrx/action.dispatcher';
import { AddCustomerRequest } from '../../http_models/requests/add-customer-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {

  customerForm: FormGroup = this.formBuilder.group({
    firstNameInput: ['', Validators.required],
    //lastNameInput: ['', Validators.required],
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private actionDispatcher: ActionDispatcher,   
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.customerForm.valid
    ? this.actionDispatcher.addCustomer(this.generateAddCustomerRequest())
    : console.log("Error Scenario");
  }

  generateAddCustomerRequest(): AddCustomerRequest {
    let request = {} as AddCustomerRequest;
    request.firstName = '';
    request.lastName = '';
    request.emailId = '';
    return request;
  }

  isInvalid(): boolean {
    return this.customerForm.get('firstNameInput')?.dirty 
    && this.customerForm.get('firstNameInput')?.errors
    && this.customerForm.get('firstNameInput')?.errors?.['required']
  }
}
