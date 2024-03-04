import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-sidenav-view',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './sidenav-view.component.html',
  styleUrl: './sidenav-view.component.scss'
})
export class SidenavViewComponent {

}
