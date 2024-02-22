import { Component, inject } from '@angular/core';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { AddCustomerRequest } from '../../http_models/requests/add-customer-request';
import { CustomerService } from '../../api-services/customer-service';
import { AddCustomerResponse } from '../../http_models/responses/add-customer-response';
import { AppStore, Customer } from '../../ngrx/app.store';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-customer-view',
  standalone: true,
  imports: [
    CustomerFormComponent
  ],
  providers: [
    HttpClient
  ],
  templateUrl: './add-customer-view.component.html',
  styleUrl: './add-customer-view.component.scss'
})
export class AddCustomerViewComponent {

  readonly store = inject(AppStore);
  constructor(
    private customerService: CustomerService,
  ){};
  
  addCustomer(addCustomerRequest: AddCustomerRequest) {
    this.customerService
      .addCustomer(addCustomerRequest)
        .pipe()
        .subscribe((addCustomerResponse: AddCustomerResponse) => {
          let customer: Customer = {
            firstName: addCustomerRequest.firstName,
            lastName: addCustomerRequest.lastName,
            emailId: addCustomerRequest.emailId,
            jobId: addCustomerResponse.jobId,
          }
          this.store.updateCustomer(customer);
      });
  }
}
