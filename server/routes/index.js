const { init: initPaymentTagsRoutes } = require('./payment-tags');
const { init: initPeriods } = require('./periods');

const init = (app) => {
  initPaymentTagsRoutes(app);
  initPeriods(app);
}

module.exports = {
  init
}