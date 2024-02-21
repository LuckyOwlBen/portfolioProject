import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-view',
  standalone: true,
  imports: [
    MatButton,
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
