/**
 * Review Types for Google Reviews Integration
 * 
 * This file defines the data structures used for customer reviews.
 * When integrating with Google Places API, map the API response to these types.
 */

export interface Review {
  id: number | string;
  author: string;
  rating: number; // 1-5 stars
  date: string; // Display date (e.g., "2 weeks ago" or formatted date)
  text: string; // Review content
  platform: 'Google'; // Can extend to support other platforms
  authorPhotoUrl?: string; // Optional: Google profile photo URL
  relativeTimeDescription?: string; // e.g., "a month ago" from Google API
}

export interface ReviewsResponse {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  error?: string;
}

/**
 * Google Places API Review Type (for reference)
 * This is the structure returned by Google Places API
 * Map this to our Review interface in the service layer
 */
export interface GooglePlacesReview {
  author_name: string;
  author_url?: string;
  language?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number; // Unix timestamp
}
