import { Injectable } from "@angular/core";
import { addCustomerCall, addCustomerFailure, addCustomerSuccess } from "./actions";
import { CustomerService } from "../api-services/customer-service";
import { ActionsSubject } from "@ngrx/store";
import { Observable, catchError, map, mergeMap, of } from "rxjs";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AddCustomerRequest } from "../http_models/requests/add-customer-request";

@Injectable()
export class CutomerEffects {
    addCustomer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addCustomerCall),
            mergeMap(action =>
                this.customerService.addCustomer(action.addCustomerRequest).pipe(
                    map(addCustomerResponse => addCustomerSuccess({ addCustomerResponse })),
                    catchError(error => of(addCustomerFailure({ error })))
                )
            )
        )
    );

    constructor(private actions$: ActionsSubject, private customerService: CustomerService) {}
}