const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Force HTTPS — Railway proxy sets x-forwarded-proto header
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, 'https://' + req.headers.host + req.url);
  }
  next();
});

// Serve static files from current directory
app.use(express.static(__dirname));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
