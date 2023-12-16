const { PaymentTag } = require('../models');
const express = require('express');
const mongoose = require('mongoose');

const init = (app) => {
  app.delete('/api/payment-tags/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const PaymentTagModel = mongoose.model('PaymentTag', PaymentTag);
      await PaymentTagModel.findByIdAndDelete({ id });
    
      res.send(JSON.stringify({ message: `Successfully removed payment tag ${id}` }));
    } catch (err) {
      res.status(500).send(JSON.stringify({ message: 'Sorry, failed to remove payment tag' }));
    }
  });
  
  app.post('/api/payment-tags', express.json(), async (req, res) => {
    try {
      const { paymentTags } = req.body;
      const PaymentTagModel = mongoose.model('PaymentTag', PaymentTag);
      await PaymentTagModel.create(paymentTags);
    
      res.send(JSON.stringify({
        message: 'Payment tags saved successfully'
      }));
    } catch (err) {
      res.status(500).send(JSON.stringify({ message: 'Sorry, failed to save payment tags' }));
    }
  });
  
  app.get('/api/payment-tags', async (_, res) => {
    try {
      const PaymentTagModel = mongoose.model('PaymentTag', PaymentTag);
      const paymentTags = await PaymentTagModel.find({});
    
      res.send(JSON.stringify({ paymentTags }));
    } catch (err) {
      res.status(500).send(JSON.stringify({ 
        message: 'Sorry, failed to fetch payment tags' 
      }));
    }
  });
}

module.exports = { init };