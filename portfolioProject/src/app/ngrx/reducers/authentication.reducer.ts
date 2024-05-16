import { createReducer, on } from "@ngrx/store";
import { Authentication } from "..";
import { addCustomerSuccess } from "../actions/customer.actions";

export const initialState: Authentication = {
    jobId: '',
    jwt: '',
};

export const authenticationReducer = createReducer(
    initialState,
    on(addCustomerSuccess,
        (state, { response }) => {
            return {...state, jobId: response.jobId, jwt: response.token};
    })
);