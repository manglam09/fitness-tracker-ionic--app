import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonInput, IonIcon, IonText, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mail, lockClosed, person, fitness } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonInput, IonIcon, IonText, IonSpinner]
})
export class LoginPage {
  email = signal('');
  password = signal('');
  name = signal('');
  isSignupMode = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ mail, lockClosed, person, fitness });
  }

  async login() {
    if (!this.email() || !this.password()) {
      this.errorMessage.set('Please fill in all fields');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const success = await this.authService.login(this.email(), this.password());

    this.isLoading.set(false);

    if (success) {
      this.router.navigate(['/tabs/dashboard']);
    } else {
      this.errorMessage.set('Invalid email or password');
    }
  }

  async signup() {
    if (!this.email() || !this.password() || !this.name()) {
      this.errorMessage.set('Please fill in all fields');
      return;
    }

    if (this.password().length < 6) {
      this.errorMessage.set('Password must be at least 6 characters');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const success = await this.authService.signup(this.email(), this.password(), this.name());

    this.isLoading.set(false);

    if (success) {
      this.router.navigate(['/tabs/dashboard']);
    } else {
      this.errorMessage.set('Email already exists');
    }
  }

  toggleMode() {
    this.isSignupMode.set(!this.isSignupMode());
    this.errorMessage.set('');
  }

  handleSubmit() {
    if (this.isSignupMode()) {
      this.signup();
    } else {
      this.login();
    }
  }
}
