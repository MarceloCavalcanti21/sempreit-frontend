import axios from 'axios';


const api = axios.create({
//   baseURL: 'http://localhost:3334',
  baseURL: 'https://dcasa-backend.yourbarber.info',
});

export default api;
