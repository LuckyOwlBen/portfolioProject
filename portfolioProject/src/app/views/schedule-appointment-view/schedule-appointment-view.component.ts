import { Component, Input, OnInit, inject } from '@angular/core';
import { AppointmentService, AvailabilityService } from '../../api-services/api-service/api.service';
import { AvailabilityRequest } from '../../http_models/requests/availability-request';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AvailabilityResponse, CalendarEntry } from '../../http_models/responses/availability-response';
import { addDays, format } from 'date-fns';
import { CalendarComponent } from '../../components/calendar-component/calendar/calendar.component';
import { SchedulerComponent } from '../../components/scheduler/scheduler.component';
import { NgIf } from '@angular/common';
import { ScheduleAppointmentRequest } from '../../http_models/requests/appointment-request';
import { ScheduleAppointmentResponse } from '../../http_models/responses/appointment-response';
import { AppStore } from '../../ngrx/app.store';

@Component({
  selector: 'app-schedule-appointment-view',
  standalone: true,
  imports: [
    CalendarComponent,
    SchedulerComponent,
    NgIf,
  ],
  providers: [
    Router,
  ],
  templateUrl: './schedule-appointment-view.component.html',
  styleUrl: './schedule-appointment-view.component.scss'
})
export class ScheduleAppointmentViewComponent implements OnInit {

  readonly store = inject(AppStore);
  availabilityMap: Map<String, CalendarEntry> = new Map<String, CalendarEntry>();
  @Input()
  calendarEntry!: CalendarEntry | null;
  constructor(
    private availabilityService: AvailabilityService,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
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

  bookAppointment($event: ScheduleAppointmentRequest) {
    $event.jobId = this.store.authentication.jobId().valueOf();
    this.appointmentService.callApi($event, null)
      .pipe()
      .subscribe({
        next: (scheduleAppointmentResponse: ScheduleAppointmentResponse) => {
          scheduleAppointmentResponse.success
            ? this.router.navigate(['/thanks'], { relativeTo: this.route })
            : this.router.navigate(['/error'], { relativeTo: this.route });
        },
        error: () =>{
          this.router.navigate(['/error'], { relativeTo: this.route })
        }
      }
    );
  }
}
