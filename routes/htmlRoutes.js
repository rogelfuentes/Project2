var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Device.findAll({}).then(function(dbDevices) {
      res.render("index", {
        msg: "Create a device here",
        devices: dbDevices
      });
    });
  });

  app.get("/device/list", function(req, res) {
    db.Device.findAll({}).then(function(dbDevices) {
      res.render("devicelist", {
        devices: dbDevices
      });
    });
  });

  app.get("/device/create", function(req, res) {
    db.Device.findAll({}).then(function(dbDevices) {
      res.render("create", {
        msg: "Create a New Device",
        devices: dbDevices
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/device/device/:id", function(req, res) {
    db.Device.findOne({ where: { id: req.params.id } }).then(function(dbDevice) {
      res.render("device", {
        device: dbDevice
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
