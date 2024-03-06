import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAppointmentViewComponent } from './schedule-appointment-view.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { AvailabilityResponse } from '../../http_models/responses/availability-response';
import { Router } from '@angular/router';
import { AvailabilityService } from '../../api-services/api-service/api.service';
import { of } from 'rxjs';

describe('ScheduleAppointmentViewComponent', () => {
  let component: ScheduleAppointmentViewComponent;
  let fixture: ComponentFixture<ScheduleAppointmentViewComponent>;
  let availabilityService: AvailabilityService;

  beforeEach(async () => {
    const availabilityServiceSpy = jasmine.createSpyObj('AvailabilityService', ['callApi']);
    availabilityServiceSpy.callApi.and.returnValue(of({
      calendarEntries: [
        {
          date: '2021-06-01',
          availabilityMap: new Map<number, number>().set(1,1),
        },
      ],
    } as AvailabilityResponse));
    await TestBed.configureTestingModule({
      imports: [ScheduleAppointmentViewComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: AvailabilityService, useValue: availabilityServiceSpy },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleAppointmentViewComponent);
    component = fixture.componentInstance;
    availabilityService = TestBed.inject(AvailabilityService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
