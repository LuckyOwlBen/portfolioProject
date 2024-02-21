import { Store } from "@ngrx/store";
import { AppState } from "./state";
import { AddCustomerRequest } from "../http_models/requests/add-customer-request";
import { addCustomerCall } from "./actions";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ActionDispatcher {
    constructor(private store: Store<{appState: AppState}>) {}

    public addCustomer(addCustomerRequest: AddCustomerRequest) {
        this.store.dispatch(addCustomerCall({addCustomerRequest}));
    }
}