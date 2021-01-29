import axios from 'axios';


const api = axios.create({
  baseURL: 'https://dcasa-backend.yourbarber.info',
});

export default api;
