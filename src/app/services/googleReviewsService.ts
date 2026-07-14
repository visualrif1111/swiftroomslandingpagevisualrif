/**
 * Google Reviews Service
 *
 * Fetches customer reviews for the Social Proof section. Ships with a bundled
 * static set of real reviews (default) and can switch to live Google reviews.
 *
 * SECURE INTEGRATION (live reviews):
 * ==================================
 * The Google Places API key must NEVER live on the client — anything read via
 * `import.meta.env.VITE_*` is inlined into the public JS bundle. Live reviews
 * are therefore served through a same-origin server-side proxy that holds the
 * key in server-only env vars.
 *
 * 1. Get a Google Places API key (https://console.cloud.google.com/, enable
 *    "Places API", restrict the key) and your Place ID.
 * 2. In Vercel → Project → Settings → Environment Variables set (SERVER-ONLY,
 *    NO `VITE_` prefix): `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`.
 * 3. Flip `useStaticReviews` to `false` below. The client then calls the
 *    same-origin `/api/reviews` edge function (see `api/reviews.ts`), which is
 *    edge-cached for 1h and never exposes the key.
 *
 * Until the proxy env vars are set, `/api/reviews` returns 501 and this service
 * transparently falls back to the bundled static reviews, so nothing breaks.
 */

import type { Review, ReviewsResponse } from '../types/reviews';

// Configuration
//
// SECURITY: This service NEVER references the Google Places API key on the
// client. The key would be inlined into the public JS bundle by Vite if a
// `VITE_`-prefixed env var were read here. Live reviews are fetched via the
// same-origin `/api/reviews` edge function, which holds the key server-side
// (see `api/reviews.ts`). Keep it that way — do not add `import.meta.env`
// API-key reads to this file.
const CONFIG = {
  // Set to true to use bundled static reviews, false to fetch live reviews
  // from the server-side `/api/reviews` proxy (requires the proxy to be
  // configured in Vercel — until then it 501s and we fall back to static).
  useStaticReviews: true,
};

/**
 * Fetch reviews from Google Places API
 */
export async function fetchGoogleReviews(): Promise<ReviewsResponse> {
  // If using static reviews (before API integration)
  if (CONFIG.useStaticReviews) {
    return getStaticReviews();
  }

  try {
    // Live reviews are served ONLY through our same-origin server-side proxy,
    // which keeps the Google Places API key off the client. The browser never
    // talks to Google directly and never sees the key.
    const response = await fetch('/api/reviews');

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    
    // Fallback to static reviews on error
    return {
      ...getStaticReviews(),
      error: error instanceof Error ? error.message : 'Failed to fetch reviews'
    };
  }
}

/**
 * Static reviews fallback
 * These are real Swift Rooms LLC Google reviews
 */
