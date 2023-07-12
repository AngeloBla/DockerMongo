const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('mydatabase');
    const collection = database.collection('countries');
    const data = await collection.find().toArray();
    res.render('index', { data });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
