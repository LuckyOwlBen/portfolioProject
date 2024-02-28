import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvailabilityService } from '../../api-services/api-service/api.service';
import { AvailabilityRequest } from '../../http_models/requests/availability-request';
import { Router } from '@angular/router';
import { AvailabilityResponse, CalendarEntry } from '../../http_models/responses/availability-response';
import { addDays, format } from 'date-fns';
import { CalendarComponent } from '../../components/calendar-component/calendar/calendar.component';
import { SchedulerComponent } from '../../components/scheduler/scheduler.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-schedule-appointment-view',
  standalone: true,
  imports: [
    CalendarComponent,
    SchedulerComponent,
    NgIf,
  ],
  templateUrl: './schedule-appointment-view.component.html',
  styleUrl: './schedule-appointment-view.component.scss'
})
export class ScheduleAppointmentViewComponent implements OnInit {
  availabilityMap: Map<String, CalendarEntry> = new Map<String, CalendarEntry>();
  @Input()
  calendarEntry!: CalendarEntry | null;
  constructor(
    private availabilityService: AvailabilityService,
    private router: Router,
  ) { };
  ngOnInit(): void {
    this.availabilityService
      .callApi(null, this.generateAvailabilityRequest(format(new Date(), "yyyy/MM/d"), format(addDays(new Date(), 30), "yyyy/MM/d")))
      .pipe()
      .subscribe({
        next: (availabilityResponse: AvailabilityResponse) => {
          availabilityResponse.calendarEntries.forEach(entry => {
            entry.availabilityMap = new Map<number, number>(
              Object.entries(entry.availabilityMap).map(([k, v]) => [+k, +v])
            )
            this.availabilityMap.set(entry.date, entry);
          })
        },
        error: (error: any) => {
          this.router.navigate(['/error'])
          console.log(error);
        },
      }
      );
  }

  generateAvailabilityRequest(date1: String, date2: String): AvailabilityRequest {
    return {
      firstDate: date1,
      secondDate: date2,
    } as AvailabilityRequest;
  }

  populateSelectedAvailabilityMap(selectedDayAvailability: CalendarEntry | null) {
    this.calendarEntry = selectedDayAvailability;
  }
}
