# MoodMuse 🎵

A React Native app that suggests songs based on your current mood, powered by OpenAI's GPT-3.5.

## Features

- Mood-based song suggestions
- Ambient sound playback
- YouTube preview links for songs
- Clean, dark-mode UI
- Built with Expo and React Native

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an OpenAI account and get an API key from https://platform.openai.com/

4. Replace `YOUR_OPENAI_API_KEY` in `screens/HomeScreen.js` with your actual OpenAI API key

5. Add an ambient sound file:
   - Place an MP3 file named `ambient.mp3` in the `assets` folder
   - This will be used for the background ambient sound feature

## Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Usage

1. Enter your current mood in the text input
2. Press enter or submit to get song suggestions
3. Use the "Preview" button to open YouTube search results for each song
4. Toggle ambient sound with the "Play Ambient Sound" button
5. Use "Try Again" to reset and start over

## Dependencies

- @react-navigation/native
- @react-navigation/native-stack
- expo-av
- openai
- react-native-safe-area-context
- react-native-screens
- @react-native-async-storage/async-storage
- react-native-url-polyfill

## License

MIT 