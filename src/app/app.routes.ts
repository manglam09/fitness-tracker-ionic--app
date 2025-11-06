import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'workout-timer/:id',
    loadComponent: () => import('./workout-timer/workout-timer.page').then(m => m.WorkoutTimerPage)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];
