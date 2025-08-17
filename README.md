# Lumin: AI Glow Up App

Lumin is a React Native app built with Expo, designed to help users achieve their best selves with the power of AI. Whether it's enhancing photos, tracking self-improvement, or providing personalized recommendations, Lumin aims to be your digital glow-up companion.

## Features
- AI-powered glow up tools (details to be filled in as features are developed)
- Animated splash screen
- Tabbed navigation (Profile, Settings, Home, etc.)
- Modern, mobile-first UI

## Project Structure
```
app/
  _layout.tsx           # Main app layout
  (tabs)/               # Tabbed navigation screens
    _layout.tsx
    index.tsx           # Home screen
    profile.tsx         # User profile
    settings.tsx        # App settings
  +not-found.tsx        # 404/Not Found screen
components/
  AnimatedSplashScreen.tsx
hooks/
  useFrameworkReady.ts  # Custom React hook
assets/
  images/               # App images
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Lumin-AI-glow-up
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```

### Running on Device/Emulator
- Use the Expo Go app on your iOS/Android device, or run on an emulator via the Expo CLI interface.

## Scripts
- `npm start` / `npx expo start` — Start the development server
- `npm run android` — Run on Android emulator/device
- `npm run ios` — Run on iOS simulator/device (Mac only)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---
*Lumin: Let your inner light shine with a little help from AI!* 