import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddCustomerResponse } from "../../http_models/responses/add-customer-response";
import { AddCustomerRequest } from "../../http_models/requests/add-customer-request";
import { ApiService } from "../api-service/api.service";

@Injectable({
    providedIn: 'root',
})
export class CustomerService extends ApiService {

    private endpoint = '/addCustomer'
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }
    addCustomer(addCustomerRequest: AddCustomerRequest): Observable<AddCustomerResponse> {
        return this.http.post<AddCustomerResponse>(this.apiUrl + this.endpoint, addCustomerRequest);
    }
}