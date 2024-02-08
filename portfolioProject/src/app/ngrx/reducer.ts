import { createReducer, on } from '@ngrx/store';
import { addCustomerSuccess, addCustomerFailure } from './actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AddCustomerResponse } from '../http_models/responses/add-customer-response';

export interface CustomerState extends EntityState<AddCustomerResponse>{}

export const adapter: EntityAdapter<AddCustomerResponse> = createEntityAdapter<AddCustomerResponse>();

export const initialState: CustomerState = adapter.getInitialState();

export const customerReducer = createReducer(
    initialState,
    on(addCustomerSuccess, (state, { addCustomerResponse }) => adapter.addOne(addCustomerResponse, state)),
    on(addCustomerSuccess, (state, { addCustomerResponse }) => adapter.addOne(addCustomerResponse, state)),
);

export const { selectAll } = adapter.getSelectors();