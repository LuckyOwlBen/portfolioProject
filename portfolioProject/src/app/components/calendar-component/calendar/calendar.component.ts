import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  selectedDate: Date = new Date();
  @Output()
  dateEmitter: EventEmitter<Date | null> = new EventEmitter();
  @Input({required: true})
  minDate!: Date;

  calendarForm: FormGroup = this.formBuilder.group({
    dateInput: ['', Validators.required],
    slotInput: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder,){}

  selectDate($event: MatDatepickerInputEvent<Date>) {
      this.emitSelectedDate($event.value);
  }

  emitSelectedDate(selectedDate: Date | null | undefined): void {
    this.dateEmitter.emit(selectedDate);
  }

}
