import axios from 'axios'; 
import { url } from '../../src/actions/config.js'; 

export const loggedUser = async () => {

    const id = window.localStorage.getItem('user_id');

    const response = await axios.post(url() + 'users/loggedUser', { user_id: id });
    if(response){
      return response.data; 
    } else {
      return 0;
    }
};
