import axios from 'axios';

const BASE_URL = 'https://example.com/api';


// add timer axios
export const getTimers = async () => {
  const response = await axios.get(`${BASE_URL}/timers`);
  return response.data;
};

export const addTimer = async (newTimer) => {
  const response = await axios.post(`${BASE_URL}/timers`, newTimer);
  return response.data;
};

export const updateTimer = async (id, updatedTimer) => {
  const response = await axios.put(`${BASE_URL}/timers/${id}`, updatedTimer);
  return response.data;
};

export const deleteTimer = async (id) => {
  await axios.delete(`${BASE_URL}/timers/${id}`);
};

// add timer axios end
