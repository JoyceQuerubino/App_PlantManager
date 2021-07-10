import axios from 'axios'; 

const api = axios.create({
    baseURL: 'http://192.168.15.7:3333', //coloque sempre o seu endereço IP + 3333(porta) e não 'localhost'. 
}); 

export default api;