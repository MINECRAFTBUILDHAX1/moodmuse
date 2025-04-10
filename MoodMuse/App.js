import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [mood, setMood] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSongSuggestions = async () => {
    if (!mood.trim()) return;
    
    setLoading(true);
    // Simulate API call with sample data for now
    setTimeout(() => {
      setSongs([
        "Don't Stop Believin' - Journey",
        "Happy - Pharrell Williams",
        "Walking on Sunshine - Katrina & The Waves",
        "I Gotta Feeling - The Black Eyed Peas",
        "Good Vibrations - The Beach Boys"
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MoodMuse 🎵</Text>
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
        style={styles.button}
        onPress={getSongSuggestions}
      >
        <Text style={styles.buttonText}>Get Song Suggestions</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loading}>Loading suggestions...</Text>
      ) : (
        <ScrollView style={styles.songList}>
          {songs.map((song, index) => (
            <View key={index} style={styles.songItem}>
              <Text style={styles.songText}>🎵 {song}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
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
    width: '100%',
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  songList: {
    width: '100%',
    marginTop: 20,
  },
  songItem: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  songText: {
    color: '#fff',
    fontSize: 16,
  },
  loading: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
}); 