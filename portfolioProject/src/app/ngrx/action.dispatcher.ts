import { Store } from "@ngrx/store";
import { AppState } from "./store";
import { AddCustomerRequest } from "../http_models/requests/add-customer-request";
import { addCustomerCall } from "./actions";

export class ActionDispatcher {
    constructor(private store: Store<AppState>) {}

    addCustomer(addCustomerRequest: AddCustomerRequest) {
        this.store.dispatch(addCustomerCall({addCustomerRequest}));
    }
}