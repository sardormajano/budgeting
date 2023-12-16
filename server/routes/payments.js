const mongoose = require('mongoose');
const { Payment } = require('../models');
const express = require('express');

const init = (app) => {
  app.delete('/api/payments/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const PaymentModel = mongoose.model('Payment', Payment);
      await PaymentModel.findByIdAndDelete(id);

      res.send(JSON.stringify({ message: `Successfully removed payment ${id}`}))
    } catch (err) {
      res.status(500).send(JSON.stringify({ message: 'Sorry, failed to delete payment'}))
    }
  });

  app.post('/api/payments', express.json(), async (req, res) => {
    try {
      const { payments } = req.body;
      const PaymentModel = mongoose.model('Payment', Payment);
      await PaymentModel.create(payments);

      res.send(JSON.stringify({
        message: 'Payment saved successfully'
      }));
    } catch (err) {
      res.status(500).send(JSON.stringify({
        message: 'Sorry, failed to save payment'
      }))
    }
  });

  app.get('/api/payments', async(_, res) => {
    try {
      const PaymentModel = mongoose.model('Payment', Payment);
      const payments = await PaymentModel.find({});
  
      res.send(JSON.stringify({ payments }));
    } catch(err) {
      res.status(500).send(JSON.stringify({
        message: 'Sorry, failed to fetch payment tags'
      }));
    }
  })
}

module.exports = { init };