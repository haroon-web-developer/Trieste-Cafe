export interface MenuItem {
  id: string;
  name: string;
  category: 'beef_steaks' | 'chicken_steaks' | 'appetizers' | 'burgers' | 'coffee_drinks' | 'chef_deals';
  price: number;
  description: string;
  popular?: boolean;
  bestseller?: boolean;
  image: string;
  spicyLevel?: 0 | 1 | 2;
  prepTime?: string;
  includesSides?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatarText: string;
  rating: number;
  timeAgo: string;
  reviewMeta: string;
  content: string;
  tags: string[];
  ownerResponse?: {
    date: string;
    text: string;
  };
}

export const RESTAURANT_INFO = {
  name: 'Cafe Trieste',
  tagline: 'Artisan Steaks, Continental Bistro & Specialty Coffee',
  subtitle: 'Shop 16A, Street 26, Business Bay, Sector F, DHA Phase 1, Islamabad',
  rating: 4.2,
  reviewCount: 1883,
  priceRange: 'Rs 1,000–6,000',
  averageReported: 'Rs 1,000–6,000 per person (Reported by 145 people)',
  phone: '+92 51 5400170',
  phoneClean: '+92515400170',
  plusCode: 'G3CV+VH Islamabad, Pakistan',
  address: 'Shop 16A, Street 26, Business Bay, Sector F, DHA Phase 1, Islamabad, Pakistan',
  hours: {
    standard: '11:00 AM – 12:00 AM (Midnight)',
    opensAt: '11:00 AM',
    closesAt: '12:00 AM',
    statusText: 'Opens daily at 11:00 AM',
  },
  services: [
    { name: 'Dine-in', description: 'Cozy modern seating, leather booths & intimate tables' },
    { name: 'Curbside pickup', description: 'Hot & ready orders handed right to your car' },
    { name: 'No-contact delivery', description: 'Available through foodpanda.pk & in-house dispatch' },
  ],
  foodpandaUrl: 'https://www.foodpanda.pk/',
  facebookMenuUrl: 'https://www.facebook.com/',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cafe+Trieste+DHA+Phase+1+Islamabad',
  ownership: 'Women-owned business',
};

