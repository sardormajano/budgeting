const { init: initPaymentTagsRoutes } = require('./payment-tags');
const { init: initPeriods } = require('./periods');
const { init: initPayments } = require('./payments');

const init = (app) => {
  initPaymentTagsRoutes(app);
  initPeriods(app);
  initPayments(app);
}

module.exports = {
  init
}