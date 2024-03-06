import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SchedulerComponent } from './scheduler.component';
import { CalendarEntry } from '../../http_models/responses/availability-response';
import { ScheduleAppointmentRequest } from '../../http_models/requests/appointment-request';

describe('SchedulerComponent', () => {
  let component: SchedulerComponent;
  let fixture: ComponentFixture<SchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulerComponent);
    component = fixture.componentInstance;
    component.calendarEntry = {
      date: '2021-01-01',
      availabilityMap: new Map<number, number>([[1, 1], [2, 0], [3, 1]])
    } as CalendarEntry;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined calendarEntry', () => {
    component.calendarEntry = {} as CalendarEntry;
    expect(component.calendarEntry).toBeDefined();
  });

  it('should emit appointmentRequest event when bookAppointment is called', () => {
    spyOn(component.appointmentRequest, 'emit');
    const slot = 1;
    component.bookAppointment(slot);
    expect(component.appointmentRequest.emit).toHaveBeenCalledWith(
      { year: 2021, month: 1, day: 1, timeslot: 1, jobId: '' } as ScheduleAppointmentRequest);
  });

  it('should return true or false when checkAvailability is called', () => {
    const slot = 1;
    const result = component.checkAvailability(slot);
    expect(result).toBeInstanceOf(Boolean);
  });
});