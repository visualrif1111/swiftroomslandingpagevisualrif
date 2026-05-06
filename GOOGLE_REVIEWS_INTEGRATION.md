# Google Reviews API Integration Guide

## 📋 Overview

The testimonials section is designed to seamlessly integrate with Google Places API to automatically display real customer reviews. Currently, it uses static reviews from Swift Rooms LLC's actual Google reviews.

## 🏗️ Architecture

The system is built with separation of concerns:

```
/src/app/
  ├── types/
  │   └── reviews.ts              # TypeScript interfaces
  ├── services/
  │   └── googleReviewsService.ts # API logic & data fetching
  └── components/
      └── TestimonialsSection.tsx # UI component
```

## 🚀 Quick Start Integration

### Step 1: Get Google Places API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Places API**
4. Create API credentials:
   - Navigate to "Credentials"
   - Click "Create Credentials" > "API Key"
   - Restrict the API key to Places API only (recommended)

### Step 2: Find Your Place ID

1. Use the [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Search for "Swift Rooms LLC" or your business name
3. Copy the Place ID (looks like: `ChIJ...`)

### Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
VITE_GOOGLE_PLACES_API_KEY=your_actual_api_key_here
VITE_GOOGLE_PLACE_ID=your_place_id_here
```

### Step 4: Enable API Integration

Open `/src/app/services/googleReviewsService.ts` and change:

```typescript
const CONFIG = {
  useStaticReviews: false, // Changed from true
  // ... rest of config
};
```

### Step 5: Test

The component will automatically fetch reviews on mount. Check the browser console for any errors.

## 🔐 Production Implementation (Recommended)

**WARNING:** Calling Google API directly from the frontend exposes your API key. For production, use a backend proxy.

### Backend Setup

#### Option 1: Node.js/Express Backend

```javascript
// backend/routes/reviews.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/api/reviews', async (req, res) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: process.env.GOOGLE_PLACE_ID,
          fields: 'name,rating,reviews,user_ratings_total',
          key: process.env.GOOGLE_PLACES_API_KEY
        }
      }
    );

    if (response.data.status !== 'OK') {
      return res.status(400).json({ error: response.data.status });
    }

    const { reviews, rating, user_ratings_total } = response.data.result;

    const formattedReviews = reviews.map((review, index) => ({
      id: `google-${review.time || index}`,
      author: review.author_name,
      rating: review.rating,
      date: review.relative_time_description,
      text: review.text,
      platform: 'Google',
      authorPhotoUrl: review.profile_photo_url
    }));

    res.json({
      reviews: formattedReviews,
      averageRating: rating,
      totalReviews: user_ratings_total
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
```

#### Option 2: Serverless Function (Vercel/Netlify)

```javascript
// api/reviews.js (Vercel) or netlify/functions/reviews.js (Netlify)
export default async function handler(req, res) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${process.env.GOOGLE_PLACES_API_KEY}`
  );

  const data = await response.json();

  if (data.status !== 'OK') {
    return res.status(400).json({ error: data.status });
  }

  const { reviews, rating, user_ratings_total } = data.result;

  const formattedReviews = reviews.map((review, index) => ({
    id: `google-${review.time || index}`,
    author: review.author_name,
    rating: review.rating,
    date: review.relative_time_description,
    text: review.text,
    platform: 'Google',
    authorPhotoUrl: review.profile_photo_url
  }));

  res.json({
    reviews: formattedReviews,
    averageRating: rating,
    totalReviews: user_ratings_total
  });
}
```

### Update Frontend Service

In `/src/app/services/googleReviewsService.ts`, use METHOD 2:

```typescript
// METHOD 2: Backend API Call (RECOMMENDED)
const response = await fetch('/api/reviews');

if (!response.ok) {
  throw new Error(`API error: ${response.status}`);
}

const data = await response.json();
return data;
```

## ⚙️ Configuration Options

### `/src/app/services/googleReviewsService.ts`

```typescript
const CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
  placeId: import.meta.env.VITE_GOOGLE_PLACE_ID,
  apiEndpoint: 'https://maps.googleapis.com/maps/api/place/details/json',
  useStaticReviews: true, // Toggle API integration
};
```

### `/src/app/components/TestimonialsSection.tsx`

```typescript
const CONFIG = {
  useStaticReviews: true, // Component-level override
  staticReviews: [...] // Fallback reviews
};
```

## 🔄 Caching Strategy

Google Places API has usage limits. Implement caching:

### Client-Side Caching

```typescript
import { ReviewsCache } from '../services/googleReviewsService';

// Fetch with 1-hour cache
const data = await ReviewsCache.getReviews();

// Force refresh
const freshData = await ReviewsCache.getReviews(true);

// Clear cache
ReviewsCache.clearCache();
```

### Backend Caching (Redis Example)

```javascript
const redis = require('redis');
const client = redis.createClient();

router.get('/api/reviews', async (req, res) => {
  const cacheKey = 'google_reviews';
  
  // Check cache
  const cached = await client.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  // Fetch from Google
  const reviews = await fetchFromGoogle();
  
  // Cache for 1 hour
  await client.setEx(cacheKey, 3600, JSON.stringify(reviews));
  
  res.json(reviews);
});
```

## 📊 Data Structure

### Google Places API Response

```json
{
  "result": {
    "name": "Swift Rooms LLC",
    "rating": 5.0,
    "user_ratings_total": 49,
    "reviews": [
      {
        "author_name": "John Doe",
        "rating": 5,
        "relative_time_description": "2 weeks ago",
        "text": "Excellent service!",
        "time": 1678886400,
        "profile_photo_url": "https://..."
      }
    ]
  }
}
```

### Our Review Interface

```typescript
interface Review {
  id: number | string;
  author: string;
  rating: number; // 1-5
  date: string;
  text: string;
  platform: 'Google';
  authorPhotoUrl?: string;
}
```

## 🎨 Customization

### Change Carousel Settings

In `TestimonialsSection.tsx`:

```typescript
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000, // Change rotation speed
  pauseOnHover: true,
};
```

### Filter Reviews

```typescript
// Show only 5-star reviews
const fiveStarReviews = reviews.filter(r => r.rating === 5);

// Show most recent reviews
const recentReviews = reviews.slice(0, 10);
```

## 🐛 Troubleshooting

### Error: "REQUEST_DENIED"
- Check API key is valid
- Verify Places API is enabled
- Check API key restrictions

### Error: "INVALID_REQUEST"
- Verify Place ID is correct
- Check required fields are specified

### Reviews Not Displaying
1. Check browser console for errors
2. Verify `useStaticReviews` is set to `false`
3. Check environment variables are loaded
4. Test API endpoint directly in browser/Postman

### CORS Errors (Direct API Calls)
- Google API doesn't support CORS from browsers
- Must use backend proxy (see Production Implementation)

## 📈 Rate Limits

Google Places API limits:
- **Free tier:** Limited requests per day
- **Paid tier:** Pay per request

Best practices:
- Cache reviews (1-24 hours)
- Use backend to hide API usage
- Consider storing reviews in database
- Implement refresh strategy (daily/weekly)

## 🔄 Auto-Refresh Strategy

```typescript
// Refresh reviews daily at midnight
useEffect(() => {
  const refreshReviews = async () => {
    const data = await ReviewsCache.getReviews(true);
    setReviews(data.reviews);
  };

  // Initial fetch
  refreshReviews();

  // Set up daily refresh
  const interval = setInterval(refreshReviews, 24 * 60 * 60 * 1000);

  return () => clearInterval(interval);
}, []);
```

## ✅ Testing Checklist

- [ ] API key created and restricted
- [ ] Place ID verified
- [ ] Environment variables configured
- [ ] Backend endpoint created (production)
- [ ] Reviews displaying correctly
- [ ] Carousel functioning properly
- [ ] Error handling working
- [ ] Caching implemented
- [ ] Rate limits considered
- [ ] Mobile responsive

## 📞 Support

For Google Places API issues:
- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Google Cloud Support](https://cloud.google.com/support)

For implementation issues:
- Check `/src/app/types/reviews.ts` for type definitions
- Check `/src/app/services/googleReviewsService.ts` for API logic
- Check `/src/app/components/TestimonialsSection.tsx` for UI component

## 🎯 Next Steps

1. Set up backend API endpoint
2. Configure environment variables
3. Enable API integration
4. Implement caching strategy
5. Monitor API usage
6. Set up automated refresh
7. Test thoroughly

---

**Last Updated:** March 2026  
**Version:** 1.0.0
