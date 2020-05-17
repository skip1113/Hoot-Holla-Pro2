var db = require("../models");

module.exports = function(app) {
  // Get all hoots
  app.get("/api/hoots", function(req, res) {
    db.Hoot.findAll({}).then(function(dbhoots) {
      res.json(dbhoots);
    });
  });

  // Create a new Hoot
  app.post("/api/hoots", function(req, res) {
    db.Hoot.create(req.body).then(function(dbHoot) {
      res.json(dbHoot);
    });
  });

  // Delete an Hoot by id
  app.delete("/api/hoots/:id", function(req, res) {
    db.Hoot.destroy({ where: { id: req.params.id } }).then(function(dbHoot) {
      res.json(dbHoot);
    });
  });
};
