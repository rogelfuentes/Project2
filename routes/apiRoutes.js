var db = require("../models");

module.exports = function(app) {
  // Get all devices
  app.get("/api/devices", function(req, res) {
    db.Device.findAll({}).then(function(dbDevices) {
      res.json(dbDevices);
    });
  });

  // Create a new device
  app.post("/api/devices", function(req, res) {
    db.Device.create(req.body).then(function(dbDevice) {
      res.json(dbDevice);
    });
  });

  //  // Update a device
  //  app.post("/api/devices/:id", function(req, res) {
  //   db.Device.update({where: { id: req.params.id }}).then(function(dbDevice) {
  //     res.json(dbDevice);
  //   });
  // });

  // Delete an device by id
  app.delete("/api/devices/:id", function(req, res) {
    db.Device.destroy({ where: { id: req.params.id } }).then(function(dbDevice) {
      res.json(dbDevice);
    });
  });
};
