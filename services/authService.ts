// Authentication service for handling login, logout, and token management
import { dummyJsonAPI } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
}

// Login with DummyJSON API
export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    console.log("Making login request with:", credentials);

    const response = await dummyJsonAPI.post("/auth/login", credentials);

    // Ensure response contains necessary data
    if (!response.data || !response.data.accessToken) {
      console.error("Invalid response structure:", response.data);
      throw new Error("Login failed: No access token received.");
    }

    const accessToken = response.data.accessToken;
    console.log("Access token received:", accessToken);

    // Store the access token
    await AsyncStorage.setItem("auth_token", accessToken);
    console.log("Access token stored successfully.");

    // Retrieve token to confirm storage
    const storedToken = await AsyncStorage.getItem("auth_token");
    console.log("Stored token in AsyncStorage:", storedToken);

    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.message || error);
    throw new Error("Login failed. Please check your credentials.");
  }
};




// Check if token is valid by making a request to user profile
export const validateToken = async (token: string): Promise<boolean> => {
  try {
    // Set the token temporarily for this request
    dummyJsonAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Attempt to get user data to verify token
    await dummyJsonAPI.get('/auth/users/me');
    
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

// Get user profile with token
export const getUserProfile = async (token: string): Promise<User> => {
  try {
    // Set the token for this request
    dummyJsonAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    const response = await dummyJsonAPI.get('/auth/users/me');
    return response.data;
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};