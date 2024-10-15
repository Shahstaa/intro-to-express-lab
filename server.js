
const express = require('express');
const app = express();
const port = 3000;

// Data Arrays
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// 1. Greet the User
app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}!`);
});

// 2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
  const number = req.params.number;

  if (isNaN(number)) {
    return res.send("You must specify a number.");
  }

  const roll = Math.floor(Math.random() * (parseInt(number) + 1));
  res.send(`You rolled a ${roll}.`);
});

// 3. I Want THAT One!
app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index);

  if (index < 0 || index >= collectibles.length) {
    return res.send("This item is not yet in stock. Check back soon!");
  }

  const item = collectibles[index];
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

// 4. Filter Shoes by Query Parameters
app.get('/shoes', (req, res) => {
  let filteredShoes = shoes;

  const { minPrice, maxPrice, type } = req.query;

  if (minPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
  }

  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.send(filteredShoes.length > 0 ? filteredShoes : "No shoes found matching your criteria.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


