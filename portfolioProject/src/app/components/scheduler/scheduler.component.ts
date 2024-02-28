import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarEntry } from '../../http_models/responses/availability-response';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { ScheduleAppointmentRequest } from '../../http_models/requests/appointment-request';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  providers: [],
  imports: [
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss'
})
export class SchedulerComponent {
  @Input({required: true})
  calendarEntry!: CalendarEntry;

  @Output()
  appointmentRequest: EventEmitter<ScheduleAppointmentRequest> = new EventEmitter();

  checkAvailability(slot: number): boolean {
    return this.calendarEntry.availabilityMap.get(slot) === 1;
  }

  bookAppointment(slot: number): void {
    let date = this.calendarEntry.date.split("-");
    this.appointmentRequest.emit({
      year: Number.parseInt(date[0]),
      month: Number.parseInt(date[1]),
      day: Number.parseInt(date[2]),
      timeslot: slot,
      jobId: '',
      } as ScheduleAppointmentRequest
    );
  }
}
