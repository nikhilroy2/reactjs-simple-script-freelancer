import axios from 'axios';

const BASE_URL = 'http://temp.thejournalapp.com/freelancer/api';


// add timer axios
export const getTimersApi = async () => {
  const response = await axios.get(`${BASE_URL}/get_timers.php`);
  return response.data;
};

export const addTimerApi = async (newTimer) => {
  //const response = await axios.post(`${BASE_URL}/timers`, newTimer);
  const response = await axios.post(`${BASE_URL}/add_timer.php`, newTimer, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
  //console.log('responseData', response)
  if(response.status === 200){
    console.log('newTimer', newTimer);
    return newTimer;
  }
  //return response.data;
  //return response.data;
};




export const updateTimerApi = async (id, updatedTimer) => {
  const response = await axios.put(`${BASE_URL}/timers/${id}`, updatedTimer);
  return response.data;
};

export const deleteTimerApi = async (id) => {
  await axios.delete(`${BASE_URL}/delete_timer/${id}.php`);
};

// add timer axios end
