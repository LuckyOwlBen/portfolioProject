import { createAction, props } from '@ngrx/store';
import { AddCustomerResponse } from '../http_models/responses/add-customer-response';
import { AppointmentResponse } from '../http_models/responses/appointment-response';
import { AddCustomerRequest } from '../http_models/requests/add-customer-request';

export const addCustomerCall = createAction('[Customer Component] Calling add customer',
    props<{addCustomerRequest: AddCustomerRequest}>());
export const addCustomerSuccess = createAction('[Customer Component] Add Customer Success',
    props<{addCustomerResponse: AddCustomerResponse}>());
export const addCustomerFailure = createAction('[Customer Component] Add Customer Failure',
    props<{error: any}>());
export const scheduleAppointmentCall = createAction('[Calendar Component] Calling Schedule Appointment',
    props<{appointmentResponse: AppointmentResponse}>());
export const scheduleAppointmentSuccess = createAction('[Calendar Component] Schedule Appointment Success',
    props<{appointmentResponse: AppointmentResponse}>());