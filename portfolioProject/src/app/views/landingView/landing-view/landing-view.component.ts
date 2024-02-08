import { Component } from '@angular/core';
import { SchedulerComponent } from '../../../components/scheduler/scheduler/scheduler.component';

@Component({
  selector: 'app-landing-view',
  standalone: true,
  imports: [
    SchedulerComponent,
  ],
  templateUrl: './landing-view.component.html',
  styleUrl: './landing-view.component.scss'
})
export class LandingViewComponent {

}
