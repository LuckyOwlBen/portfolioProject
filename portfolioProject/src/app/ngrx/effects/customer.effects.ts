import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { CustomerService } from "../../api-services/api-service/api.service";
import { addCustomer, addCustomerFailure, addCustomerSuccess } from "../actions/customer.actions";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class CustomerEffects {

    addCustomer$ = createEffect(() => this.actions$.pipe(
        ofType(addCustomer),
        mergeMap(action => this.customerService.callApi(action.request, null)
            .pipe(
                map(customer => {
                    this.router.navigate(['/appointments'], { relativeTo: this.route })
                    return addCustomerSuccess({ response: customer })
                }),
                catchError(error => {
                    this.router.navigate(['/error'], { relativeTo: this.route })
                    return of(addCustomerFailure({ error }))
                })
            )
        )));

    constructor(
        private actions$: Actions,
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }
}