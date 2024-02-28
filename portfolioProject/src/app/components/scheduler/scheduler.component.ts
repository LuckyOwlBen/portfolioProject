import { Component, Input } from '@angular/core';
import { CalendarEntry } from '../../http_models/responses/availability-response';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-scheduler',
  standalone: true,
  providers: [],
  imports: [
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss'
})
export class SchedulerComponent {
  @Input({required: true})
  calendarEntry!: CalendarEntry;

  checkAvailability(slot: number): boolean {
    return this.calendarEntry.availabilityMap.get(slot) === 1;
  }

  bookAppointment() {
    
  }
}
