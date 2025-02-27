# Liquid Finance App

A mobile finance application built with React Native and Expo that helps users manage their financial insights and spending goals. This app features a clean UI with a modern design, interactive components, and smooth animations.

## ✨ Features

- **Authentication System**
  - Clean login screen with email/password authentication
  - Social login options (Apple, Google, Instagram)
  - "Remember me" and "Forgot Password" functionality

- **Dashboard**
  - User profile with personalized greeting
  - Available funds overview with period selector
  - Expense visualization with interactive circular chart
  - Detailed spending goals with progress indicators

- **Interactive Bottom Sheet**
  - Interactive drawer component with smooth animations
  - Multi-position swipe gestures (40% and 90% of screen)
  - Detailed spending analysis when fully expanded
  - Custom saving tips based on spending habits

- **Responsive UI**
  - Adaptive layouts for different screen sizes
  - Smooth transitions and animations
  - Gradient backgrounds and modern design elements

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack and Tab navigation)
- **UI Components**:
  - Custom reusable components
  - Linear Gradients
  - Animated API for interactive elements
- **State Management**: React Hooks and Context
- **Asset Management**: Local images and icons

## 🏗 Project Structure

```
/
├── src/
├── assets/                   # Static assets
│   └── images/
│  	│     ├── logo.png
│   │     └── profile.png
│   └── liquid-logo.png
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── SocialButton.tsx
│   │   │   └── Dropdown.tsx
│   │   ├── home/             # Home screen specific components
│   │   │   ├── ExpenseCircle.tsx
│   │   │   └── SpendingGoals.tsx
│   │   ├── cards/            # Card components for goals display
│   │   │   ├── AvailableFundsCard.tsx
│   │   │	  └── SpendingGoalsCard.tsx
│   ├── navigation/           # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── screens/              # Main screen components
│   │   ├── HomeScreen.tsx
│   │   ├── NotFoundScreen.tsx
│   │   └── LoginScreen.tsx
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                # Utility functions and constants
│   │   ├── mockData.ts
│   │   └── theme.ts
│   └── App.tsx               # App entry point
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18.0.0)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/liquid-finance-app.git
   cd liquid-finance-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

4. Run on your device or emulator
   - Scan the QR code with Expo Go app (Android)
   - Press 'i' for iOS simulator or 'a' for Android emulator

## 🎨 Design Highlights

- Clean, minimalist interface
- Intuitive navigation with bottom tabs
- Interactive bottom sheet for spending goals
- Subtle animations for enhanced user experience
- Consistent color scheme and typography

## 🔍 Code Quality

- TypeScript for type safety
- Component-based architecture for reusability
- Clean separation of concerns
- Well-structured project organization
- Consistent naming conventions and coding style

## 🔮 Future Improvements

- Add transaction history screen
- Implement budget creation functionality
- Add data visualization charts for spending analytics
- Support for dark mode
- Unit and integration tests
- Authentication with backend services

## 📝 License

This project is for demonstration purposes only.

## 👏 Acknowledgements

- Design inspiration from modern finance apps
- Icons from Ionicons
- Expo team for their excellent tooling