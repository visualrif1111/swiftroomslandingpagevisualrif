import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote, MapPin, Hammer } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TestimonialsCADElements } from './CADFloatingElements';
import type { Review } from '../types/reviews';
import { fetchGoogleReviews } from '../services/googleReviewsService';

/**
 * TESTIMONIALS SECTION - Google Reviews Integration
 * 
 * This component displays customer reviews from Google.
 * 
 * INTEGRATION GUIDE:
 * ==================
 * 
 * Current State: Using static reviews (49 real Swift Rooms reviews)
 * 
 * To Enable Google API Integration:
 * 1. Open /src/app/services/googleReviewsService.ts
 * 2. Follow the integration instructions in that file
 * 3. Set useStaticReviews to false in the CONFIG object
 * 4. The component will automatically fetch from Google API
 * 
 * Features:
 * - Auto-fetches reviews on component mount
 * - Loading state while fetching
 * - Error handling with fallback to static reviews
 * - Automatic carousel with all reviews
 * - Responsive design
 */

// Configuration
const CONFIG = {
  useStaticReviews: true, // Set to false to use Google API
  staticReviews: [
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
  ] as Review[]
};

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="hidden lg:block absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#007969] rounded-full p-2 lg:p-3 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Next testimonial"
    >
      <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
    </button>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="hidden lg:block absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#007969] rounded-full p-2 lg:p-3 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Previous testimonial"
    >
      <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
    </button>
  );
}

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

// Derive a project type + location tag from the reviewer's own words, so each
// card shows richer context without inventing details they didn't mention.
const UAE_LOCATIONS = [
  'Palm Jumeirah', 'Dubai Hills', 'Arabian Ranches', 'Damac Hills', 'The Meadows',
  'The Springs', 'Al Barari', 'Umm Suqeim', 'Jumeirah', 'Abu Dhabi', 'Sharjah',
  'Al Ain', 'Ajman', 'Ras Al Khaimah', 'Dubai',
];
const PRODUCT_KEYWORDS: [RegExp, string][] = [
  [/bi-?fold/i, 'Bifold Doors'],
  [/sunroom|garden room|glass room/i, 'Glass Room'],
  [/skylight/i, 'Skylights'],
  [/sliding|patio door/i, 'Sliding Doors'],
  [/balcon/i, 'Balcony Glazing'],
  [/pvc|upvc/i, 'uPVC Systems'],
  [/window/i, 'Windows'],
  [/door/i, 'Doors'],
];
function getReviewMeta(text: string): { projectType: string; location: string } {
  const projectType = PRODUCT_KEYWORDS.find(([re]) => re.test(text))?.[1] ?? 'Windows & Doors';
  const location = UAE_LOCATIONS.find((l) => new RegExp(`\\b${l}\\b`, 'i').test(text)) ?? 'UAE';
  return { projectType, location };
}
function getInitials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
}

