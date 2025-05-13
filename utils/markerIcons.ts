import L from 'leaflet';

/**
 * Creates a custom marker icon based on temperature value
 * @param temperature Temperature in Celsius
 * @returns Leaflet Icon instance
 */
export function createMarkerIcon(temperature: number): L.Icon {
  // Define color based on temperature ranges
  const getColor = (temp: number): string => {
    if (temp <= 0) return '#00ffff';   // Cyan for freezing
    if (temp <= 10) return '#0000ff';  // Blue for cold
    if (temp <= 20) return '#00ff00';  // Green for mild
    if (temp <= 30) return '#ffff00';  // Yellow for warm
    if (temp <= 40) return '#ff8c00';  // Orange for hot
    return '#ff0000';                  // Red for very hot
  };

  const color = getColor(temperature);

  // Create SVG marker
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path fill="${color}" d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 7.94 8.5 15.5 8.5 15.5s8.5-7.56 8.5-15.5C20.5 3.81 16.69 0 12 0zm0 13a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"/>
    </svg>
  `;

  // Convert SVG to data URL
  const svgBase64 = btoa(svg);
  const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;

  // Create and return Leaflet icon
  return L.icon({
    iconUrl: dataUrl,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
} 