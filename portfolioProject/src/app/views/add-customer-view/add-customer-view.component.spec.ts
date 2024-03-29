import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerViewComponent } from './add-customer-view.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

describe('AddCustomerViewComponent', () => {
  let component: AddCustomerViewComponent;
  let fixture: ComponentFixture<AddCustomerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerViewComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCustomerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
