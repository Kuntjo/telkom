const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
const products = [];

//CREATE
app.post('/products', (req, res) => {
  const {id, name, description, price, variety, rating, stock}= req.body;
  if (!id || !name || !price || !description || !variety || !rating || ! stock) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const product = {id, name, description, price, variety, rating, stock};
  products.push(product);

  res.status(201).json(product);
});

//READ ALL
app.get('/products', (req, res) => {
  res.json(products);
});

//READ by Id
app.get('/products/:id', (req, res)=>{
  const id = req.params.id;
  const product = products.find((p) =>p.id === id);

  if (!product){
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

//UPDATE by Id
app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const {name, description, price, variety, rating, stock} = req.body;
  const productIdx = products.findIndex((p) => p.id === id);

  if (productIdx === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (name) {
    products[productIdx].name = name;
  }

  if (description) {
    products[productIdx].description = description;
  }

  if (price) {
    products[productIdx].price = price;
  }
  
  if (variety) {
    products[productIdx].variety = variety;
  }

  if (rating) {
    products[productIdx].rating = rating;
  }

  if (stock) {
    products[productIdx].stock = stock;
  }

  res.json(products[productIdx]);
});

//DELETE by Id
app.delete('/products/:id', (req,res)=>{
  const id=req.params.id;
  const productIdx = products.findIndex((p) => p.id === id);

  if (productIdx === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deleted = products.splice(productIdx, 1)[0];
  res.json(deleted);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Link is here http://localhost:${PORT}`);
});
