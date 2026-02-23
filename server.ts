import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('restaurant.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT,
    category TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user'
  );
`);

// Seed initial data if empty or missing items
const initialProducts = [
  ['ต้มยำกุ้งแม่น้ำ', 'A vibrant, aromatic masterpiece featuring succulent river prawns in a spicy, zesty broth infused with lemongrass, kaffir lime, and galangal.', 350, 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800&q=80', 'Main'],
  ['พิซซ่าหน้ากุ้ง', 'Artisanal thin-crust pizza topped with plump, juicy prawns, melted premium mozzarella, and a hint of garlic-infused olive oil.', 290, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', 'Main'],
  ['แกงเขียวหวานไก่', 'Velvety coconut curry with tender chicken breast, aromatic Thai basil, and crisp eggplants, offering a perfect balance of sweet and spicy.', 220, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80', 'Main'],
  ['พิซซ่ามาเกริต้า', 'The timeless classic: sun-ripened tomato sauce, creamy fresh mozzarella pearls, and fragrant basil leaves on a charred, hand-stretched crust.', 250, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80', 'Main'],
  ['พิซซ่าฮาวายเอี้ยน', 'A sweet and savory harmony of honey-glazed ham, caramelized pineapple chunks, and a rich blend of melted cheeses.', 280, 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80', 'Main'],
  ['คุกกี้ช็อกโกแลตชิพ', 'Warm, buttery cookies with a soft center and crisp edges, loaded with melting pockets of 70% dark Belgian chocolate.', 45, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80', 'Dessert'],
  ['น้ำแตงโมปั่น', 'Pure, sun-drenched watermelon blended to icy perfection—a hydrating burst of natural sweetness for ultimate refreshment.', 65, 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80', 'Drink'],
  ['น้ำมะพร้าวสด', 'Nature’s purest hydration: chilled, sweet water from young organic coconuts, served straight from the shell for a tropical escape.', 75, 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=800&q=80', 'Drink'],
  ['กาแฟไทยโบราณ', 'Bold, dark-roasted Thai beans slow-dripped and swirled with velvety sweet condensed milk, served over crushed ice for a nostalgic kick.', 60, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80', 'Drink'],
  ['ปอเปี๊ยะทอด', 'Golden, shatteringly crisp pastry rolls filled with a savory medley of glass noodles and garden vegetables, served with our signature sweet chili dip.', 120, 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', 'Appetizer'],
  ['ไก่สะเต๊ะ', 'Tender, turmeric-marinated chicken skewers flame-grilled to perfection, served with a rich, velvety peanut satay sauce and tangy cucumber relish.', 150, 'https://images.unsplash.com/photo-1529566652340-2c41a1eb6d93?auto=format&fit=crop&w=800&q=80', 'Appetizer'],
  ['ทอดมันกุ้ง', 'Hand-minced, succulent shrimp patties breaded in golden panko and fried until crisp, offering a juicy, flavorful bite with sweet plum dipping sauce.', 180, 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', 'Appetizer'],
  ['ชามะนาว', 'Premium Thai black tea leaves brewed to perfection and brightened with a zesty squeeze of fresh lime for a crisp, energizing finish.', 65, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80', 'Drink'],
  ['อัญชันมะนาว', 'A mesmerizing purple infusion of butterfly pea flowers and zesty lime, creating a naturally sweet, floral, and citrusy botanical delight.', 70, 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80', 'Drink'],
  ['นมเย็น', 'A nostalgic Thai favorite: creamy, chilled milk swirled with fragrant red sala syrup for a sweet, floral, and beautifully pink treat.', 60, 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&w=800&q=80', 'Drink']
];

const insert = db.prepare('INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)');
const update = db.prepare('UPDATE products SET description = ?, price = ?, image = ?, category = ? WHERE name = ?');
const check = db.prepare('SELECT id FROM products WHERE name = ?');

initialProducts.forEach(p => {
  const exists = check.get(p[0]);
  if (!exists) {
    insert.run(...p);
  } else {
    // Update existing items with new enticing descriptions
    update.run(p[1], p[2], p[3], p[4], p[0]);
  }
});

// Fix existing broken URLs (redundant now but keeping for safety)
db.prepare("UPDATE products SET image = 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80' WHERE name = 'ทอดมันกุ้ง'").run();
db.prepare("UPDATE products SET image = 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80' WHERE name = 'น้ำแตงโมปั่น'").run();
db.prepare("UPDATE products SET image = 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80' WHERE name = 'กาแฟไทยโบราณ'").run();

// Seed admin user if not exists
const adminCount = db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('admin') as { count: number };
if (adminCount.count === 0) {
  db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('admin', 'admin123', 'admin');
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Auth Routes
  app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    try {
      const info = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, password);
      res.json({ success: true, userId: info.lastInsertRowid });
    } catch (error) {
      res.status(400).json({ error: 'Username already exists' });
    }
  });

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password) as any;
    if (user) {
      res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  // API Routes
  app.get('/api/products', (req, res) => {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  });

  app.post('/api/products', (req, res) => {
    const { name, description, price, image, category } = req.body;
    const info = db.prepare('INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)').run(name, description, price, image, category);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete('/api/products/:id', (req, res) => {
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
