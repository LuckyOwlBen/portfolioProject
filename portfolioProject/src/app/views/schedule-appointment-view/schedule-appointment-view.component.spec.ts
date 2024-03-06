import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAppointmentViewComponent } from './schedule-appointment-view.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

describe('ScheduleAppointmentViewComponent', () => {
  let component: ScheduleAppointmentViewComponent;
  let fixture: ComponentFixture<ScheduleAppointmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleAppointmentViewComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleAppointmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
