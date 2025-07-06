const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/submit', (req, res) => {
  const { name, email } = req.body;
  const entry = { name, email, time: new Date().toISOString() };

  fs.appendFile('responses.json', JSON.stringify(entry) + '\n', (err) => {
    if (err) {
      console.error('Failed to save:', err);
      return res.status(500).send('Error saving response');
    }
    res.send('Success');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
