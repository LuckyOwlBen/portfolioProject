import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavViewComponent } from './views/sidenav-view/sidenav-view/sidenav-view.component';
import { clearLocalStorage } from './ngrx';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    SidenavViewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolioProject';
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    clearLocalStorage();
  }
}
