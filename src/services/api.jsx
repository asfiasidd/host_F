import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const register = (email, password) => {
  return axios.post(`${API_URL}/register`, { email, password });
};

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const getProfile = () => {
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const saveProfile = (profile) => {
  return axios.post(`${API_URL}/profile`, profile, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};