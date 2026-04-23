# Anomaly Monitor

A mobile application for documenting personal anomaly reports and exploring NASA's Astronomy Picture of the Day (APOD) archive.

## Tech Stack

- [Expo](https://expo.dev) SDK 54
- [React Native](https://reactnative.dev) with TypeScript
- [Expo Router](https://expo.github.io/router) — file-based navigation
- [React Context API](https://react.dev/reference/react/createContext) — in-memory state management
- [NASA APOD API](https://api.nasa.gov) — astronomy image archive

## Prerequisites

- Node.js >= 18
- Expo Go app on your physical device, or an iOS/Android emulator

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `i` / `a` to open in a simulator.

## Project Structure

```
anomaly-monitor/
├── app/
│   ├── _layout.tsx           # Root layout, font loading, context provider
│   └── (tabs)/
│       ├── _layout.tsx       # Tab navigator configuration
│       ├── index.tsx         # Home screen
│       ├── new-anomaly.tsx   # Create anomaly form
│       ├── my-anomalies.tsx  # Saved anomalies list
│       └── search.tsx        # APOD search
├── components/               # Reusable UI components
├── context/                  # AnomalyContext — global state
├── services/                 # API layer (apodService)
├── types/                    # TypeScript interfaces
├── constants/                # Design tokens (Colors, Typography)
└── utils/                    # Utility functions (dateUtils)
```

## Features

- Create anomaly reports with title, description, and an image from the gallery or camera
- Browse saved anomaly reports with full-screen detail view and delete functionality
- Search NASA's APOD archive by date range, view full image and description, and save entries as anomaly reports

## Notes

- Anomaly data is stored in-memory and does not persist across app restarts.
- The APOD API uses `DEMO_KEY` by default. For higher rate limits, replace it with a free key from [api.nasa.gov](https://api.nasa.gov).
