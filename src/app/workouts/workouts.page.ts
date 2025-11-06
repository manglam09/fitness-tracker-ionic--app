import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton,
  IonCard, IonCardContent, IonIcon, IonButton, IonChip, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  fitness, time, flame, barbell, bicycle, body, leaf, play
} from 'ionicons/icons';
import { WorkoutService } from '../services/workout.service';
import { WorkoutCategory } from '../models/workout.model';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment,
    IonSegmentButton, IonCard, IonCardContent, IonIcon, IonButton, IonChip, IonLabel
  ]
})
export class WorkoutsPage {
  selectedCategory = signal<WorkoutCategory | 'All'>('All');
  categories = this.workoutService.getAllCategories();
  allWorkouts = this.workoutService.workouts;

  filteredWorkouts = () => {
    if (this.selectedCategory() === 'All') {
      return this.allWorkouts();
    }
    return this.workoutService.getWorkoutsByCategory(this.selectedCategory() as WorkoutCategory);
  };

  constructor(
    private workoutService: WorkoutService,
    private router: Router
  ) {
    addIcons({ fitness, time, flame, barbell, bicycle, body, leaf, play });
  }

  selectCategory(category: WorkoutCategory | 'All') {
    this.selectedCategory.set(category);
  }

  startWorkout(workoutId: string) {
    this.router.navigate(['/workout-timer', workoutId]);
  }

  getCategoryIcon(category: WorkoutCategory): string {
    const icons: Record<WorkoutCategory, string> = {
      'Chest': 'barbell',
      'Back': 'barbell',
      'Legs': 'body',
      'Cardio': 'bicycle',
      'Yoga': 'leaf',
      'Arms': 'barbell',
      'Core': 'fitness'
    };
    return icons[category] || 'fitness';
  }

  getDifficultyColor(difficulty: string): string {
    const colors: Record<string, string> = {
      'Beginner': 'success',
      'Intermediate': 'warning',
      'Advanced': 'danger'
    };
    return colors[difficulty] || 'medium';
  }
}
