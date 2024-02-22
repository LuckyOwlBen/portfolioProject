import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { AddCustomerRequest } from "../http_models/requests/add-customer-request";
import { CustomerService } from "../api-services/customer-service";

type AppState = {
    customer: Customer
};

export type Customer = {
    firstName: String;
    lastName: String;
    emailId: String;
    jobId: String;
}

const initialState: AppState = {
    customer: {
        firstName: '',
        lastName: '',
        emailId: '',
        jobId: '',
    }
}

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) =>({
        updateCustomer(newCustomer: Customer) {
            patchState(store, {customer: newCustomer});
        }
    }))
);