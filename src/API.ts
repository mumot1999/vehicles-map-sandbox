// const API_BASE_URL = 'http://localhost:3000'; // Replace with your API server URL

// export const registerVehicle = async (vehicleId) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/register`, {
//       vehicleId,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to register vehicle:', error);
//     throw error;
//   }
// };

// export const sendGPSData = async (vehicleId, lon, lat, ts) => {
//   try {
//     const message = {
//       data: { lon, lat, sat: 1, speed: 0 },
//       info: { lon: 20, lat: 50, ts },
//     };
//     const response = await axios.post(`${API_BASE_URL}/gps`, {
//       vehicleId,
//       message,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to send GPS data:', error);
//     throw error;
//   }
// };
