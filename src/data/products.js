// ─── Product catalogue ────────────────────────────────
export const CATEGORIES = [
  { id: 'fruits', label: 'Fruits', emoji: '🍎', color: '#e05252' },
  { id: 'vegetables', label: 'Vegetables', emoji: '🥦', color: '#52a869' },
  { id: 'dairy', label: 'Dairy', emoji: '🥛', color: '#6ba8d4' },
  { id: 'bakery', label: 'Bakery', emoji: '🍞', color: '#c8821a' },
  { id: 'beverages', label: 'Beverages', emoji: '🧃', color: '#d4774e' },
  { id: 'snacks', label: 'Snacks', emoji: '🍿', color: '#8b6cc4' },
];

export const PRODUCTS = [
  // Fruits
  {
    id: 1, name: 'Fresh Red Apples', category: 'fruits', price: 70, originalPrice: 100, rating: 4.7, reviews: 128, emoji: '🍎', image: '/img/product_apples.png', unit: 'per kg', inStock: true, featured: true, badge: 'Sale',
    description: 'Crisp and sweet red apples sourced from local orchards. Perfect for snacking or baking.'
  },
  {
    id: 2, name: 'Ripe Bananas', category: 'fruits', price: 50, originalPrice: null, rating: 4.5, reviews: 96, emoji: '🍌', image: '/img/product_bananas.png', unit: 'per bunch', inStock: true, featured: false, badge: null,
    description: 'Perfectly ripened bananas, rich in potassium and natural sweetness.'
  },
  {
    id: 3, name: 'Juicy Oranges', category: 'fruits', price: 70, originalPrice: null, rating: 4.6, reviews: 84, emoji: '🍊', image: '/img/product_oranges.png', unit: 'per kg', inStock: true, featured: false, badge: null,
    description: 'Sun-kissed navel oranges bursting with vitamin C and refreshing citrus flavor.'
  },
  {
    id: 4, name: 'Sweet Strawberries', category: 'fruits', price: 100, originalPrice: 7.49, rating: 4.8, reviews: 142, emoji: '🍓', image: '/img/product_strawberries.png', unit: '500g pack', inStock: true, featured: true, badge: 'Sale',
    description: 'Farm-fresh strawberries, hand-picked at peak ripeness for maximum sweetness.'
  },
  {
    id: 5, name: 'Green Grapes', category: 'fruits', price: 60, originalPrice: null, rating: 4.4, reviews: 61, emoji: '🍇', image: '/img/product_grapes.png', unit: 'per kg', inStock: true, featured: false, badge: null,
    description: 'Seedless green grapes with a crisp, refreshing taste.'
  },
  {
    id: 6, name: 'Ripe Mangoes', category: 'fruits', price: 80, originalPrice: null, rating: 4.9, reviews: 203, emoji: '🥭', image: '/img/product_mangoes.png', unit: '3 pack', inStock: true, featured: true, badge: 'Popular',
    description: 'Alphonso mangoes — intensely sweet with a velvety texture.'
  },

  // Vegetables
  {
    id: 7, name: 'Fresh Broccoli', category: 'vegetables', price: 150, originalPrice: null, rating: 4.5, reviews: 77, emoji: '🥦', image: '/img/product_broccoli.png', unit: 'per head', inStock: true, featured: false, badge: 'Organic',
    description: 'Tender organic broccoli florets, packed with vitamins K, C, and antioxidants.'
  },
  {
    id: 8, name: 'Baby Carrots', category: 'vegetables', price: 30, originalPrice: null, rating: 4.3, reviews: 55, emoji: '🥕', image: '/img/product_carrots.png', unit: '400g bag', inStock: true, featured: false, badge: null,
    description: 'Washed and ready-to-eat baby carrots. Perfect for snacking and stir-fries.'
  },
  {
    id: 9, name: 'Cherry Tomatoes', category: 'vegetables', price: 50, originalPrice: 3.99, rating: 4.7, reviews: 119, emoji: '🍅', image: '/img/product_tomatoes.png', unit: '250g punnet', inStock: true, featured: true, badge: 'Sale',
    description: 'Sweet vine-ripened cherry tomatoes, ideal for salads and pasta dishes.'
  },
  {
    id: 10, name: 'English Cucumber', category: 'vegetables', price: 80, originalPrice: null, rating: 4.2, reviews: 48, emoji: '🥒', image: '/img/product_spinach.png', unit: 'each', inStock: true, featured: false, badge: null,
    description: 'Crisp seedless cucumber with thin skin. Refreshing and hydrating.'
  },
  {
    id: 11, name: 'Red Onions', category: 'vegetables', price: 40, originalPrice: null, rating: 4.1, reviews: 39, emoji: '🧅', image: '/img/product_carrots.png', unit: 'per kg', inStock: true, featured: false, badge: null,
    description: 'Mild, slightly sweet red onions great raw in salads or caramelized.'
  },
  {
    id: 12, name: 'Baby Spinach', category: 'vegetables', price: 60, originalPrice: null, rating: 4.6, reviews: 88, emoji: '🌿', image: '/img/product_spinach.png', unit: '200g bag', inStock: true, featured: false, badge: 'Organic',
    description: 'Tender organic baby spinach leaves, pre-washed and ready to use.'
  },

  // Dairy
  {
    id: 13, name: 'Whole Milk', category: 'dairy', price: 50, originalPrice: null, rating: 4.6, reviews: 167, emoji: '🥛', image: '/img/product_milk.png', unit: '2L carton', inStock: true, featured: true, badge: null,
    description: 'Fresh whole milk from grass-fed cows. Creamy and nutritious for the whole family.'
  },
  {
    id: 14, name: 'Greek Yogurt', category: 'dairy', price: 90, originalPrice: 120, rating: 4.8, reviews: 134, emoji: '🍦', image: '/img/product_yogurt.png', unit: '500g tub', inStock: true, featured: false, badge: 'Sale',
    description: 'Thick and creamy Greek yogurt, high in protein. Natural with no added sugar.'
  },
  {
    id: 15, name: 'Cheddar Cheese', category: 'dairy', price: 150, originalPrice: null, rating: 4.7, reviews: 98, emoji: '🧀', image: '/img/product_cheese.png', unit: '400g block', inStock: true, featured: false, badge: null,
    description: 'Mature cheddar cheese with a rich, sharp flavor.'
  },
  {
    id: 16, name: 'Free-Range Eggs', category: 'dairy', price: 80, originalPrice: null, rating: 4.9, reviews: 245, emoji: '🥚', image: '/img/product_eggs.png', unit: '12 pack', inStock: true, featured: true, badge: 'Popular',
    description: 'Large free-range eggs from happy hens. Rich golden yolks.'
  },
  {
    id: 17, name: 'Salted Butter', category: 'dairy', price: 50, originalPrice: null, rating: 4.5, reviews: 76, emoji: '🧈', image: '/img/product_butter.png', unit: '250g pack', inStock: true, featured: false, badge: null,
    description: 'Creamy salted butter made from fresh cream. Perfect for spreading and baking.'
  },
  {
    id: 18, name: 'Heavy Cream', category: 'dairy', price: 70, originalPrice: null, rating: 4.4, reviews: 52, emoji: '🫙', image: '/img/product_milk.png', unit: '300ml', inStock: false, featured: false, badge: null,
    description: 'Rich heavy whipping cream for desserts, sauces, and coffee.'
  },

  // Bakery
  {
    id: 19, name: 'Sourdough Bread', category: 'bakery', price: 70, originalPrice: null, rating: 4.8, reviews: 189, emoji: '🍞', image: '/img/product_sourdough.png', unit: '800g loaf', inStock: true, featured: true, badge: 'Artisan',
    description: 'Authentic sourdough with a chewy crust and tangy crumb, baked fresh daily.'
  },
  {
    id: 20, name: 'Blueberry Muffins', category: 'bakery', price: 90, originalPrice: 6.49, rating: 4.7, reviews: 113, emoji: '🫐', image: '/img/product_sourdough.png', unit: '4 pack', inStock: true, featured: false, badge: 'Sale',
    description: 'Moist and fluffy muffins bursting with juicy blueberries. Freshly baked today.'
  },
  {
    id: 21, name: 'Butter Croissants', category: 'bakery', price: 80, originalPrice: null, rating: 4.9, reviews: 221, emoji: '🥐', image: '/img/product_croissants.png', unit: '4 pack', inStock: true, featured: true, badge: 'Popular',
    description: 'Flaky, buttery croissants made with French-style laminated dough.'
  },
  {
    id: 22, name: 'Chocolate Cake Slice', category: 'bakery', price: 60, originalPrice: null, rating: 4.6, reviews: 87, emoji: '🍫', image: '/img/product_croissants.png', unit: 'per slice', inStock: true, featured: false, badge: null,
    description: 'Decadent dark chocolate layer cake with ganache frosting.'
  },

  // Beverages
  {
    id: 23, name: 'Orange Juice', category: 'beverages', price: 60, originalPrice: null, rating: 4.6, reviews: 144, emoji: '🍊', image: '/img/product_oranges.png', unit: '1L carton', inStock: true, featured: true, badge: null,
    description: 'Freshly squeezed orange juice with no added sugar or preservatives.'
  },
  {
    id: 24, name: 'Sparkling Water', category: 'beverages', price: 40, originalPrice: null, rating: 4.3, reviews: 67, emoji: '💧', image: '/img/product_milk.png', unit: '1.5L bottle', inStock: true, featured: false, badge: null,
    description: 'Crisp natural sparkling mineral water. Refreshing with zero calories.'
  },
  {
    id: 25, name: 'Green Tea Pack', category: 'beverages', price: 50, originalPrice: 60, rating: 4.7, reviews: 102, emoji: '🫖', image: '/img/product_spinach.png', unit: '25 bags', inStock: true, featured: false, badge: 'Sale',
    description: 'Premium Japanese green tea with a clean, grassy flavor and calming aroma.'
  },
  {
    id: 26, name: 'Cold Brew Coffee', category: 'beverages', price: 90, originalPrice: null, rating: 4.8, reviews: 176, emoji: '☕', image: '/img/product_yogurt.png', unit: '500ml bottle', inStock: true, featured: false, badge: 'New',
    description: 'Smooth, low-acid cold brew coffee concentrate. Rich and intensely flavored.'
  },

  // Snacks
  {
    id: 27, name: 'Mixed Nuts', category: 'snacks', price: 100, originalPrice: 120, rating: 4.8, reviews: 201, emoji: '🥜', image: '/img/product_butter.png', unit: '500g pack', inStock: true, featured: true, badge: 'Sale',
    description: 'Premium roasted mix of cashews, almonds, and walnuts. Lightly salted.'
  },
  {
    id: 28, name: 'Dark Chocolate Bar', category: 'snacks', price: 50, originalPrice: null, rating: 4.6, reviews: 158, emoji: '🍫', image: '/img/product_cheese.png', unit: '100g bar', inStock: true, featured: false, badge: null,
    description: '72% dark chocolate with smooth texture and complex flavor notes.'
  },
  {
    id: 29, name: 'Organic Granola', category: 'snacks', price: 80, originalPrice: null, rating: 4.5, reviews: 89, emoji: '🌾', image: '/img/product_sourdough.png', unit: '400g bag', inStock: true, featured: false, badge: 'Organic',
    description: 'Crunchy oat granola with honey, seeds, and dried cranberries.'
  },
  {
    id: 30, name: 'Popcorn – Sea Salt', category: 'snacks', price: 40, originalPrice: null, rating: 4.2, reviews: 63, emoji: '🍿', image: '/img/product_grapes.png', unit: '90g bag', inStock: true, featured: false, badge: null,
    description: 'Light and airy popcorn lightly seasoned with sea salt.'
  },
];
