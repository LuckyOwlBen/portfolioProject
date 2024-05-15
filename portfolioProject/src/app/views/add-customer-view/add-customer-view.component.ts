import { Component, inject } from '@angular/core';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { AddCustomerRequest } from '../../http_models/requests/add-customer-request';
import { CustomerService } from '../../api-services/api-service/api.service';
import { AddCustomerResponse } from '../../http_models/responses/add-customer-response';
import { AppStore, Authentication, Customer } from '../../ngrx/signal.store';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addCustomer } from '../../ngrx/actions/customer.actions';

@Component({
  selector: 'app-add-customer-view',
  standalone: true,
  imports: [
    CustomerFormComponent,
  ],
  providers: [
    HttpClient,
    Router,
    CustomerService,
  ],
  templateUrl: './add-customer-view.component.html',
  styleUrl: './add-customer-view.component.scss'
})
export class AddCustomerViewComponent {

  readonly store = inject(Store);
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { };

  addCustomer(addCustomerRequest: AddCustomerRequest) {
    this.store.dispatch(addCustomer({ request: addCustomerRequest }));
  }

  generateCustomerObjectFromRequest(addCustomerRequest: AddCustomerRequest): Customer {
    return {
      firstName: addCustomerRequest.firstName,
      lastName: addCustomerRequest.lastName,
      emailId: addCustomerRequest.emailId,
    } as Customer;
  }

  generateAuthenticationObjectFromResponse(addCustomerResponse: AddCustomerResponse): Authentication {
    return {
      jobId: addCustomerResponse.jobId,
      jwt: addCustomerResponse.token,
    } as Authentication;
  }
}
