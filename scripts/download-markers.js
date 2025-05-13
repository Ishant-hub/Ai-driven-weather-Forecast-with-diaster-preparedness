const https = require('https');
const fs = require('fs');
const path = require('path');

const markers = [
  {
    url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    filename: 'marker-icon.png'
  },
  {
    url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    filename: 'marker-icon-2x.png'
  },
  {
    url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    filename: 'marker-shadow.png'
  }
];

const markersDir = path.join(__dirname, '../public/markers');

// Create markers directory if it doesn't exist
if (!fs.existsSync(markersDir)) {
  fs.mkdirSync(markersDir, { recursive: true });
}

// Download each marker file
markers.forEach(marker => {
  const file = fs.createWriteStream(path.join(markersDir, marker.filename));
  https.get(marker.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${marker.filename}`);
    });
  }).on('error', err => {
    fs.unlink(path.join(markersDir, marker.filename));
    console.error(`Error downloading ${marker.filename}:`, err.message);
  });
}); 