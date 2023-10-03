const request = require('supertest');
const express = require('express');
const app = express();

// Import your routes and other necessary dependencies here
const authRoutes = require('./app/routes/auth.routes.js');
const cartRoutes = require('./app/routes/cart.routes.js');
const imagesRoutes = require('./app/routes/images.routes.js');
const ordersRoutes = require('./app/routes/orders.routes.js');
const productRoutes = require('./app/routes/products.routes.js');
const productReviewRoutes = require('./app/routes/product-review.routes.js');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// You may need to adjust the CORS options based on your needs
app.use(cors());

// Mock pool.connect function
jest.mock('./app/config/db.config.js', () => ({
  connect: jest.fn(),
}));

// Mock console.log and console.error to suppress output during tests
global.console.log = jest.fn();
global.console.error = jest.fn();

// Attach your routes
authRoutes(app);
cartRoutes(app);
imagesRoutes(app);
ordersRoutes(app);
productRoutes(app);
productReviewRoutes(app);

// Your server start and route definitions
const port = 3000;

beforeAll(() => {
  // Start your Express app here
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      resolve(server);
    });
  });
});

afterAll((done) => {
  // Close the server after tests
  app.close(() => {
    done();
  });
});

// Your actual test cases go here
describe('GET /', () => {
  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to Blog API by lucaszebre.');
  });
});

// Add more test cases for your routes and app behavior here
