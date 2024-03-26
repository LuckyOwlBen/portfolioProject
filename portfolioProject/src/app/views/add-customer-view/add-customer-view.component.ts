import { Component, inject } from '@angular/core';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { AddCustomerRequest } from '../../http_models/requests/add-customer-request';
import { CustomerService } from '../../api-services/api-service/api.service';
import { AddCustomerResponse } from '../../http_models/responses/add-customer-response';
import { AppStore, Authentication, Customer } from '../../ngrx/app.store';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-customer-view',
  standalone: true,
  imports: [
    CustomerFormComponent
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

  readonly store = inject(AppStore);
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { };

  addCustomer(addCustomerRequest: AddCustomerRequest) {
    this.customerService
      .callApi(addCustomerRequest, null)
      .pipe()
      .subscribe({
        next: (addCustomerResponse: AddCustomerResponse) => {
          this.store.updateCustomer(this.generateCustomerObjectFromRequest(addCustomerRequest));
          this.store.updateAuthentication(this.generateAuthenticationObjectFromResponse(addCustomerResponse));
          this.router.navigate(['/appointments'], { relativeTo: this.route })
        },
        error: () => { this.router.navigate(['/error'], { relativeTo: this.route }) }
      },
      );
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
