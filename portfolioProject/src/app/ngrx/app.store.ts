import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

interface AppState {
    customer: Customer,
    authentication: Authentication,
};

export interface Customer {
    firstName: String;
    lastName: String;
    emailId: String;
};

export interface Authentication {
    jobId: String,
    jwt: String,
}

const initialState:
AppState = {
    customer: {
        firstName: '',
        lastName: '',
        emailId: '',
    },
    authentication: {
        jobId: '',
        jwt: '',
    }
};

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
       updateCustomer(customer: Customer) {
            patchState(store, () =>({customer: customer}));
       },
       updateAuthentication(authentication: Authentication) {
        patchState(store, () => ({authentication: authentication}))
       }
    }))
);