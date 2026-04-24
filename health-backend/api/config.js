// src/api/config.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 👇 Apna IP address daalo (localhost nahi chalega mobile pe)
// CMD mein "ipconfig" type karo aur IPv4 address copy karo
const BASE_URL = 'http://192.168.1.5:5000/api';  // ← apna IP yahan

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Har request mein automatically token lagao
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response error handle karo globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expire ho gaya — logout karo
      AsyncStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;