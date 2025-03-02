import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';

import { User, getUserProfile } from '../services/authService';
import { setDummyJsonAuthToken, clearAuthTokens } from '../services/api';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Keys for storing authentication data in AsyncStorage
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  // Effect to check for stored token and redirect user accordingly
  useEffect(() => {
    const loadToken = async () => {
      try {
        setIsLoading(true);
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        
        if (storedToken) {
          // Validate token and get user data
          try {
            const userData = await getUserProfile(storedToken);
            setToken(storedToken);
            setUser(userData);
            setDummyJsonAuthToken(storedToken);
          } catch (error) {
            // Token is invalid or expired
            console.error('Error validating token:', error);
            Alert.alert(
              'Session Expired',
              'Your session has expired. Please log in again.',
              [{ text: 'OK', onPress: () => signOut() }]
            );
          }
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  // Effect to handle navigation based on authentication state
  useEffect(() => {
    if (!navigationState?.key || isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      // Redirect to login if user is not authenticated
      router.replace('/');
    } else if (user && inAuthGroup) {
      // Redirect to home if user is authenticated but on auth screens
      router.replace('/(tabs)/home');
    }
  }, [user, segments, isLoading, navigationState?.key]);

  const signIn = async (userData: User) => {
    setUser(userData);
    setToken(userData.accessToken);  // Changed to accessToken to be consistent
    setDummyJsonAuthToken(userData.accessToken);  // Changed to accessToken

    // Store authentication data
    await AsyncStorage.setItem(TOKEN_KEY, userData.accessToken);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));

    // Explicitly navigate to home after successful login
    router.replace('/(tabs)/home');
  };


  const signOut = async () => {
    setUser(null);
    setToken(null);
    clearAuthTokens();

    // Clear stored authentication data
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    
    router.replace('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        signIn,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;