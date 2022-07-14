const axios = require('axios');
//const reviewControls = require('./reviewsControllers.js');
// Get review rating
exports.getReviews = function(product_id) {
  return axios.get('/reviews/meta', {params: {product_id: product_id}}).catch((err) => {
    console.log('error in reviews/meta');
  });
};

exports.getStyles = function(product_id) {
  const url = '/products/' + product_id + '/styles';
  return axios.get(url).catch((err) => {
    console.log('error in get styles');
  });
};

exports.getRelated = function(product_id) {
  const url = '/products/' + product_id + '/related';
  return axios.get(url).catch((err) => {
    console.log('error in get related');
  });
};

exports.getDetails = function(product_id) {
  const url = '/products/' + product_id;
  return axios.get(url).catch((err) => {
    console.log('error in get details');
  });
};

