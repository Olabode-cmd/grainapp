// Post service for fetching posts from Unsplash
import { unsplashAPI } from './api';

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  description: string;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
  likes: number;
}

// Fetch photos from Unsplash
export const getPhotos = async (page = 1, perPage = 10): Promise<UnsplashPhoto[]> => {
  try {
    const response = await unsplashAPI.get('/photos', {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

// Search photos from Unsplash
export const searchPhotos = async (query: string, page = 1, perPage = 10): Promise<{
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}> => {
  try {
    const response = await unsplashAPI.get('/search/photos', {
      params: {
        query,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching photos:', error);
    throw error;
  }
};