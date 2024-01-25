import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:9876/name/nameID');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
