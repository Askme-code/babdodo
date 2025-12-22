import type { Service, Post } from './types';

const services: Service[] = [
  {
    id: '1',
    slug: 'serengeti-classic-safari',
    title: 'Serengeti Classic Safari',
    description: 'Experience the world-famous Serengeti National Park. Witness the Great Migration and the Big Five.',
    longDescription: 'Our most popular safari takes you to the heart of the action. Spend three days and two nights exploring the vast plains of the Serengeti. You will stay in luxury tented camps, enjoy gourmet meals, and be guided by our most experienced safari experts. This is a once-in-a-lifetime opportunity to see nature at its most majestic.',
    price: 1500,
    duration: '3 Days, 2 Nights',
    location: 'Serengeti National Park',
    image: 'serengeti-safari',
    gallery: ['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4'],
    included: ['Park fees', '4x4 Safari Vehicle', 'Professional Guide', 'Accommodation', 'All meals'],
    excluded: ['International Flights', 'Visa fees', 'Tips', 'Personal items'],
    type: 'safari',
    featured: true,
  },
  {
    id: '2',
    slug: 'ngorongoro-crater-day-trip',
    title: 'Ngorongoro Crater Day Trip',
    description: 'A full-day trip to the "Eden of Africa". Unparalleled wildlife density.',
    longDescription: 'Descend into the world\'s largest intact volcanic caldera for an unforgettable day of wildlife viewing. The Ngorongoro Crater is home to a dense population of lions, elephants, rhinos, and more. This packed day trip from Arusha is perfect for those short on time but eager for a world-class safari experience.',
    price: 450,
    duration: '1 Day',
    location: 'Ngorongoro Crater',
    image: 'ngorongoro-crater',
    gallery: ['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4'],
    included: ['Park fees', 'Safari Vehicle', 'Guide', 'Lunchbox'],
    excluded: ['Tips', 'Drinks'],
    type: 'safari',
    featured: true,
  },
  {
    id: '3',
    slug: 'stone-town-and-spice-farm',
    title: 'Stone Town & Spice Farm Tour',
    description: 'Explore the historic heart of Zanzibar and discover the secrets of the Spice Island.',
    longDescription: 'This full-day tour combines history and sensory delight. In the morning, you will get lost in the labyrinthine alleys of Stone Town, a UNESCO World Heritage site. After a traditional Swahili lunch, we will take you to a local spice farm where you can see, smell, and taste the spices that made Zanzibar famous.',
    price: 80,
    duration: 'Full Day',
    location: 'Zanzibar',
    image: 'stone-town',
    gallery: ['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4'],
    included: ['Guided tour', 'Entrance fees', 'Lunch', 'Spice tasting'],
    excluded: ['Personal purchases', 'Tips'],
    type: 'tour',
    featured: true,
  },
  {
    id: '4',
    slug: 'blue-lagoon-snorkeling',
    title: 'Blue Lagoon Snorkeling Adventure',
    description: 'Sail on a traditional dhow boat to the Blue Lagoon for a day of snorkeling.',
    longDescription: 'Escape to a snorkeler\'s paradise. The Blue Lagoon offers crystal-clear waters, vibrant coral reefs, and an abundance of marine life. We will sail on a traditional wooden dhow, enjoy a delicious seafood barbecue on a secluded beach, and provide all the snorkeling gear you need for an amazing day on the water.',
    price: 65,
    duration: 'Full Day',
    location: 'Zanzibar',
    image: 'zanzibar-beach',
    gallery: ['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4'],
    included: ['Dhow boat trip', 'Snorkeling gear', 'Seafood BBQ lunch', 'Fruits & drinks'],
    excluded: ['Tips', 'Hotel transfer (add-on)'],
    type: 'tour',
    featured: true,
  },
  {
    id: '5',
    slug: 'zanzibar-airport-transfer',
    title: 'Zanzibar Airport Transfer',
    description: 'Reliable and comfortable private transfer from Abeid Amani Karume International Airport.',
    longDescription: 'Start your Zanzibar holiday stress-free. Our professional driver will meet you at the airport arrivals hall and take you directly to your hotel in a comfortable, air-conditioned vehicle. We track your flight to ensure we are there on time, even if your flight is delayed. Available for all hotels on the island.',
    price: 50,
    duration: 'Varies',
    location: 'Zanzibar',
    image: 'airport-transfer',
    gallery: ['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4'],
    included: ['Private vehicle', 'Professional driver', 'Meet & greet service'],
    excluded: [''],
    type: 'transfer',
    featured: false,
  },
];

const posts: Post[] = [
    {
        id: '1',
        slug: 'best-time-to-visit-tanzania',
        title: 'When is the Best Time to Visit Tanzania?',
        excerpt: 'Discover the ideal seasons for safari, beach holidays, and everything in between. Planning your trip...',
        content: 'Full blog post content goes here.',
        author: 'Jane Doe',
        date: 'June 15, 2024',
        featuredImage: 'blog-wildlife'
    },
    {
        id: '2',
        slug: 'packing-guide-for-safari',
        title: 'The Ultimate Safari Packing Guide',
        excerpt: 'Not sure what to bring on your safari adventure? Our comprehensive guide covers all the essentials...',
        content: 'Full blog post content goes here.',
        author: 'John Smith',
        date: 'June 10, 2024',
        featuredImage: 'blog-guide'
    },
    {
        id: '3',
        slug: 'zanzibar-hidden-gems',
        title: '5 Hidden Gems to Discover in Zanzibar',
        excerpt: 'Go beyond the popular spots and explore the secret beaches, local eateries, and cultural sites that make...',
        content: 'Full blog post content goes here.',
        author: 'Aisha Juma',
        date: 'June 5, 2024',
        featuredImage: 'blog-culture'
    }
];

export const getServicesByType = (type: 'tour' | 'safari' | 'transfer'): Service[] => {
  return services.filter(service => service.type === type);
};

export const getFeaturedServices = (type: 'tour' | 'safari' | 'transfer', count: number = 3): Service[] => {
    return services.filter(service => service.type === type && service.featured).slice(0, count);
}

export const getAllServices = (): Service[] => services;

export const getServiceBySlug = (slug: string): Service | undefined => {
    return services.find(service => service.slug === slug);
}


export const getAllPosts = (): Post[] => posts;

export const getFeaturedPosts = (count: number = 3): Post[] => {
    return posts.slice(0, count);
}

export const getPostBySlug = (slug: string): Post | undefined => {
    return posts.find(post => post.slug === slug);
}
