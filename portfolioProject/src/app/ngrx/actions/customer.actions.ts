import { createAction, props } from "@ngrx/store";
import { AddCustomerRequest } from "../../http_models/requests/add-customer-request";
import { AddCustomerResponse } from "../../http_models/responses/add-customer-response";

export const addCustomer =
    createAction('[Customer Component] Add Customer',
    props<{request: AddCustomerRequest}>()
);

export const addCustomerSuccess = createAction('[Customer Component] Add Customer Success',
    props<{response: AddCustomerResponse}>()
);

export const addCustomerFailure = createAction('[Customer Component] Add Customer Failure',
    props<{error: any}>()
);
