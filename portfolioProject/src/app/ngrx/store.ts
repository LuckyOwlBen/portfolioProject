import { Injectable } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { customerReducer } from "./reducer";

@Injectable({
    providedIn: 'root',
    useFactory: () => StoreModule.forRoot({ reducer: customerReducer }),
})
export class StoreService {}
