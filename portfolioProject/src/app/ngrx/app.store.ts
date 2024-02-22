import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

interface AppState {
    customer: Customer
};

export interface Customer {
    firstName: String;
    lastName: String;
    emailId: String;
    //jobId: String;
};

const initialState:
AppState = {
    customer: {
        firstName: '',
        lastName: '',
        emailId: '',
    },
};

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
       updateCustomer(customer: Customer) {
            patchState(store, () =>({customer: customer}));
       }
    }))
);