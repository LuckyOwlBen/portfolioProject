import { Component, Input } from '@angular/core';
import { CalendarEntry } from '../../http_models/responses/availability-response';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  providers: [],
  imports: [
    MatExpansionModule,
    MatButtonModule,
  ],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss'
})
export class SchedulerComponent {
  @Input()
  calendarEntry!: CalendarEntry;

  checkAvailability(slot: number): boolean {
    return this.calendarEntry.availabilityMap.get(slot) === 1;
  }

  bookAppointment() {
    
  }
}
