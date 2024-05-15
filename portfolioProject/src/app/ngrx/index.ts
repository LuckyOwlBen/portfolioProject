import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { customerReducer } from './reducers/customer.reducer';
import { authenticationReducer } from './reducers/authentication.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { isPlatformBrowser } from '@angular/common';

export interface State {
  customer: Customer;
  authentication: Authentication;
}

export interface Customer {
  firstName: String;
  lastName: String;
  emailId: String;
};

export interface Authentication {
  jobId: String,
  jwt: String,
}

export const selectCustomerState = 
  createFeatureSelector<Customer>('customer');
export const customerSelector = createSelector(
  selectCustomerState,
  (state: Customer) => state
);

export const selectAuthenticationState =
  createFeatureSelector<Authentication>('authentication');

export const authenticationSelector = createSelector(
  selectAuthenticationState,
  (state: Authentication) => state
);

export const reducers: ActionReducerMap<State> = {
  customer: customerReducer,
  authentication: authenticationReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['customer', 'authentication'],
    rehydrate: true,
    checkStorageAvailability: true,
  })(reducer);
}
export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];
