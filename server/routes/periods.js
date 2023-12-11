const { Period } = require('../models');
const express = require('express');
const mongoose = require('mongoose');

const init = (app) => {
  app.delete("/api/periods/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const PeriodModel = mongoose.model("Period", Period);
      await PeriodModel.findByIdAndDelete(id);
    
      res.send(JSON.stringify({ message: `Successfully removed period ${id}` }));
    } catch (err) {
      res.status(500).send(JSON.stringify({ message: "Sorry, failed to remove period" }));
    }
  });
  
  app.post("/api/periods", express.json(), async (req, res) => {
    try {
      const { periods } = req.body;
      const PeriodModel = mongoose.model("Period", Period);
      await PeriodModel.create(periods)
    
      res.send(JSON.stringify({
        message: "Periods saved successfully"
      }));
    } catch (err) {
      res.status(500).send(JSON.stringify({ message: "Sorry, failed to save periods" }));
    }
  });
  
  app.get("/api/periods", async (_, res) => {
    try {
      const PeriodModel = mongoose.model("Period", Period);
      const periods = await PeriodModel.find({});
    
      res.send(JSON.stringify({ periods }));
    } catch (err) {
      res.status(500).send(JSON.stringify({ message: "Sorry, failed to fetch periods" }));
    }
  });
}

module.exports = { init };