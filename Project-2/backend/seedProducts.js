const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected – seeding products...');

    const products = [
      {
        name: "Nike Air Max 270",
        price: 12999,
        image: "https://m.media-amazon.com/images/I/71V8F4Z1QPL._AC_UY900_.jpg",
        category: "Footwear",
        description: "Comfortable running shoes with air cushioning",
        stock: 20
      },
      {
        name: "Samsung Galaxy S24",
        price: 79999,
        image: "https://m.media-amazon.com/images/I/71Qh8FJGvPL._AC_UY900_.jpg",
        category: "Electronics",
        description: "Latest flagship smartphone with AI features",
        stock: 15
      },
      {
        name: "MacBook Air M2",
        price: 99900,
        image: "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_UY900_.jpg",
        category: "Laptops",
        description: "Ultra-thin laptop with M2 chip",
        stock: 8
      },
      {
        name: "Sony WH-1000XM5 Headphones",
        price: 34999,
        image: "https://m.media-amazon.com/images/I/61UYn7z6viL._AC_UY900_.jpg",
        category: "Electronics",
        description: "Premium noise-cancelling wireless headphones",
        stock: 12
      },
      {
        name: "Adidas Ultraboost",
        price: 15999,
        image: "https://m.media-amazon.com/images/I/81o8T8l9dQL._AC_UY900_.jpg",
        category: "Footwear",
        description: "High-performance running shoes",
        stock: 18
      },
      {
        name: "Levi's 501 Jeans",
        price: 3999,
        image: "https://m.media-amazon.com/images/I/81e5gMlC1gL._AC_UY900_.jpg",
        category: "Clothing",
        description: "Classic straight fit denim jeans",
        stock: 30
      },
      {
        name: "Apple Watch Series 9",
        price: 41900,
        image: "https://m.media-amazon.com/images/I/71YbQ6R3qZL._AC_UY900_.jpg",
        category: "Wearables",
        description: "Advanced health and fitness tracking",
        stock: 10
      },
      {
        name: "Dell XPS 13",
        price: 119999,
        image: "https://m.media-amazon.com/images/I/71gYqJDj2cL._AC_UY900_.jpg",
        category: "Laptops",
        description: "Premium ultrabook with infinity display",
        stock: 5
      },
      {
        name: "Puma RS-X",
        price: 8999,
        image: "https://m.media-amazon.com/images/I/81f0UyB1pPL._AC_UY900_.jpg",
        category: "Footwear",
        description: "Bold chunky sneakers",
        stock: 25
      },
      {
        name: "OnePlus 12",
        price: 69999,
        image: "https://m.media-amazon.com/images/I/71VA7i9hMFL._AC_UY900_.jpg",
        category: "Electronics",
        description: "Flagship killer smartphone",
        stock: 20
      }
    ];

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('10 sample products seeded!');
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
