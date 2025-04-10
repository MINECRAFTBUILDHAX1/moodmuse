const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// API endpoint to get song suggestions
app.post('/api/suggestions', async (req, res) => {
  try {
    const { mood } = req.body;
    
    if (!mood) {
      return res.status(400).json({ error: 'Mood is required' });
    }
    
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: "text-davinci-003",
        prompt: `Suggest 5 songs that match the mood: '${mood}'. Return them as a list of track names and artists. Format: "Song Name - Artist"`,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`
        }
      }
    );
    
    const suggestions = response.data.choices[0].text
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, '').trim());
    
    res.json({ suggestions });
  } catch (error) {
    console.error('Error calling OpenAI API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get song suggestions' });
  }
});

// Serve the main HTML file for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`MoodMuse server running at http://localhost:${port}`);
}); 