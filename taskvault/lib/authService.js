
import axios from './axiosConfig';
//registeri
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post('/register', {
      email,
      password,
    });
    
    localStorage.setItem('userToken', response.data.token);
    
    return response.data; 
  } catch (error) {
    console.error("Registration Error: ", error);
    throw error;
  }
};

//logini
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('/login', {
      email,
      password,
    });
    
    localStorage.setItem('userToken', response.data.token);
    
    return response.data;
  } catch (error) {
    console.error("Login Error: ", error);
    throw error;
  }
};

export const getToken = () => {
  return localStorage.getItem('userToken');
};

export const logoutUser = () => {
  localStorage.removeItem('userToken');
};