function getStaticReviews(): ReviewsResponse {
  const reviews: Review[] = [
    {
      id: 1,
      author: 'Rufan Humbatov',
      rating: 5,
      date: 'Recently',
      text: 'We recently completed our home renovation and replaced all our windows and doors through this company. I\'m extremely happy with the overall service provided. Yaseen was good from a sales perspective - very professional and supportive throughout the process. I\'m especially grateful to Jibran, the project manager, who assisted me in every possible way and ensured everything went smoothly from start to finish.',
      platform: 'Google'
    },
    {
      id: 2,
      author: 'Alex Jenkins',
      rating: 5,
      date: 'Recently',
      text: 'I just wanted to take a moment to thank everyone involved in making and installing our new windows. My wife and I are super happy with the results! The installation was quick and efficient, and the team handled everything—from organizing the work permit to ensuring the windows matched our community standards as closely as possible. Even though it\'s been less than 12 hours, we\'ve already noticed a big difference in both noise and heat reduction.',
      platform: 'Google'
    },
    {
      id: 3,
      author: 'Ömer Soner İşçi',
      rating: 5,
      date: 'Recently',
      text: 'I am very happy with the service that i got from Swiftrooms and i highly recommend them who are looking for a reliable glass and windows company. Starting from the first visit to their showroom and until the end of the installation, everything went really smooth as they promised. Special thanks to Jibran and his team for their great job. Jibran has been always responsive, positive, calm and great in his job.',
      platform: 'Google'
    },
    {
      id: 4,
      author: 'Frank Johnstone',
      rating: 5,
      date: 'Recently',
      text: 'Decided to replace patio doors that allowed water to ingress during the rains, with a fixed window pane that would seal the lounge area off from outside. Very happy with the product and instillation process, clean and tidy crew. I will have to wait until the next rain to be able to comment on the waterproofing!',
      platform: 'Google'
    },
    {
      id: 5,
      author: 'Annie Khoury',
      rating: 5,
      date: 'Recently',
      text: 'Excellent products and fantastic team- Yaseen, William, Gibran, and all the others were so efficient in delivering the skylights and the folding doors on time! Thank you! Will definitely share photos of the sites when fully furnished and completed. A company you can count on!',
      platform: 'Google'
    },
    {
      id: 6,
      author: 'Bhim Majhi',
      rating: 5,
      date: 'Recently',
      text: 'Maaz Khan and his team done bifold work and glass room work in Abu Dhabi .. we are happy .. we recommend him for clients.. he is hard working efficient and good behaviour too',
      platform: 'Google'
    },
    {
      id: 7,
      author: 'Marta Fontecha de Haro',
      rating: 5,
      date: 'Recently',
      text: 'Top quality products, very professional, efficient and responsive team at all levels. Impressive commitment and attention to detail from the skilled team who installed the windows very smoothly, and in great coordination with other teams on-site. I highly recommend SWIFTROOMS as a client and as an Architect. Thank you Imran and Andrei for the amazing work and support.',
      platform: 'Google'
    },
    {
      id: 8,
      author: 'Asma Almajed',
      rating: 5,
      date: 'Recently',
      text: 'I highly recommended Swift Rooms for those who are looking for a beautiful sunroom at their garden, for family activities and gatherings. I use Swift Rooms services 2 times; the first full sunroom and the second closing my balcony. Both experiences were amazing from the consultation to the execution. Very friendly and professional team, very responsive staff, on time delivery and building, and the most important thing a very organized team throughout the process.',
      platform: 'Google'
    },
    {
      id: 9,
      author: 'Brian S',
      rating: 5,
      date: 'Recently',
      text: 'I had an excellent experience with Aamir and his team from Swift Rooms. The team didn\'t just try to sell me windows – they took the time to really educate me on the different qualities, specifications, and options available. Their professionalism, patience, and deep knowledge stood out from other companies I\'ve spoken with. It\'s clear they care about long-term quality and customer satisfaction rather than just making a quick sale.',
      platform: 'Google'
    },
    {
      id: 10,
      author: 'Anna Novikova',
      rating: 5,
      date: 'Recently',
      text: 'I want to express my heartfelt appreciation to the exceptional team that installed the windows in my home. Their professionalism and efficiency were truly impressive. Not only they complete the job on time, but they also demonstrated a high level of skill and attention to details throughout the process. I\'m now enjoying the benefits of their hard work, with improved energy efficiency and a more beautiful living space. UPVC system soundproofing is outstanding.',
      platform: 'Google'
    },
    {
      id: 11,
      author: 'Farah Nami',
      rating: 5,
      date: 'Recently',
      text: 'I\'ve installed the folding door with Swift Rooms and was impressed with their post sale customer service - Jibran was fantastic! Thank you!',
      platform: 'Google'
    },
    {
      id: 12,
      author: 'Степан Звада',
      rating: 5,
      date: 'Recently',
      text: 'We made an order with Swift rooms 3 times. Our project manager was Mr Jibran. I can say that the work was done on time, the quality of work is excellent! All issues and changes arising in the course of the work were quickly resolved. I recommend this company to you if you need to replace your windows!',
      platform: 'Google'
    },
    {
      id: 13,
      author: 'Interior Design Fabrics',
      rating: 5,
      date: 'Recently',
      text: 'Gym Sliding doors had problems and after few days few different team couldn\'t solve the problem finally Mr Maaz Khan and his team have been able to fix the door I have to say thank To him and his team - Johanna',
      platform: 'Google'
    },
    {
      id: 14,
      author: 'Miguel Duarte',
      rating: 5,
      date: 'Recently',
      text: 'The team was great during the whole process! Yaseen was very helpful in making sure I was choosing the right product and Jibran was very helpful in making sure the installation ran smoothly. The team was quick, effective and clean during the installation. Overall great service.',
      platform: 'Google'
    },
    {
      id: 15,
      author: 'Shalini Wijeratna',
      rating: 5,
      date: 'Recently',
      text: 'We had a fantastic experience working with this company for the installation of our bi-folding doors. From start to finish, the service was professional, efficient, and genuinely customer-focused. A special thank you to Sayeed, who coordinated everything seamlessly. William handled our initial consultation and took the time to explain all the options clearly. The final result is exactly what we hoped for - high-quality doors that have transformed our space.',
      platform: 'Google'
    },
    {
      id: 16,
      author: 'Emma Sangster',
      rating: 5,
      date: 'Recently',
      text: 'Swift Rooms installed 2 sets of bifold doors for me. I was extremely happy with the whole process, from start to finish. The doors are of great quality and the price was extremely competitive compared to other well known companies. The real test was when we experienced the terrible storms last year….I can safely say that the windows were perfect, and withheld the wind and rain!! Highly recommended!!!',
      platform: 'Google'
    },
    {
      id: 17,
      author: 'Brett McGeehan',
      rating: 5,
      date: 'Recently',
      text: 'Jibran and his team removed old and fitted a number of new windows. The service from the planning to fitting was excellent. Regular updates and efficient fitting with minimal disruptions to my family. Quality is great. Definitely use again',
      platform: 'Google'
    },
    {
      id: 18,
      author: 'Alina Vlad',
      rating: 5,
      date: 'Recently',
      text: 'Swift rooms was recommended to us by a friend and their response was incredibly prompt and professional. Yaseen, the Sales Director was exceptionally helpful, took time to explain in detail the options for different frames and the installation process and sent photos and videos of previous installations the company has done. Overall very pleased with their service.',
      platform: 'Google'
    },
    {
      id: 19,
      author: 'Lucy Horsham',
      rating: 5,
      date: 'Recently',
      text: 'Shout out to Imran Mani and his team who came to sort the snagging we had following installation of our bifold doors. Imran was professional and efficient and worked through all of the things I asked for step by step. I was really impressed with his work and knowledge. Thank you!',
      platform: 'Google'
    },
    {
      id: 20,
      author: 'Ayla Nayal',
      rating: 5,
      date: 'Recently',
      text: 'A wonderful team with great expertise and professional skills. Murad has been my main point of contact, always available to answer my endless queries, and giving me the best solutions to fit my concerns. The project manager and senior project manager, Jibran and Gerald, were also super responsive and made sure that all my requests were met to the highest standards. Many thanks to the entire team at Swift Rooms.',
      platform: 'Google'
    },
    {
      id: 21,
      author: 'Stacy Stewart',
      rating: 5,
      date: 'Recently',
      text: 'No words, simply amazing service. The Swiftrooms team called me out of the blue to provide a service call free of charge. They took the time to inspect all the doors and windows to ensure that all the seals, brushes, and door alignment were perfect. This is such important work during these Dubai summer months. Imran and the maintenance team were simply amazing. I would highly recommend this company.',
      platform: 'Google'
    },
    {
      id: 22,
      author: 'Masroor Batin',
      rating: 5,
      date: 'Recently',
      text: 'Had a good experience dealing with Swiftrooms replacing our sliding / bifold doors for the villa. Found the process transparent, engaging and the end result to our satisfaction. It\'s been a fantastic change from the quality of the doors from the previous vendor. Recommend them for anyone looking to replace door / windows in their villa',
      platform: 'Google'
    },
    {
      id: 23,
      author: 'Tim Draper',
      rating: 5,
      date: 'Recently',
      text: 'Swiftrooms did an amazing job fitting new windows to our place, they fabricated a complex shaped window in PVC which fitted perfectly. The work on the windows they fitted was done with care. The team were thorough, friendly and very well organised. I was impressed with the job they did and would definitely recommend using Swiftrooms to anyone. First class job, well done.',
      platform: 'Google'
    },
    {
      id: 24,
      author: 'Sonali Ahluwalia',
      rating: 5,
      date: 'Recently',
      text: 'We have had a great experience from start to finish with Swiftrooms. Great job by Murad and Jibran with his team. There was excellent communication throughout and we appreciate that.',
      platform: 'Google'
    },
    {
      id: 25,
      author: 'Immy X',
      rating: 5,
      date: 'Recently',
      text: 'These guys are good. I recently got bifolding doors, some windows and the ever necessary fly screens from Swift Rooms. Great service from the start, installation team that actually were experts in what they were doing, spot on. Credit to Yaseen, Imran Mani, Kumar and Prabath. Ultimately great product at right price and the wife is happy, which in itself is an achievement, believe me.',
      platform: 'Google'
    },
    {
      id: 26,
      author: 'Christine Travis',
      rating: 5,
      date: 'Recently',
      text: 'We have been using these bifold for over a year now, quality is outstanding. Brilliant service from start to finish, everything came out perfectly. It was so easy to deal with Yasmeen and his team members. We are absolutely satisfied with the doors and would highly recommend this company to anyone.',
      platform: 'Google'
    },
    {
      id: 27,
      author: 'Yaqoob Albelooshi',
      rating: 5,
      date: 'Recently',
      text: 'Recently purchased a product from Swift Room, and I must say that their after-sale services were truly outstanding. The level of support and assistance I received post-purchase exceeded my expectations. It\'s clear that they value their customers and are committed to providing top-notch service. I would like to mention Gerald and his technical teams Issac and the programme manager Amir Saif for their exceptional cooperations and response.',
      platform: 'Google'
    },
    {
      id: 28,
      author: 'Dominique Dondelinger',
      rating: 5,
      date: 'Recently',
      text: 'We had bifold doors fitted by swift rooms and would strongly recomend them. Yaseen (sales/owner) was very knowledgeable and William (measurements and on site visits) was very professionable. Even the fitter, Mazkhan was respectfull and did a quality job. The quality, colour match with developer and glass are spot on. Honestly for the money paid i wouldnt waste time going anywhere else.',
      platform: 'Google'
    },
    {
      id: 29,
      author: 'Sultan Al-Sulaiman',
      rating: 5,
      date: 'Recently',
      text: 'I must say that Swift Rooms experience that I had was amazing. From design, selecting, to all the way to delivery everything went flawlessly. The work etiquette and professionalism was great. I would highly recommend them especially the person I dealt with was Mr Yaseen who made this all happen smoothly.',
      platform: 'Google'
    },
    {
      id: 30,
      author: 'Nicholas Jones',
      rating: 5,
      date: 'Recently',
      text: 'Can\'t recommend enough. Team were polite, tidy and always going the extra mile. They gave great advice and tried to upsell. Will be using for the rest of ours upgrades',
      platform: 'Google'
    },
    {
      id: 31,
      author: 'Paul Herinx',
      rating: 5,
      date: 'Recently',
      text: 'I was in contact with Yaseen from Swift Rooms and the experience was excellent. Highest quality of systems is being used and Yaseen was able to give me excellent detailed service troughout the whole proces, from initial quotation to installation and aftercare. Highly recommended!',
      platform: 'Google'
    },
    {
      id: 32,
      author: 'Tariq Alyasi',
      rating: 5,
      date: 'Recently',
      text: 'Had a very good experience and excellent support during the recent heavy rain leak i had with my skylights. Special thanks goes to Ms Richa, Maaz team and Kumar team for their support, work and follow up.',
      platform: 'Google'
    },
    {
      id: 33,
      author: 'Reefaya Noortaj',
      rating: 5,
      date: 'Recently',
      text: 'Where do I begin with SwiftRooms amazing durable work. 12 years on and still going strong with our glass roof installation at our Al Badia Residence apartment. I highly recommend SwiftRooms for glass roof installation. You will be guaranteed with great products and services!',
      platform: 'Google'
    },
    {
      id: 34,
      author: 'Prashant Karuthasen',
      rating: 5,
      date: 'Recently',
      text: 'Absolutely great service! The team were very responsive and Jibran was an excellent project manager. Would highly recommend them.',
      platform: 'Google'
    },
    {
      id: 35,
      author: 'Nasser Alshamsi',
      rating: 5,
      date: 'Recently',
      text: 'I contacted swiftrooms regarding replacing two of my doors. When the surveyor came out, he showed me that the glass had been installed incorrectly. I decided not to change the doors and had my deposit swiftly returned. Amazing service and honest company. Did not mess me about at all and were very honest throughout. Will definitely use and recommend them to anyone who needs windows and doors.',
      platform: 'Google'
    },
    {
      id: 36,
      author: 'Rabia ElAbyad',
      rating: 5,
      date: 'Recently',
      text: 'Super professional company installation was easy and very smooth. Amir specifically was very helpful and made the whole process very smooth. I would highly recommend',
      platform: 'Google'
    },
    {
      id: 37,
      author: 'Atif Mahmood',
      rating: 5,
      date: 'Recently',
      text: 'Excellent service by Swift Rooms in repairing the skylight they installed 5 years ago under warranty. Imran is extremely helpful and Richa and Asif were very accommodating.',
      platform: 'Google'
    },
    {
      id: 38,
      author: 'Mai Rashed',
      rating: 5,
      date: 'Recently',
      text: 'Some may find Swift Rooms little expensive in comparison to their competitors. However if you check Swift Rooms product quality, you will find their prices very competitive. They keep challenging themselves to thrive & strive for "Good Job" that makes customer happy. I am indeed one of their customer and extremely happy with the conservatory I have now for my family at home, the Installation team were wonderful headed by Gerard and Mark.',
      platform: 'Google'
    },
    {
      id: 39,
      author: 'James Wilton',
      rating: 5,
      date: 'Recently',
      text: 'Highly recommended!! I\'ve had the pleasure of working with SwiftRooms for a number of years and they are your go to company for all things doors and windows. Great service, great price and they only use the highest quality materials.',
      platform: 'Google'
    },
    {
      id: 40,
      author: 'Nabeel Moghal',
      rating: 5,
      date: 'Recently',
      text: 'Recently used them for a service call to change a lock. Imran was very professional and finished the job quickly. He clearly knows what he is doing. The response speed and communication from Richa was also excellent!',
      platform: 'Google'
    },
    {
      id: 41,
      author: 'Sultan Al Shamsi',
      rating: 5,
      date: 'Recently',
      text: 'One of the best Windows factory with different varieties of Windows designs. Moreover, the quality of the product is very good/ durable and the team is very professional, friendly and punctual. Whoever is planning and looking for window suppliers, I highly recommend SwiftRoom for the job.',
      platform: 'Google'
    },
    {
      id: 42,
      author: 'Imran Zaidi',
      rating: 5,
      date: 'Recently',
      text: 'Very happy with the post sales support of the bi folding doors installed by Swift. The locking mechanism was getting stuck and Richa responded immediately and got Imran and Ahmer to come over and fix the door and check others also.',
      platform: 'Google'
    },
    {
      id: 43,
      author: 'Georges Mojica',
      rating: 5,
      date: 'Recently',
      text: 'I would like to express my gratitude to Callum for the amazing job he has accomplished in a short time. In one day he managed to install all (almost alone) my 5 meters PVC structures and glass front along with one French door for my balcony. He was fast and precis and on top of the job at anytime. That job was supposed to take initially 3 days and he closed it in 1 day. AMAZING GENTLEMEN. Bravo',
      platform: 'Google'
    },
    {
      id: 44,
      author: 'Lindsay Pigott',
      rating: 5,
      date: 'Recently',
      text: 'We used Swiftrooms to supply us with two sets of Bifold doors for our villa. The quality of their work is exceptional and their customer service excellent. We would highly recommend',
      platform: 'Google'
    },
    {
      id: 45,
      author: 'Jal Khaled',
      rating: 5,
      date: 'Recently',
      text: 'Swift Rooms just finished an extension to the existing structure that i did 8 years ago, due to the pandemic and associated restrictions i had to wait but it was worth the wait. The outcome was a beautiful extension with the same workmanship and care. I will never hesitate in recommending them for such projects.',
      platform: 'Google'
    },
    {
      id: 46,
      author: 'Jijo Jose',
      rating: 5,
      date: 'Recently',
      text: 'The team is very good and responsive, especially Mr. Murad who was supporting us with the design and all the process.',
      platform: 'Google'
    },
    {
      id: 47,
      author: 'Karl Backlund',
      rating: 5,
      date: 'Recently',
      text: 'Swift rooms was professional and on time. I\'m very happy with my new doors and windows. I highly recommend them. A big shoutout to Imran for his great service!',
      platform: 'Google'
    },
    {
      id: 48,
      author: 'Salma Kayali',
      rating: 5,
      date: 'Recently',
      text: 'The team was absolutely brilliant. Super friendly, explained the issue, was proactive, and didn\'t over charge.',
      platform: 'Google'
    },
    {
      id: 49,
      author: 'Victoria T.',
      rating: 5,
      date: 'Recently',
      text: 'Yaseen is a super helpful, knowledgeable and supportive professional, for all windows and glass topics I always deal with him. I\'m really happy to work with swift rooms!',
      platform: 'Google'
    }
  ];

  return {
    reviews,
    averageRating: 5.0,
    totalReviews: 49,
  };
}

/**
 * Example: Cached review fetching with refresh interval
 * Implement this in production to reduce API calls
 */
export class ReviewsCache {
  private static reviews: ReviewsResponse | null = null;
  private static lastFetch: number = 0;
  private static CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  static async getReviews(forceRefresh = false): Promise<ReviewsResponse> {
    const now = Date.now();
    
    if (!forceRefresh && this.reviews && (now - this.lastFetch) < this.CACHE_DURATION) {
      return this.reviews;
    }

    this.reviews = await fetchGoogleReviews();
    this.lastFetch = now;
    return this.reviews;
  }

  static clearCache(): void {
    this.reviews = null;
    this.lastFetch = 0;
  }
}
