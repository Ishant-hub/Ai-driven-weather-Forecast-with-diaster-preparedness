import L from 'leaflet';

export const createMarkerIcon = (temperature: number) => {
  // Define color based on temperature ranges
  let color = '#000000'; // Default black
  
  if (temperature <= 0) {
    color = '#0000FF'; // Blue for freezing
  } else if (temperature <= 10) {
    color = '#00FFFF'; // Cyan for cold
  } else if (temperature <= 20) {
    color = '#00FF00'; // Green for mild
  } else if (temperature <= 30) {
    color = '#FFA500'; // Orange for warm
  } else {
    color = '#FF0000'; // Red for hot
  }

  // Create an SVG marker icon
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="${color}" opacity="0.7"/>
      <circle cx="12" cy="12" r="6" fill="white"/>
    </svg>
  `;

  const svgUrl = `data:image/svg+xml;base64,${btoa(svgTemplate)}`;

  return L.icon({
    iconUrl: svgUrl,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
}; 