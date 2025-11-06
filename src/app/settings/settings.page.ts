import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonInput, IonToggle, IonButton, IonIcon, IonSelect,
  IonSelectOption, IonCard, IonCardContent, IonAvatar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  person, mail, fitness, scale, save, logOut, moon, notifications,
  trophy, restaurant
} from 'ionicons/icons';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonToggle, IonButton, IonIcon,
    IonSelect, IonSelectOption, IonCard, IonCardContent, IonAvatar
  ]
})
export class SettingsPage {
  user = this.authService.currentUser;
  isDarkMode = this.themeService.isDarkMode;
  notificationsEnabled = signal(true);

  // Form fields
  name = signal('');
  email = signal('');
  age = signal<number | undefined>(undefined);
  weight = signal<number | undefined>(undefined);
  height = signal<number | undefined>(undefined);
  fitnessGoal = signal<'lose_weight' | 'gain_muscle' | 'stay_fit' | 'endurance'>('stay_fit');
  dailyStepGoal = signal<number>(10000);
  dailyCalorieGoal = signal<number>(2000);

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    addIcons({ person, mail, fitness, scale, save, logOut, moon, notifications, trophy, restaurant });
    this.loadUserData();
  }

  loadUserData() {
    const currentUser = this.user();
    if (currentUser) {
      this.name.set(currentUser.name);
      this.email.set(currentUser.email);
      this.age.set(currentUser.age);
      this.weight.set(currentUser.weight);
      this.height.set(currentUser.height);
      this.fitnessGoal.set(currentUser.fitnessGoal || 'stay_fit');
      this.dailyStepGoal.set(currentUser.dailyStepGoal || 10000);
      this.dailyCalorieGoal.set(currentUser.dailyCalorieGoal || 2000);
    }
  }

  async saveProfile() {
    await this.authService.updateProfile({
      name: this.name(),
      age: this.age(),
      weight: this.weight(),
      height: this.height(),
      fitnessGoal: this.fitnessGoal(),
      dailyStepGoal: this.dailyStepGoal(),
      dailyCalorieGoal: this.dailyCalorieGoal()
    });
  }

  async toggleDarkMode() {
    await this.themeService.toggleDarkMode();
  }

  async logout() {
    await this.authService.logout();
  }

  getBMI(): string {
    const weight = this.weight();
    const height = this.height();
    if (!weight || !height) return '--';
    const bmi = weight / Math.pow(height / 100, 2);
    return bmi.toFixed(1);
  }

  getFitnessGoalLabel(goal: string): string {
    const labels: Record<string, string> = {
      'lose_weight': 'Lose Weight',
      'gain_muscle': 'Gain Muscle',
      'stay_fit': 'Stay Fit',
      'endurance': 'Build Endurance'
    };
    return labels[goal] || goal;
  }
}
