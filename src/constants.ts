export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Appetizer' | 'Main' | 'Dessert' | 'Drink';
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'ต้มยำกุ้งแม่น้ำ (Tom Yum Goong)',
    description: 'Spicy and sour soup with river prawns, lemongrass, and galangal.',
    price: 350,
    image: 'https://picsum.photos/seed/tomyum/800/600',
    category: 'Main',
  },
  {
    id: '2',
    name: 'ผัดไทยกุ้งสด (Pad Thai)',
    description: 'Stir-fried rice noodles with fresh prawns, tofu, and bean sprouts.',
    price: 180,
    image: 'https://picsum.photos/seed/padthai/800/600',
    category: 'Main',
  },
  {
    id: '3',
    name: 'แกงเขียวหวานไก่ (Green Curry)',
    description: 'Authentic Thai green curry with tender chicken and Thai eggplants.',
    price: 220,
    image: 'https://picsum.photos/seed/greencurry/800/600',
    category: 'Main',
  },
  {
    id: '4',
    name: 'ส้มตำไทย (Som Tum)',
    description: 'Classic green papaya salad with peanuts and dried shrimp.',
    price: 120,
    image: 'https://picsum.photos/seed/somtum/800/600',
    category: 'Appetizer',
  },
  {
    id: '5',
    name: 'ข้าวเหนียวมะม่วง (Mango Sticky Rice)',
    description: 'Sweet sticky rice served with ripe mango and coconut milk.',
    price: 150,
    image: 'https://picsum.photos/seed/mango/800/600',
    category: 'Dessert',
  },
  {
    id: '6',
    name: 'ชาไทย (Thai Milk Tea)',
    description: 'Traditional Thai tea with condensed milk and ice.',
    price: 85,
    image: 'https://picsum.photos/seed/thaitea/800/600',
    category: 'Drink',
  },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'p1',
    title: 'Weekday Lunch Special',
    description: 'Get a free Thai Milk Tea with any main course order.',
    discount: 'Free Drink',
    image: 'https://picsum.photos/seed/promo1/800/400',
  },
  {
    id: 'p2',
    title: 'Family Set',
    description: 'Order 4 main courses and get 20% off your total bill.',
    discount: '20% OFF',
    image: 'https://picsum.photos/seed/promo2/800/400',
  },
];
