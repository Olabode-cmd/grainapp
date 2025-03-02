# API Services and Authentication System

## Overview
This project implements an API services layer with authentication for a React Native mobile app using Expo. The app uses two external APIs:
- **DummyJSON API**: For authentication and user management
- **Unsplash API**: For fetching and displaying photos

## Setup Instructions

### 1. Install Dependencies
Make sure to install all dependencies:
```
npm install
```

### 2. Configure API Keys
Add your Unsplash API key to the `app.config.js` file:
```javascript
export default {
  expo: {
    // ...other config
    extra: {
      unsplashAccessKey: "YOUR_UNSPLASH_ACCESS_KEY", // Replace with your actual key
    }
  }
}
```

## Authentication Flow

The app implements a complete authentication flow:
- Users log in with username and password via the DummyJSON API
- On successful authentication, the token is stored in AsyncStorage
- The AuthContext manages the authentication state throughout the app
- Protected routes require authentication
- Token expiration handling with automatic logout
- Authenticated users are prevented from accessing the login page

## API Services

### Authentication Service (`authService.ts`)
- Login functionality
- Token validation
- User profile fetching

### Posts Service (`postsService.ts`)
- Fetching photos from Unsplash
- Searching photos with pagination

### API Configuration (`api.ts`)
- Axios instances for different APIs
- Authorization header management
- Token handling utilities

## App Structure
- Login screen with authentication
- Protected routes within tab navigation
- Home screen displaying Unsplash photos
- Profile screen showing user information with sign out capability

## Usage Examples

### Login
```javascript
import { login } from '@/services/authService';
import { useAuth } from '@/utils/authContext';

// Inside component:
const { signIn } = useAuth();

const handleLogin = async () => {
  const credentials = { username: "user", password: "password" };
  const userData = await login(credentials);
  await signIn(userData);
};
```

### Fetching Photos
```javascript
import { getPhotos } from '@/services/postsService';

// Inside component:
const [photos, setPhotos] = useState([]);

useEffect(() => {
  const loadPhotos = async () => {
    const data = await getPhotos(1, 10);
    setPhotos(data);
  };
  
  loadPhotos();
}, []);
```

### Using the Auth Context
```javascript
import { useAuth } from '@/utils/authContext';

// Inside component:
const { user, isAuthenticated, signOut } = useAuth();

// Access user info
const username = user?.username;

// Check if user is authenticated
if (isAuthenticated) {
  // Do something for authenticated users
}

// Sign out
const handleLogout = () => {
  signOut();
};
```