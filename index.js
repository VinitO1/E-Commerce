import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import session from 'express-session';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const envPort = process.env.PORT || 5000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/Earrings', (req, res) => {
  res.render('earring', { earrings: earrings });
});
app.get('/Rings', (req, res) => {
  res.render('ring', { rings: rings });
});

app.get('/Necklaces', (req, res) => {
  res.render('necklace', { necklace: necklace });
});

app.get('/signup', (req, res) => {
  res.render('sign-up');
});

app.get('/login', (req, res) => {
  res.render('login')
});
app.post('/add-to-cart', (req, res) => {
  const { id, title, price, image } = req.body; // Keep the destructuring generic
  const cart = req.session.cart || [];
  const existingItemIndex = cart.findIndex((item) => item.id === id);

  if (existingItemIndex > -1) {
    // Item exists in cart, increase quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new item to cart
    cart.push({ id, title, price, image, quantity: 1 });
  }
  req.session.cart = cart;
  res.json({ message: 'Item added to cart', cart });
});
// Route to display cart
app.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart });
});


function findProductByTypeAndId(type, id) {
  let dataSource;
  switch (type) {
    case 'earrings':
      dataSource = earrings;
      break;
    case 'rings':
      dataSource = rings;
      break;
    case 'necklace':
      dataSource = necklace;
      break;
    default:
      return null;
  }
  // Assuming id is a string, ensure strict equality if necessary or convert types accordingly
  return dataSource.find(product => product.id.toString() === id.toString());
}


app.get('/product-detail/:type/:id', (req, res) => {
  const { type, id } = req.params;
  let product;

  // Assuming you have a function to find a product by type and ID
  product = findProductByTypeAndId(type, id);

  if (!product) {
    return res.status(404).send('Product not found');
  }


  // Render a generic product detail page, passing the product details
  res.render('productDetail', { product });
});

app.get('/checkout', (req, res) => {
  // Assuming `cart`, `subTotal`, and `tax` are calculated or retrieved earlier
  const cart = req.session.cart || []; // Example: retrieving cart from session
  const subTotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subTotal * 0.12;

  res.render('checkout', { cart, subTotal, tax });
});
const necklace = [
  {
    id: 1,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace1.jpg',
  },

  {
    id: 2,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace2.jpg',
  },
  {
    id: 3,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace3.jpg',
  },
  {
    id: 4,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace4.jpg',
  },
  {
    id: 5,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace5.jpg',
  },
  {
    id: 6,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace6.jpg',
  },
  {
    id: 7,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace7.jpg',
  },
  {
    id: 8,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace8.jpg',
  },
  {
    id: 9,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace9.jpg',
  },
  {
    id: 10,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace10.jpg',
  },
  {
    id: 11,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace11.jpg',
  },
  {
    id: 12,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Necklace/Necklace12.jpg',
  },
]

const rings = [
  {
    id: 1,
    title: 'Twist Rose Gold Earrings',
    price: 99.99,
    image: '/images/Rings/Ring1.jpg',
  },
  {
    id: 2,
    title: 'Open Circle ring',
    price: 119.99,
    image: '/images/Rings/Ring2.jpg',
  },
  {
    id: 3,
    title: 'Tri Tone Rolling Ring',
    price: 229.99,
    image: '/images/Rings/Ring3.jpg',
  },
  {
    id: 4,
    title: 'Wave Style Ring',
    price: 199.99,
    image: '/images/Rings/Ring4.jpg',
  },
  {
    id: 5,
    title: 'Emerald Cut Ring',
    price: 269.99,
    image: '/images/Rings/Ring5.jpg',
  },
  {
    id: 6,
    title: 'Pink Sapphire Ring',
    price: 399.99,
    image: '/images/Rings/Ring6.jpg',
  },
  {
    id: 7,
    title: 'Diamond Cluster Ring',
    price: 199.99,
    image: '/images/Rings/Ring7.jpg',
  },
  {
    id: 8,
    title: 'Blue Ruby Silver Diamond Ring',
    price: 149.99,
    image: '/images/Rings/Ring8.jpg',
  },
  {
    id: 9,
    title: 'Wide Torc Ring',
    price: 349.99,
    image: '/images/Rings/Ring9.jpg',
  },
  {
    id: 10,
    title: 'Wave Delicate Ring',
    price: 149.99,
    image: '/images/Rings/Ring10.jpg',
  },
  {
    id: 11,
    title: 'Vintage Ring',
    price: 199.99,
    image: '/images/Rings/Ring11.jpg',
  },
  {
    id: 12,
    title: 'Pave Sapphire Dimond Band',
    price: 499.99,
    image: '/images/Rings/Ring12.jpg',
  },
];
const earrings = [
  {
    id: 1,
    title: 'RoseGold Earrings',
    price: 39.99,
    image: '/images/Earrings/Earring1.jpg',
  },
  {
    id: 2,
    title: 'Gold Hoops',
    price: 129.99,
    image: '/images/Earrings/Earring2.jpg',
  },
  {
    id: 3,
    title: 'Gold Droplet Hoops',
    price: 89.99,
    image: '/images/Earrings/Earring3.jpg',
  },
  {
    id: 4,
    title: 'Pearl Earrings',
    price: 149.99,
    image: '/images/Earrings/Earring4.jpg',
  },
  {
    id: 5,
    title: 'Labradorite Heart Shaped Earring',
    price: 89.99,
    image: '/images/Earrings/Earring5.jpg',
  },
  {
    id: 6,
    title: 'Ribbed Chunky Hoop Earring',
    price: 49.99,
    image: '/images/Earrings/Earring6.jpg',
  },
  {
    id: 7,
    title: 'Single Hoop Double Chain Earring',
    price: 119.99,
    image: '/images/Earrings/Earring7.jpg',
  },
  {
    id: 8,
    title: 'Square Sparkle Hoop Earring',
    price: 119.99,
    image: '/images/Earrings/Earring8.jpg',
  },
  {
    id: 9,
    title: 'Circle Stud Earring',
    price: 79.99,
    image: '/images/Earrings/Earring9.jpg',
  },
  {
    id: 10,
    title: 'Rose Earring - Gold',
    price: 99.99,
    image: '/images/Earrings/Earring10.jpg',
  },
  {
    id: 11,
    title: 'Crystal Stud Earring',
    price: 139.99,
    image: '/images/Earrings/Earring11.jpg',
  },
  {
    id: 12,
    title: 'Feather Hoop Earring',
    price: 129.99,
    image: '/images/Earrings/Earring12.jpg',
  },
];

app.listen(envPort, () => {
  console.log(`Server is running on port ${envPort}`);
});
