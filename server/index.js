require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const Promise = require('bluebird');
const controllers = require('./controllers.js');
const reviewRouter = require('./routes/reviews.js');
const helpers = require('./helpers.js');

const {
  getReviews, getStyles, getRelated, getDetails} = controllers;
const { averageRating, promiseAllRelated, filterRelated, promiseAllDetails, filterDetails } = helpers;
let {getReviews, getStyles, getRelated, getDetails} = controllers;

// Overview Router
const overviewRouter = require('./overviewRouter.js');

// Setup Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// Creates base url for API
axios.defaults.baseURL = process.env.BASE_URL;

// Adds API key to all requests
axios.defaults.headers.common.Authorization = process.env.API_KEY;

// Setup Routes
app.use('/reviews', reviewRouter); // directs all requests to endpoint 'reviews' to reviews router
// set up overview router
app.use('/overview', overviewRouter);

// Get related items
app.get('/related', (req, res) => {
  const product_id = req.query.id;
  getRelated(product_id).then(({ data }) => promiseAllRelated(data)).then((data) => {
    resObj = filterRelated(data);
    res.status(201).send(resObj);
  }).catch((err) => {
    console.log(err);
    res.status(404).send(err);
  });
});

app.get('/details', (req, res) => {
  const product_id = req.query.id;
  getDetails(product_id).then(({data}) => {
    res.status(201).send(data);
  }).catch((err) => {
    console.log(err);
    res.status(404).send(err);
  });
});

// Get review rating
app.get('/reviews', (req, res) => {
  const product_id = req.query.id;
  getReviews(product_id);
});

// Get styles for url
app.get('/styles', (req, res) => {
  const product_id = req.query.id;
  promiseAllRelated([product_id]).then((data) => {
    resObj = filterRelated(data);
    res.status(201).send(resObj);
  }).catch((err) => {
    res.status(404).send(err);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
