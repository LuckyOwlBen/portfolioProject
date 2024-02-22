import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddCustomerResponse } from "../http_models/responses/add-customer-response";
import { AddCustomerRequest } from "../http_models/requests/add-customer-request";

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    private apiUrl = 'http://localhost:8080/addCustomer'
    constructor(private http: HttpClient) {};

    addCustomer(addCustomerRequest: AddCustomerRequest): Observable<AddCustomerResponse> {
        return this.http.post<AddCustomerResponse>(this.apiUrl, addCustomerRequest);
    }
}