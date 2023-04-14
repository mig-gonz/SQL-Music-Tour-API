// DEPENDENCIES
const bands = require("express").Router();
const db = require("../models");
const { Band } = db;
const { Op } = require("sequelize");

// INDEX
bands.get("/", async (req, res) => {
  try {
    const foundBands = await Band.findAll({
      order: [["available_start_time", "ASC"]],
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(foundBands);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// SHOW
bands.get("/:id", async (req, res) => {
  try {
    const foundBand = await Band.findOne({
      where: { band_id: req.params.id },
    });
    res.status(200).json(foundBand);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE
bands.post("/", async (req, res) => {
  try {
    const newBand = await Band.create(req.body);
    res.status(201).json({ message: "Band created", data: newBand });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE
bands.put("/:id", async (req, res) => {
  try {
    const updatedBands = await bands.update(req.body, {
      where: { band_id: req.params.id },
    });
    res.status(200).json({ message: `${bandsUpdated} bands updated` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE A BAND
bands.delete("/:id", async (req, res) => {
  try {
    const deletedBands = await Band.destroy({
      where: {
        band_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedBands} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT
module.exports = bands;
