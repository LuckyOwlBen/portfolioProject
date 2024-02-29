import { Component, Input, OnInit, inject } from '@angular/core';
import { AppointmentService, AvailabilityService } from '../../api-services/api-service/api.service';
import { AvailabilityRequest } from '../../http_models/requests/availability-request';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AvailabilityResponse, CalendarEntry } from '../../http_models/responses/availability-response';
import { addDays, compareAsc, compareDesc, format } from 'date-fns';
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
  calendarEntry!: CalendarEntry | null;
  firstAvailableDate: Date = addDays(new Date(), 1);
  lastDateQueried: Date = addDays(new Date(), 30);
  selectedDate: Date | null = null;

  constructor(
    private availabilityService: AvailabilityService,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { };
  ngOnInit(): void {
    this.callAvailabilityService(this.firstAvailableDate, this.lastDateQueried);
  }

  generateAvailabilityRequest(date1: String, date2: String): AvailabilityRequest {
    return {
      firstDate: date1,
      secondDate: date2,
    } as AvailabilityRequest;
  }

  populateSelectedDate(selectedDayAvailability: Date | null): void {
    selectedDayAvailability
      ? this.processSelectedDate(selectedDayAvailability)
      : this.calendarEntry = null;
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

  retrieveOrGenerateCalendarEntry(selectedDate: Date): void {
    let calendarEntry = this.availabilityMap.get(format(new Date(selectedDate), "yyyy-MM-dd"));
    if(calendarEntry == undefined) {
      calendarEntry = {
        date: format(new Date(selectedDate), "yyyy-MM-dd"),
        availabilityMap: new Map().set(1, 0).set(2, 0).set(3,0).set(4,0),
      } as CalendarEntry
    }
    this.calendarEntry = calendarEntry;
  }

  mapResponseToAvailabilityMap(availabilityResponse: AvailabilityResponse): void {
    availabilityResponse.calendarEntries.forEach(entry => {
      entry.availabilityMap = new Map<number, number>(
        Object.entries(entry.availabilityMap).map(([k, v]) => [+k, +v])
      )
      this.availabilityMap.set(entry.date, entry);
    })
  }

  processSelectedDate(date: Date): void {
    this.selectedDate = date;
    compareDesc(this.lastDateQueried, date) == 1
      ? this.callAvailabilityService(this.lastDateQueried, date)
      : this.retrieveOrGenerateCalendarEntry(date);
  }

  callAvailabilityService(firstDate: Date, secondDate: Date): void {
    this.availabilityService
      .callApi(null, this.generateAvailabilityRequest(format(firstDate, "yyyy/MM/d"), format(secondDate, "yyyy/MM/d")))
      .pipe()
      .subscribe({
        next: (availabilityResponse: AvailabilityResponse) => {
          this.mapResponseToAvailabilityMap(availabilityResponse);
          this.lastDateQueried = secondDate;
          if(this.selectedDate !== null) {
            this.retrieveOrGenerateCalendarEntry(this.selectedDate);
          }
        },
        error: (error: any) => {
          this.router.navigate(['/error'])
          console.log(error);
        },
      }
    );
  }
}
