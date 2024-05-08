import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCustomerRequest } from '../../http_models/requests/add-customer-request';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {

  customerForm: FormGroup = this.formBuilder.group({
    firstNameInput: ['', Validators.required],
    lastNameInput: ['', Validators.required],
    emailAddressInput: ['', Validators.required],
  });

  @Output()
  addCustomerEvent: EventEmitter<AddCustomerRequest> = new EventEmitter();

  
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.customerForm.valid
    ? this.generateAddCustomerRequest()
    : console.log("Error Scenario");
  }

  generateAddCustomerRequest(): void {
    let request = {} as AddCustomerRequest;
    request.firstName = this.customerForm.get('firstNameInput')?.value;
    request.lastName = this.customerForm.get('lastNameInput')?.value;
    request.emailId = this.customerForm.get('emailAddressInput')?.value;
    this.addCustomerEvent.emit(request);
  }

  isInvalid(fieldName: string): boolean {
    return this.customerForm.get(fieldName)?.dirty 
    && this.customerForm.get(fieldName)?.errors
    && this.customerForm.get(fieldName)?.errors?.['required']
  }
}
