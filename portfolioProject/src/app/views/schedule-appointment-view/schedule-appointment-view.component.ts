import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from '../../api-services/api-service/api.service';
import { AvailabilityRequest } from '../../http_models/requests/availability-request';
import { Router } from '@angular/router';
import { AvailabilityResponse } from '../../http_models/responses/availability-response';

@Component({
  selector: 'app-schedule-appointment-view',
  standalone: true,
  imports: [],
  templateUrl: './schedule-appointment-view.component.html',
  styleUrl: './schedule-appointment-view.component.scss'
})
export class ScheduleAppointmentViewComponent implements OnInit {

  constructor(
    private availabilityService: AvailabilityService,
    private router: Router,
  ) {};
  ngOnInit(): void {
    this.availabilityService
      .callApi(null, this.generateAvailabilityRequest('2024/2/26', '2024/3/26'))
      .pipe()
      .subscribe({
        next: (availabilityResponse: AvailabilityResponse) => {
          console.log(availabilityResponse);
        },
        error: (error: any) => this.router.navigate(['/error']),
      }
      );
  }

  generateAvailabilityRequest(date1: String, date2: String): AvailabilityRequest {
    return {
      firstDate: date1,
      secondDate: date2,
    } as AvailabilityRequest;
  }

}
