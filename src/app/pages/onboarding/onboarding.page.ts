import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  background = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80)'
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signUp() {
    this.router.navigate(['/signup']);
  }
}
