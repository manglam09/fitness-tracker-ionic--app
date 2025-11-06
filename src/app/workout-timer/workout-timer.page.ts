import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,
  IonProgressBar, IonBackButton, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { play, pause, stop, checkmarkCircle } from 'ionicons/icons';
import { WorkoutService } from '../services/workout.service';
import { ActivityService } from '../services/activity.service';
import { Workout, WorkoutSession } from '../models/workout.model';

@Component({
  selector: 'app-workout-timer',
  templateUrl: './workout-timer.page.html',
  styleUrls: ['./workout-timer.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    IonIcon, IonProgressBar, IonBackButton, IonButtons
  ]
})
export class WorkoutTimerPage implements OnInit, OnDestroy {
  workout = signal<Workout | null>(null);
  session = signal<WorkoutSession | null>(null);
  isRunning = signal(false);
  isPaused = signal(false);
  elapsedSeconds = signal(0);
  timer: any;

  displayTime = () => {
    const seconds = this.elapsedSeconds();
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  progress = () => {
    const workout = this.workout();
    if (!workout) return 0;
    const totalSeconds = workout.duration * 60;
    return Math.min(this.elapsedSeconds() / totalSeconds, 1);
  };

  estimatedCalories = () => {
    const workout = this.workout();
    if (!workout) return 0;
    const minutes = this.elapsedSeconds() / 60;
    return Math.floor(minutes * workout.caloriesPerMinute);
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService,
    private activityService: ActivityService
  ) {
    addIcons({ play, pause, stop, checkmarkCircle });
  }

  ngOnInit() {
    const workoutId = this.route.snapshot.paramMap.get('id');
    if (workoutId) {
      const workout = this.workoutService.workouts().find(w => w.id === workoutId);
      if (workout) {
        this.workout.set(workout);
      }
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  async startWorkout() {
    const workout = this.workout();
    if (!workout) return;

    const session = await this.workoutService.startWorkout(workout);
    this.session.set(session);
    this.isRunning.set(true);
    this.isPaused.set(false);
    this.startTimer();
  }

  pauseWorkout() {
    this.isPaused.set(true);
    this.stopTimer();
  }

  resumeWorkout() {
    this.isPaused.set(false);
    this.startTimer();
  }

  async stopWorkout() {
    this.stopTimer();
    const session = this.session();
    if (session) {
      const minutes = Math.floor(this.elapsedSeconds() / 60);
      await this.workoutService.completeWorkout(session, minutes);
      await this.activityService.addWorkout(minutes, this.estimatedCalories());
    }
    this.router.navigate(['/tabs/workouts']);
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.elapsedSeconds.set(this.elapsedSeconds() + 1);
    }, 1000);
  }

  private stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
