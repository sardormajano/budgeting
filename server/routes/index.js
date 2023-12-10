const { init: initPaymentTagsRoutes } = require('./payment-tags');

const init = (app) => {
  initPaymentTagsRoutes(app);
}

module.exports = {
  init
}