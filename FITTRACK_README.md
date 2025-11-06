# FitTrack Pro 🏋️‍♂️

A modern, feature-rich fitness tracking application built with **Ionic Angular Standalone Components**. Track your workouts, manage your diet, monitor daily activity, and achieve your fitness goals with style!

## ✨ Features

### 🔐 Authentication
- **Login & Signup** pages with smooth animations
- Modern gradient UI with hero icons
- Form validation and error handling
- Persistent user sessions via localStorage

### 📊 Dashboard
- **Daily Activity Summary**
  - Steps counter with progress bar
  - Calories burned tracking
  - Active minutes display
  - Workouts completed counter
- **Weekly Progress Charts**
  - 7-day activity visualization
  - Interactive bar charts
- **Quick Navigation Cards**
  - Workouts, Diet Plan, and Analytics access

### 💪 Workout Tracking
- **Workout Library**
  - 7+ pre-configured workouts
  - Categories: Chest, Back, Legs, Cardio, Yoga, Arms, Core
  - Difficulty levels: Beginner, Intermediate, Advanced
  - Exercise details with sets, reps, and duration
- **Workout Timer**
  - Real-time workout session tracking
  - Play, Pause, and Complete controls
  - Circular progress indicator
  - Calorie estimation during workout
  - Exercise list display

### 🍎 Diet Management
- **Daily Meal Planner**
  - Breakfast, Lunch, Snacks, Dinner sections
  - Calorie tracking per meal
  - Total daily calorie progress
- **Meal Item Management**
  - Add custom food items
  - Track macronutrients (Protein, Carbs, Fats)
  - Automatic calorie calculation from macros
  - Delete meal items
- **Calorie Calculator**
  - Visual progress indicators
  - Daily calorie goal tracking

### ⚙️ Settings
- **Profile Management**
  - Edit name, age, weight, height
  - BMI calculator
  - Fitness goal selection
  - Daily step and calorie goals
- **Preferences**
  - Dark mode toggle
  - Notification settings
- **Account Actions**
  - Save profile changes
  - Logout functionality

## 🎨 Design Highlights

### Modern UI/UX
- **Apple Fitness Inspired Design**
- Vibrant gradient colors throughout
- Smooth page transitions and animations
- Responsive layout for all screen sizes
- Glass morphism effects
- Rounded cards with consistent spacing

### Animations
- Fade in/out effects
- Slide up transitions
- Scale animations
- Pulse effects on active elements
- Stagger animations for list items

### Color Gradients
- Primary: Purple-Blue gradient (#667eea → #764ba2)
- Success: Green-Cyan gradient (#43e97b → #38f9d7)
- Warning: Pink-Red gradient (#f093fb → #f5576c)
- Info: Blue-Cyan gradient (#4facfe → #00f2fe)
- Custom gradients for each workout category

### Dark Mode Support
- Full dark theme implementation
- Automatic system preference detection
- Manual toggle in settings
- Optimized colors for dark backgrounds

## 🏗️ Architecture

### Standalone Components
- **No NgModule** - Using latest Angular standalone architecture
- Component-based routing
- Lazy loading for optimal performance

### State Management
- **Angular Signals** for reactive state
- Computed values for derived state
- Signal-based components throughout

### Services
- `AuthService` - User authentication and profile management
- `StorageService` - LocalStorage abstraction
- `ActivityService` - Daily and weekly activity tracking
- `WorkoutService` - Workout library and session management
- `DietService` - Meal planning and calorie tracking
- `ThemeService` - Dark mode management

### Data Models
- `User` - User profile and preferences
- `Workout` - Workout definition with exercises
- `WorkoutSession` - Workout tracking session
- `Meal` & `MealItem` - Diet planning models
- `DailyActivity` - Activity metrics
- `WeeklyProgress` - Aggregated weekly stats

## 📁 Project Structure

```
mangalam/src/app/
├── models/               # TypeScript interfaces
│   ├── user.model.ts
│   ├── workout.model.ts
│   └── diet.model.ts
├── services/             # Business logic services
│   ├── auth.service.ts
│   ├── storage.service.ts
│   ├── activity.service.ts
│   ├── workout.service.ts
│   ├── diet.service.ts
│   └── theme.service.ts
├── login/                # Login/Signup page
├── dashboard/            # Main dashboard page
├── workouts/             # Workout library page
├── workout-timer/        # Workout session timer
├── diet/                 # Diet planning page
├── settings/             # User settings page
└── tabs/                 # Tab navigation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Ionic CLI

### Installation

```bash
# Navigate to project directory
cd mangalam

# Install dependencies
npm install

# Run the app
ionic serve
```

### Build for Production

```bash
# Build web version
ionic build --prod

# Build for Android
ionic capacitor add android
ionic capacitor build android

# Build for iOS
ionic capacitor add ios
ionic capacitor build ios
```

## 🎯 Usage

### First Time Setup
1. Launch the app - you'll see the **Login** page
2. Click **Sign Up** to create a new account
3. Enter your name, email, and password
4. After signup, you'll be redirected to the **Dashboard**

### Tracking Workouts
1. Navigate to **Workouts** tab
2. Browse workouts by category
3. Select a workout and click **Start Workout**
4. Use the timer to track your session
5. Click **Complete** when finished

### Managing Diet
1. Navigate to **Diet** tab
2. Click **Add Item** on any meal section
3. Enter food name, calories, and macros
4. View your daily calorie progress

### Customizing Profile
1. Navigate to **Settings** tab
2. Update your personal information
3. Set fitness goals and daily targets
4. Toggle dark mode
5. Click **Save Changes**

## 🛠️ Technologies Used

- **Ionic Framework 7+**
- **Angular 17+ (Standalone)**
- **TypeScript**
- **Ionicons**
- **SCSS/Sass**
- **LocalStorage API**
- **Angular Signals**

## 🎨 Customization

### Changing Colors
Edit `src/theme/variables.scss`:
```scss
--ion-color-primary: #yourcolor;
--gradient-primary: linear-gradient(135deg, #color1, #color2);
```

### Adding Workouts
Edit `src/app/services/workout.service.ts`:
```typescript
{
  id: 'unique-id',
  title: 'Your Workout',
  category: 'Category',
  duration: 30,
  caloriesPerMinute: 8,
  difficulty: 'Intermediate',
  // ... add exercises
}
```

## 📱 Screenshots

The app features:
- Vibrant gradient login screen
- Animated dashboard with activity cards
- Categorized workout library
- Interactive workout timer
- Meal planning interface
- Comprehensive settings page
- Beautiful dark mode throughout

## 🤝 Contributing

This is a demonstration project showcasing modern Ionic Angular development practices. Feel free to use it as a template for your own fitness applications!

## 📄 License

This project is created for educational and demonstration purposes.

## 🙏 Acknowledgments

- Ionic Framework Team for the excellent components
- Ionicons for the beautiful icon set
- Inspiration from Apple Fitness and modern fitness apps

---

**Built with ❤️ using Ionic Angular Standalone Components**

🎉 **Happy Tracking!** 💪