export const MENU_ITEMS: MenuItem[] = [
  // Prime Beef Steaks
  {
    id: 'mushroom-steak',
    name: 'Prime Mushroom Steak',
    category: 'beef_steaks',
    price: 2450,
    description: 'Tender prime beef cut grilled over open flames, smothered in rich wild cremini & button mushroom peppercorn cream sauce. Served with roasted rosemary baby potatoes and char-grilled garden vegetables.',
    popular: true,
    bestseller: true,
    image: '/src/assets/images/trieste_mushroom_steak_1791360884906.jpg',
    includesSides: true,
    prepTime: '20-25 mins',
  },
  {
    id: 'italian-steak',
    name: 'Signature Italian Steak',
    category: 'beef_steaks',
    price: 2550,
    description: 'Juicy prime beef tenderloin seared to perfection, finished with shaved aged parmesan, sun-dried tomatoes, aromatic rosemary balsamic drizzle, and fresh herb butter.',
    popular: true,
    image: '/src/assets/images/trieste_italian_steak_1791360901248.jpg',
    includesSides: true,
    prepTime: '20-25 mins',
  },
  {
    id: 'black-pepper-steak',
    name: 'Trieste Cracked Pepper Steak',
    category: 'beef_steaks',
    price: 2490,
    description: 'Charred beef fillet glazed in cracked Tellicherry black peppercorn demi-glace with caramelized shallots and velvety roasted garlic baby potatoes.',
    popular: true,
    spicyLevel: 1,
    image: '/src/assets/images/trieste_pepper_steak_1791367091481.jpg',
    includesSides: true,
    prepTime: '20-25 mins',
  },
  {
    id: 'moroccan-steak',
    name: 'Fiery Moroccan Steak',
    category: 'beef_steaks',
    price: 2590,
    description: 'Prime beef medallion infused with aromatic North African spices, finished with fiery sambal cream, caramelized shallots, and herb-spiced wedges.',
    popular: false,
    spicyLevel: 2,
    image: '/src/assets/images/trieste_moroccan_steak_1791367108024.jpg',
    includesSides: true,
    prepTime: '20-25 mins',
  },
  {
    id: 'twin-steak',
    name: 'Trieste Dual Skillet Steak',
    category: 'beef_steaks',
    price: 2950,
    description: 'Two prime medallions on a sizzling platter: one draped in velvety mushroom sauce and one in zesty cracked pepper sauce, served with twin sides.',
    popular: true,
    image: '/src/assets/images/trieste_bogo_deal_1791367009696.jpg',
    includesSides: true,
    prepTime: '25-30 mins',
  },

  // Chicken Steaks
  {
    id: 'chicken-mushroom-steak',
    name: 'Grilled Mushroom Chicken Steak',
    category: 'chicken_steaks',
    price: 1850,
    description: 'Succulent grilled chicken breast cutlets simmered in garlic herb mushroom sauce, served with roasted seasonal vegetables and mashed potatoes.',
    popular: true,
    bestseller: true,
    image: '/src/assets/images/trieste_chicken_steak_1791367047199.jpg',
    includesSides: true,
    prepTime: '15-20 mins',
  },
  {
    id: 'tarragon-chicken-steak',
    name: 'French Tarragon Chicken Steak',
    category: 'chicken_steaks',
    price: 1890,
    description: 'Golden char-broiled chicken breasts infused with fresh tarragon leaves, white mustard emulsion, steamed buttered greens, and mashed potatoes.',
    popular: false,
    image: '/src/assets/images/trieste_chicken_steak_1791367047199.jpg',
    includesSides: true,
    prepTime: '15-20 mins',
  },
  {
    id: 'jalapeno-salsa-chicken',
    name: 'Spicy Mexican Jalapeño Chicken',
    category: 'chicken_steaks',
    price: 1890,
    description: 'Grilled spiced chicken fillet topped with charred jalapeno salsa, melted Monterey Jack cheese, and crispy onion straws.',
    popular: true,
    spicyLevel: 2,
    image: '/src/assets/images/trieste_jalapeno_chicken_1791367118191.jpg',
    includesSides: true,
    prepTime: '15-20 mins',
  },
  {
    id: 'florentine-stuffed-chicken',
    name: 'Florentine Spinach Stuffed Chicken',
    category: 'chicken_steaks',
    price: 1980,
    description: 'Tender chicken breast pocket filled with baby spinach, feta and cream cheese, baked crisp and drizzled with lemon butter emulsion.',
    popular: true,
    image: '/src/assets/images/trieste_chicken_steak_1791367047199.jpg',
    includesSides: true,
    prepTime: '20-25 mins',
  },

  // Chef's Special Deals (Every Deal Has Dedicated Image)
  {
    id: 'bogo-steak-deal',
    name: 'Buy-One-Get-One Special Steak Deal',
    category: 'chef_deals',
    price: 3890,
    description: 'Special evening feature: Order any 2 Prime Beef Steaks (Mushroom or Italian) with double sides and sauces at an exclusive dining bundle price.',
    popular: true,
    bestseller: true,
    image: '/src/assets/images/trieste_bogo_deal_1791367009696.jpg',
    includesSides: true,
    prepTime: '25 mins',
  },
  {
    id: 'executive-lunch-deal',
    name: 'Business Bay Executive Lunch Deal',
    category: 'chef_deals',
    price: 1990,
    description: 'Available 11 AM - 4 PM. Choice of Steak Sandwich or Classic Burger + Hand-Cut French Fries + Chilled Mint Margarita or Artisan Cappuccino.',
    popular: true,
    image: '/src/assets/images/trieste_executive_lunch_1791367022681.jpg',
    includesSides: true,
    prepTime: '15 mins',
  },
  {
    id: 'steak-date-night',
    name: 'Trieste Couples Steak Experience Deal',
    category: 'chef_deals',
    price: 5490,
    description: 'Complete romantic dining set: 1 Loaded Gourmet Nacho Starter + 2 Prime Beef Steaks of choice with sides + 2 Artisan Specialty Drinks.',
    popular: true,
    image: '/src/assets/images/trieste_date_night_1791367035814.jpg',
    includesSides: true,
    prepTime: '25 mins',
  },

  // Appetizers & Nachos
  {
    id: 'trieste-loaded-nachos',
    name: 'Trieste Loaded Gourmet Nachos',
    category: 'appetizers',
    price: 1290,
    description: 'House-made corn tortilla chips stacked with warm molten cheddar queso, pickled jalapeños, fresh pico de gallo, guacamole, and cool sour cream.',
    popular: true,
    bestseller: true,
    spicyLevel: 1,
    image: '/src/assets/images/trieste_loaded_nachos_1791367057449.jpg',
    prepTime: '10-15 mins',
  },
  {
    id: 'buffalo-chicken-wings',
    name: 'Crispy Buffalo Wings & Blue Cheese',
    category: 'appetizers',
    price: 1190,
    description: 'Double-dredged crispy wings tossed in cayenne chili glaze, served with creamy blue cheese dipping sauce and crisp celery sticks.',
    popular: true,
    spicyLevel: 2,
    image: '/src/assets/images/trieste_buffalo_wings_1791367127249.jpg',
    prepTime: '12-15 mins',
  },
  {
    id: 'parmesan-truffle-fries',
    name: 'Wild Truffle & Parmesan Fries',
    category: 'appetizers',
    price: 790,
    description: 'Hand-cut russet potatoes tossed in fragrant white truffle oil, Himalayan sea salt, finely chopped Italian parsley, and aged Grana Padano.',
    popular: true,
    image: '/src/assets/images/trieste_truffle_fries_1791367078620.jpg',
    prepTime: '10 mins',
  },

  // Burgers & Sandwiches
  {
    id: 'trieste-classic-burger',
    name: 'Trieste Prime Cheeseburger',
    category: 'burgers',
    price: 1390,
    description: '200g smashed prime beef patty, melted Wisconsin cheddar, balsamic caramelized onions, dill pickles, and house secret sauce on butter-toasted brioche. Served with hand-cut fries.',
    popular: true,
    bestseller: true,
    image: '/src/assets/images/trieste_classic_burger_1791367067156.jpg',
    includesSides: true,
    prepTime: '15 mins',
  },
  {
    id: 'smoky-bbq-steak-sandwich',
    name: 'Smoked BBQ Steak Strips Sandwich',
    category: 'burgers',
    price: 1450,
    description: 'Slow-seared prime beef tenderloin strips, smoky barbecue glaze, melted swiss cheese, and crunchy purple cabbage slaw on toasted sourdough with fries.',
    image: '/src/assets/images/trieste_executive_lunch_1791367022681.jpg',
    includesSides: true,
    prepTime: '15 mins',
  },
  {
    id: 'crispy-buttermilk-chicken-burger',
    name: 'Crispy Buttermilk Chicken Burger',
    category: 'burgers',
    price: 1290,
    description: '24-hour buttermilk soaked golden fried chicken thigh, spicy garlic aioli, sweet dill pickles, and crisp lettuce on artisan brioche with fries.',
    popular: true,
    image: '/src/assets/images/trieste_classic_burger_1791367067156.jpg',
    includesSides: true,
    prepTime: '12-15 mins',
  },

  // Artisan Coffee & Beverages
  {
    id: 'trieste-cappuccino',
    name: 'Signature Artisan Cappuccino',
    category: 'coffee_drinks',
    price: 650,
    description: 'Freshly ground double ristretto shot from premium imported Arabica beans, silky microfoam, and hand-poured tulip latte art.',
    popular: true,
    image: '/src/assets/images/trieste_cappuccino_cafe_1791360915726.jpg',
    prepTime: '5 mins',
  },
  {
    id: 'fresh-mint-lemonade',
    name: 'Chilled Islamabad Mint Cooler',
    category: 'coffee_drinks',
    price: 550,
    description: 'Fresh organic garden mint leaves blended with zesty Persian lime juice, sparkling soda, and Himalayan pink salt over crushed ice.',
    popular: true,
    image: '/src/assets/images/trieste_mint_cooler_1791367137999.jpg',
    prepTime: '5 mins',
  },
  {
    id: 'spanish-iced-latte',
    name: 'Velvet Spanish Iced Latte',
    category: 'coffee_drinks',
    price: 750,
    description: 'Espresso shaken over sweet condensed cream, fresh whole milk, served over crystal clear ice blocks in a chilled tumbler.',
    popular: true,
    image: '/src/assets/images/trieste_cappuccino_cafe_1791360915726.jpg',
    prepTime: '5 mins',
  },
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'review-1',
    author: 'Aon Raza Zaidi',
    avatarText: 'AR',
    rating: 5,
    timeAgo: '5 months ago',
    reviewMeta: 'Local Guide · 63 reviews · 60 photos',
    content: 'Last week, I visited this restaurant with my family. The food was flavorful, and the service was prompt. The staff were polite and attentive. Overall, we had a great experience. I recommend it to anyone in DHA Phase 1.',
    tags: ['steaks', 'family dining', 'service'],
  },
  {
    id: 'review-2',
    author: 'Tristee Dining Guest',
    avatarText: 'TG',
    rating: 5,
    timeAgo: '1 year ago',
    reviewMeta: 'Verified Diner · 12 reviews',
    content: 'Trieste exceeded my expectations in every way. The steaks were cooked to perfection, and the service was warm and welcoming. I am particularly impressed by the reasonable pricing, which makes it an excellent choice for those looking for quality without breaking the bank. I look forward to returning and highly recommend Trieste to anyone seeking a great dining experience.',
    tags: ['steaks', 'steak deal', 'pricing'],
  },
  {
    id: 'review-3',
    author: 'Maria Murtaza',
    avatarText: 'MM',
    rating: 2,
    timeAgo: '2 months ago',
    reviewMeta: '7 reviews · 1 photo',
    content: 'Very disappointing experience. The packaging was awful, chocolate syrup had spilled all over the box and even leaked into the bag, making everything messy. On top of that, the waffles arrived cold...',
    tags: ['delivery'],
    ownerResponse: {
      date: '2 months ago',
      text: 'Hey! You must be mistaken. We don\'t serve waffles here at Cafe Trieste! We specialize strictly in authentic grilled steaks, gourmet burgers, and artisan coffee. Please do drop by our Business Bay location for our signature mushroom steak on the house!',
    },
  },
  {
    id: 'review-4',
    author: 'Anees Mufti',
    avatarText: 'AM',
    rating: 4,
    timeAgo: '8 months ago',
    reviewMeta: '4 reviews · 4 photos',
    content: 'Overall Experience: This was my third visit to Trieste, and this review reflects all three experiences collectively. The Mushroom Steak has consistently been cooked to medium perfection. Great ambiance in Business Bay, very warm staff, and quick table turnaround.',
    tags: ['steaks', 'mushroom steak', 'ambiance'],
  },
  {
    id: 'review-5',
    author: 'Hamza Qureshi',
    avatarText: 'HQ',
    rating: 5,
    timeAgo: '3 weeks ago',
    reviewMeta: 'Local Guide · 48 reviews · 22 photos',
    content: 'Hands down one of the top steakhouses in Islamabad/Rawalpindi. The Italian Steak with sun-dried tomatoes and parmesan was exceptional. Pricing is very fair compared to other DHA spots. Their Buy-One-Get-One offer is incredible value.',
    tags: ['steaks', 'italian steak', 'buy one get one free'],
  },
  {
    id: 'review-6',
    author: 'Dr. Saba Noor',
    avatarText: 'SN',
    rating: 5,
    timeAgo: '4 months ago',
    reviewMeta: 'Islamabad Food Chronicles · 31 reviews',
    content: 'Wonderful women-owned hospitality! The place has a cozy, unpretentious warmth. The chicken steak and cappuccino were both top notch. Business Bay parking is also hassle free right in front.',
    tags: ['chicken steaks', 'cappuccino', 'women-owned'],
  },
];

export const POPULAR_HOURS_DATA = [
  { time: '11 AM', percentage: 25, label: 'Quiet' },
  { time: '1 PM', percentage: 55, label: 'Lunch rush' },
  { time: '3 PM', percentage: 40, label: 'Moderate' },
  { time: '5 PM', percentage: 50, label: 'Coffee hours' },
  { time: '7 PM', percentage: 78, label: 'Dinner peak starts' },
  { time: '8 PM', percentage: 95, label: 'Busiest hour' },
  { time: '9 PM', percentage: 90, label: 'Very busy' },
  { time: '10 PM', percentage: 70, label: 'Steady' },
  { time: '11 PM', percentage: 45, label: 'Late supper' },
];

export const NEARBY_RESTAURANTS = [
  { name: 'Bistécca Cafe & Grill', rating: 4.8, reviews: 169, type: 'Restaurant & Grill' },
  { name: 'Roasters Coffee House & Grill', rating: 4.1, reviews: 2498, type: 'Restaurant & Coffee' },
  { name: 'SAGE CAFE & GRILL, BAHRIA', rating: 4.7, reviews: 662, type: 'Restaurant' },
  { name: 'Tandoori Nights', rating: 4.0, reviews: 486, type: 'Pakistani & Continental' },
];
