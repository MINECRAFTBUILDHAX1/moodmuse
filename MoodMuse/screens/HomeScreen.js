import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Audio } from 'expo-av';
import { Configuration, OpenAIApi } from 'openai';
import AsyncStorage from '@react-native-async-storage/async-storage';

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export default function HomeScreen() {
  const [mood, setMood] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const getSongSuggestions = async () => {
    if (!mood.trim()) return;
    
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Suggest 5 songs that match the mood: '${mood}'. Return them as a list of track names and artists. Format: "Song Name - Artist"`,
        max_tokens: 150,
        temperature: 0.7,
      });

      const suggestions = response.data.choices[0].text
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^\d+\.\s*/, '').trim());

      setSongs(suggestions);
    } catch (error) {
      console.error('Error getting song suggestions:', error);
      alert('Failed to get song suggestions. Please try again.');
    }
    setLoading(false);
  };

  const playBackgroundSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
      return;
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../assets/ambient.mp3'),
        { shouldPlay: true, isLooping: true }
      );
      setSound(newSound);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const openMusicPreview = (song) => {
    const searchQuery = encodeURIComponent(song);
    const url = `https://www.youtube.com/results?search_query=${searchQuery}`;
    Linking.openURL(url);
  };

  const resetScreen = () => {
    setMood('');
    setSongs([]);
    if (sound) {
      sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>How are you feeling right now?</Text>
      <TextInput
        style={styles.input}
        value={mood}
        onChangeText={setMood}
        placeholder="Enter your mood..."
        placeholderTextColor="#666"
        onSubmitEditing={getSongSuggestions}
      />
      
      <TouchableOpacity
        style={styles.ambientButton}
        onPress={playBackgroundSound}
      >
        <Text style={styles.buttonText}>
          {isPlaying ? '🔊 Stop Ambient Sound' : '🔈 Play Ambient Sound'}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      ) : (
        <ScrollView style={styles.songList}>
          {songs.map((song, index) => (
            <View key={index} style={styles.songItem}>
              <Text style={styles.songText}>🎵 {song}</Text>
              <TouchableOpacity
                style={styles.previewButton}
                onPress={() => openMusicPreview(song)}
              >
                <Text style={styles.previewButtonText}>Preview</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {songs.length > 0 && (
        <TouchableOpacity style={styles.resetButton} onPress={resetScreen}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  question: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  songList: {
    flex: 1,
  },
  songItem: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  songText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  previewButton: {
    backgroundColor: '#4a4a4a',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  previewButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  ambientButton: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
}); 