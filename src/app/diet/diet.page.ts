import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
  IonIcon, IonButton, IonProgressBar, IonModal, IonInput, IonLabel,
  IonItem, IonList, IonFab, IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  fastFood, cafe, pizza, restaurant, add, close, checkmark, trash
} from 'ionicons/icons';
import { DietService } from '../services/diet.service';
import { MealType, MealItem } from '../models/diet.model';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.page.html',
  styleUrls: ['./diet.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardContent, IonIcon, IonButton, IonProgressBar, IonModal,
    IonInput, IonLabel, IonItem, IonList, IonFab, IonFabButton
  ]
})
export class DietPage {
  todayPlan = this.dietService.todayPlan;
  isModalOpen = signal(false);
  selectedMealType = signal<MealType>('breakfast');
  // Typed meal types for template iteration
  mealTypes: MealType[] = ['breakfast', 'lunch', 'snacks', 'dinner'];
  
  // Form fields
  itemName = signal('');
  calories = signal<number>(0);
  protein = signal<number>(0);
  carbs = signal<number>(0);
  fats = signal<number>(0);

  calorieProgress = () => {
    const plan = this.todayPlan();
    if (!plan) return 0;
    return Math.min(plan.totalCalories / plan.targetCalories, 1);
  };

  constructor(private dietService: DietService) {
    addIcons({ fastFood, cafe, pizza, restaurant, add, close, checkmark, trash });
  }

  getMealIcon(type: MealType): string {
    const icons: Record<MealType, string> = {
      breakfast: 'cafe',
      lunch: 'restaurant',
      snacks: 'fast-food',
      dinner: 'pizza'
    };
    return icons[type];
  }

  getMealTitle(type: MealType): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  getMeal(type: MealType) {
    return this.todayPlan()?.meals.find(m => m.type === type);
  }

  openAddModal(type: MealType) {
    this.selectedMealType.set(type);
    this.resetForm();
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  resetForm() {
    this.itemName.set('');
    this.calories.set(0);
    this.protein.set(0);
    this.carbs.set(0);
    this.fats.set(0);
  }

  calculateCaloriesFromMacros() {
    const calculated = this.dietService.calculateCalories(
      this.protein(),
      this.carbs(),
      this.fats()
    );
    this.calories.set(Math.round(calculated));
  }

  async addMealItem() {
    if (!this.itemName() || this.calories() <= 0) {
      return;
    }

    const item: Omit<MealItem, 'id'> = {
      name: this.itemName(),
      calories: this.calories(),
      protein: this.protein() || undefined,
      carbs: this.carbs() || undefined,
      fats: this.fats() || undefined
    };

    await this.dietService.addMealItem(this.selectedMealType(), item);
    this.closeModal();
  }

  async removeMealItem(type: MealType, itemId: string) {
    await this.dietService.removeMealItem(type, itemId);
  }
}
