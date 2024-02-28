import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarEntry } from '../../../http_models/responses/availability-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { format } from 'date-fns';
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
  availabilityEmitter: EventEmitter<CalendarEntry | null> = new EventEmitter();
  @Input({required: true})
  calendarData: Map<String, CalendarEntry> = new Map<String, CalendarEntry>();
  calendarForm: FormGroup = this.formBuilder.group({
    dateInput: ['', Validators.required],
    slotInput: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder,){}

  selectDate($event: MatDatepickerInputEvent<Date>) {
    const selectedDate = $event.value;
    const calendarEntry = selectedDate
      ? this.calendarData.get(format(new Date(selectedDate), "yyyy-MM-dd"))
      : null;
      this.emitCurrentAvailibilityMap(calendarEntry);
  }

  emitCurrentAvailibilityMap(availabilityMap: CalendarEntry | null | undefined): void {
    this.availabilityEmitter.emit(availabilityMap);
  }
}