function ReviewMetaTags({ projectType, location }: { projectType: string; location: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1 bg-[#007969]/8 text-[#007969] rounded-full px-2.5 py-1 font-body text-xs font-medium">
        <Hammer className="w-3 h-3" />
        {projectType}
      </span>
      <span className="inline-flex items-center gap-1 bg-[#f3f4f6] text-[#3a3a3c] rounded-full px-2.5 py-1 font-body text-xs font-medium">
        <MapPin className="w-3 h-3 text-[#007969]" />
        {location}
      </span>
    </div>
  );
}

function ReviewAvatar({ name }: { name: string }) {
  return (
    <div
      className="w-11 h-11 flex-shrink-0 rounded-full bg-gradient-to-br from-[#007969] to-[#005a50] text-white flex items-center justify-center font-heading text-base font-semibold shadow-sm"
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const meta = getReviewMeta(review.text);
  return (
    <div className="px-3 sm:px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white sr-card-premium lg:rounded-2xl lg:border lg:border-[#e5e7eb] lg:shadow-none p-6 lg:p-8 card-hover relative overflow-hidden group max-w-4xl mx-auto"
      >
        {/* Quote Icon Background */}
        <div className="absolute top-3 right-3 lg:top-4 lg:right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <Quote className="w-16 h-16 lg:w-24 lg:h-24 text-[#007969]" />
        </div>

        {/* Mobile Content — identity up top, comfortable quote */}
        <div className="relative z-10 lg:hidden">
          {/* Author + verified source */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <ReviewAvatar name={review.author} />
              <div className="min-w-0">
                <p className="font-heading text-base font-semibold text-[#1c1c1e] truncate">
                  {review.author}
                </p>
                {/* Stars — emphasized */}
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFA500] text-[#FFA500]" />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#007969]/5 px-2.5 py-1 rounded-full shrink-0 self-start">
              <GoogleGlyph className="w-3.5 h-3.5" />
              <span className="font-body text-xs font-medium text-[#007969]">
                Google
              </span>
            </div>
          </div>

          {/* Project type + location tags */}
          <div className="mb-3">
            <ReviewMetaTags projectType={meta.projectType} location={meta.location} />
          </div>

          {/* Review Text */}
          <p className="font-body text-[17px] text-[#2a2a2c] leading-[1.65]">
            "{review.text}"
          </p>
        </div>

        {/* Desktop Content */}
        <div className="relative z-10 hidden lg:block">
          {/* Stars + project/location tags */}
          <div className="flex items-center justify-between gap-4 mb-3 lg:mb-4">
            <div className="flex items-center gap-1">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 lg:w-5 lg:h-5 fill-[#FFA500] text-[#FFA500]"
                />
              ))}
            </div>
            <ReviewMetaTags projectType={meta.projectType} location={meta.location} />
          </div>

          {/* Review Text */}
          <p className="font-body text-sm lg:text-lg text-[#3a3a3c] leading-relaxed mb-4 lg:mb-6">
            "{review.text}"
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-[#e5e7eb]">
            <div className="flex items-center gap-3">
              <ReviewAvatar name={review.author} />
              <div>
                <p className="font-heading text-sm lg:text-base font-semibold text-[#1c1c1e]">
                  {review.author}
                </p>
                <p className="font-body text-xs lg:text-sm text-[#6b7280] mt-0.5">
                  Verified Google review
                </p>
              </div>
            </div>

            {/* Google Badge */}
            <div className="flex items-center gap-1.5 lg:gap-2 bg-[#007969]/5 px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full">
              <GoogleGlyph className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span className="font-body text-xs font-medium text-[#007969]">
                Google
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function TestimonialsSection() {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(CONFIG.staticReviews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  useEffect(() => {
    if (!CONFIG.useStaticReviews) {
      setLoading(true);
      fetchGoogleReviews()
        .then(data => {
          setReviews(data.reviews);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch Google reviews:', err);
          setError(true);
          setLoading(false);
        });
    }
  }, []);

  return (
    <section id="testimonials" className="relative bg-gradient-to-br from-[#f8f9fa] via-white to-[#f0f7f6] pt-20 lg:pt-24 pb-12 lg:pb-16 lg:snap-start overflow-hidden">
      {/* CAD Elements Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <TestimonialsCADElements />
      </div>

      {/* Container */}
      <div className="relative z-30 container mx-auto px-4 lg:px-6 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 lg:mb-10"
        >
          <h2 className="font-heading sr-heading font-semibold lg:font-medium lg:text-4xl text-[#1c1c1e] mb-2 lg:mb-3 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="font-body text-sm lg:text-lg text-[#6b7280] max-w-2xl mx-auto">
            Don't just take our word for it—hear from our satisfied customers across the UAE
          </p>

          {/* Google Rating Summary */}
          <div className="flex items-center justify-center gap-2 lg:gap-3 mt-4 lg:mt-6">
            <div className="flex items-center gap-0.5 lg:gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 lg:w-5 lg:h-5 fill-[#FFA500] text-[#FFA500]"
                />
              ))}
            </div>
            <span className="font-heading text-base lg:text-xl font-bold text-[#1c1c1e]">
              4.4
            </span>
            <span className="font-body text-xs lg:text-sm text-[#6b7280]">
              Based on 130+ Google reviews
            </span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto mb-6 lg:mb-8">
          <Slider ref={sliderRef} {...sliderSettings}>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Slider>
        </div>

        {/* CTA Button */}
      </div>
    </section>
  );
}