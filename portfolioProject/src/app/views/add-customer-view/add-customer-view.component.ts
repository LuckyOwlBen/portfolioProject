import { Component, ViewChild } from '@angular/core';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionDispatcher } from '../../ngrx/action.dispatcher';
import { AppState } from '../../ngrx/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-customer-view',
  standalone: true,
  imports: [
    CustomerFormComponent
  ],
  templateUrl: './add-customer-view.component.html',
  styleUrl: './add-customer-view.component.scss'
})
export class AddCustomerViewComponent {
  constructor(){};
}
