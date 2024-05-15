import { createReducer, on } from "@ngrx/store";
import { Customer } from "..";
import { addCustomer } from "../actions/customer.actions";

export const initialState: Customer = {
    firstName: '',
    lastName: '',
    emailId: '',
};

export const customerReducer = createReducer(
    initialState,
    on(addCustomer, (state, { request }) => {
        return {...state, customer: request};
    })
);