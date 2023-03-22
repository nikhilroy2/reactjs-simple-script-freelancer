import axios from 'axios';

const BASE_URL = 'http://temp.thejournalapp.com/freelancer/api';


// .......................add timer axios.................................
export const getTimersApi = async () => {
  const response = await axios.get(`${BASE_URL}/get_timers.php`);
  return response.data;
};

export const getTimersSingleApi = async (id) => {
  const response = await axios.get(`${BASE_URL}/get_timer.php?id=${id}`);
  return response.data;
};


export const addTimerApi = async (getData) => {
  //const response = await axios.post(`${BASE_URL}/timers`, getData);
  const response = await axios.post(`${BASE_URL}/add_timer.php`, getData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
  //console.log('responseData', response)
  if (response.status === 200) {
    console.log('getData', getData);
    return getData;
  }
  //return response.data;
  //return response.data;
};




export const updateTimerApi = async (id, updatedTimer) => {
  const response = await axios.post(`${BASE_URL}/add_timer.php?update=${id}`, updatedTimer, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
  return response.data;
};


export const deleteTimerApi = async (id) => {
  const response = await axios.get(`${BASE_URL}/delete_timer.php?id=${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
  console.log(response)
};

// .......................add timer axios................................. End






// .......................add Meditation axios.................................
export const getMeditationApi = async () => {
  const response = await axios.get(`${BASE_URL}/get_meditations.php`);
  return response.data;
};

export const getMeditationSingleApi = async (id) => {
  const response = await axios.get(`${BASE_URL}/get_meditation.php?id=${id}`);
  return response.data;
};

export const addMeditationApi = async (getData) => {
  //const response = await axios.post(`${BASE_URL}/timers`, getData);
  const response = await axios.post(`${BASE_URL}/add_meditation.php`, getData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  //console.log('responseData', response)
  if (response.status === 200) {
    console.log('getData', getData);
    return getData;
  }
  //return response.data;
  //return response.data;
};




export const updateMeditationApi = async (id, updatedTimer) => {
  const response = await axios.post(`${BASE_URL}/add_meditation.php?update=${id}`, updatedTimer, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
  return response.data;
};


export const deleteMeditationApi = async (id) => {
  const response = await axios.get(`${BASE_URL}/delete_meditation.php?id=${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
  console.log(response)
};

// .......................add Meditation axios................................. End






// .......................add Affirmation axios.................................
export const getAffirmationApi = async () => {
  const response = await axios.get(`${BASE_URL}/get_affirmations.php`);
  return response.data;
};

export const getAffirmationSingleApi = async (id) => {
  const response = await axios.get(`${BASE_URL}/get_affirmation.php?id=${id}`);
  return response.data;
};



export const addAffirmationApi = async (getData) => {
  //const response = await axios.post(`${BASE_URL}/timers`, getData);
  const response = await axios.post(`${BASE_URL}/add_affirmation.php`, getData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  //console.log('responseData', response)
  if (response.status === 200) {
    console.log('getData', getData);
    return getData;
  }
  //return response.data;
  //return response.data;
};




export const updateAffirmationApi = async (id, updatedTimer) => {
  const response = await axios.post(`${BASE_URL}/update_affirmation.php?id=${id}`, updatedTimer, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
  return response.data;
};


export const deleteAffirmationApi = async (id) => {
  const response = await axios.get(`${BASE_URL}/delete_affirmation.php?id=${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
  console.log(response)
};

// .......................add Affirmation axios................................. End

