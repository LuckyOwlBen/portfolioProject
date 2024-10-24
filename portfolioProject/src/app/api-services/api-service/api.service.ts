import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCustomerRequest } from '../../http_models/requests/add-customer-request';
import { AddCustomerResponse } from '../../http_models/responses/add-customer-response';
import { AvailabilityRequest } from '../../http_models/requests/availability-request';
import { AvailabilityResponse } from '../../http_models/responses/availability-response';
import { ScheduleAppointmentRequest } from '../../http_models/requests/appointment-request';
import { ScheduleAppointmentResponse } from '../../http_models/responses/appointment-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class CallApi <Request, Response, Headers extends { [key: string]: any; } | null> {

  abstract endpoint: string;
  protected apiUrl = environment.apiUrl;
  constructor(protected http: HttpClient) {};

  callApi(apiRequest: Request, headers: Headers): Observable<Response> {
    let httpHeaders = new HttpHeaders();
    if(headers) {
      const headerMap: {[key: string]: any} = headers;
      for(let key in headerMap) {
        httpHeaders = httpHeaders.set(key, headerMap[key]);
      }
    }
    return apiRequest 
      ? this.http.post<Response>(this.apiUrl + this.endpoint, apiRequest, {headers: httpHeaders})
      : this.http.get<Response>(this.apiUrl + this.endpoint, {headers: httpHeaders});
  }
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CallApi<AddCustomerRequest, AddCustomerResponse, null> {
  endpoint = '/addCustomer';
}

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService extends CallApi<null, AvailabilityResponse, AvailabilityRequest> {
  endpoint = '/checkAvailability'
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends CallApi<ScheduleAppointmentRequest, ScheduleAppointmentResponse, null> {
  endpoint = '/scheduleAppointment'
}
