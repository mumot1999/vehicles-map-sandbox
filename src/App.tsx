import * as React from 'react';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const API_BASE_URL = 'http://localhost:30000'; // Replace with your API server URL

function App() {
  const [vehicleId, setVehicleId] = useState('');
  const [vehiclePosition, setVehiclePosition] = useState([50, 20]);
  const markerRef = React.useRef(null);

  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        console.log('DRAG');
        const marker = markerRef.current;

        const { lat, lng } = marker.getLatLng();
        setVehiclePosition([lat, lng]);

        if (vehicleId) {
          const message = {
            data: {
              lon: lng,
              lat: lat,
              sat: 1,
              speed: 0,
            },
            info: {
              lon: 20,
              lat: 50,
              ts: Math.floor(Date.now() / 1000),
            },
          };
          sendGPSData(vehicleId, message);
        }
      },
    }),
    [vehicleId]
  );

  const handleRegisterVehicle = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: `/from/2/${vehicleId}/register`,
          message: {
            data: { VIN: '123' },
            info: { lon: 20, lat: 50, ts: Math.floor(Date.now() / 1000) },
          },
        }),
      });
      if (response.ok) {
        console.log('Vehicle registered successfully');
      } else {
        console.error('Failed to register vehicle:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to register vehicle:', error);
    }
  };

  const sendGPSData = async (vehicleId, message) => {
    console.log('SENDING', { vehicleId, message });
    try {
      const response = await fetch(`${API_BASE_URL}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: `/from/2/${vehicleId}/gps/data`,
          message,
        }),
      });
      if (response.ok) {
        console.log('GPS data sent successfully');
      } else {
        console.error('Failed to send GPS data:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to send GPS data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Vehicle Tracker</h1>
      <div>
        <label htmlFor="vehicleId">Vehicle ID:</label>
        <input
          type="text"
          id="vehicleId"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        />
        <button onClick={handleRegisterVehicle}>Register Vehicle</button>
      </div>
      <MapContainer
        center={vehiclePosition}
        zoom={13}
        style={{ height: '500px' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          ref={markerRef}
          position={vehiclePosition}
          draggable={true}
          eventHandlers={eventHandlers}
        >
          <Popup>Drag me to change the vehicle's position</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
