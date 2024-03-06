import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouViewComponent } from './thank-you.component';

describe('ThankYouComponent', () => {
  let component: ThankYouViewComponent;
  let fixture: ComponentFixture<ThankYouViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThankYouViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThankYouViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
