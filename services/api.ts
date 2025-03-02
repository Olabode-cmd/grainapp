// API service configuration
import axios from 'axios';
import Constants from 'expo-constants';

// Base API instances for different services
export const dummyJsonAPI = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get Unsplash API key from app config
const unsplashAccessKey = Constants.expoConfig?.extra?.unsplashAccessKey || '';

export const unsplashAPI = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Client-ID ${unsplashAccessKey}`,
  },
});

// Add auth token to requests for Unsplash
export const setUnsplashAuthToken = (token: string) => {
  unsplashAPI.defaults.headers.common['Authorization'] = `Client-ID ${token}`;
};

// Add auth token to requests for DummyJSON
export const setDummyJsonAuthToken = (token: string) => {
  dummyJsonAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Clear auth tokens when user logs out
export const clearAuthTokens = () => {
  delete dummyJsonAPI.defaults.headers.common['Authorization'];
  delete unsplashAPI.defaults.headers.common['Authorization'];
};