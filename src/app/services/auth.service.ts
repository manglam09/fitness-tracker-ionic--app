import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private storage: StorageService,
    private router: Router
  ) {
    this.initAuth();
  }

  private async initAuth() {
    const user = await this.storage.get<User>('current_user');
    if (user) {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    // Simulate API call
    // In real app, validate against backend
    const users = await this.storage.get<User[]>('users') || [];
    const user = users.find(u => u.email === email);

    if (user) {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      await this.storage.set('current_user', user);
      return true;
    }

    return false;
  }

  async signup(email: string, password: string, name: string): Promise<boolean> {
    try {
      const users = await this.storage.get<User[]>('users') || [];
      
      // Check if user exists
      if (users.find(u => u.email === email)) {
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        dailyStepGoal: 10000,
        dailyCalorieGoal: 2000,
        fitnessGoal: 'stay_fit'
      };

      users.push(newUser);
      await this.storage.set('users', users);
      
      this.currentUser.set(newUser);
      this.isAuthenticated.set(true);
      await this.storage.set('current_user', newUser);
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  }

  async logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    await this.storage.remove('current_user');
    this.router.navigate(['/login']);
  }

  async updateProfile(updates: Partial<User>) {
    const user = this.currentUser();
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    this.currentUser.set(updatedUser);
    await this.storage.set('current_user', updatedUser);

    // Update in users array
    const users = await this.storage.get<User[]>('users') || [];
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = updatedUser;
      await this.storage.set('users', users);
    }
  }
}
