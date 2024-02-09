import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-view',
  standalone: true,
  imports: [
  ],
  templateUrl: './landing-view.component.html',
  styleUrl: './landing-view.component.scss'
})
export class LandingViewComponent {
  constructor(private router: Router){}
  submit() {
    this.router.navigateByUrl('/customerInfo');
  }
}
