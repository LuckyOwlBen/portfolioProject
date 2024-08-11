import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { clearLocalStorage } from '../../ngrx';

@Component({
  selector: 'app-landing-view',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
  ],
  templateUrl: './landing-view.component.html',
  styleUrl: './landing-view.component.scss'
})
export class LandingViewComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
    clearLocalStorage();
  }
  submit() {
    this.router.navigateByUrl('/customerInfo');
  }
}
