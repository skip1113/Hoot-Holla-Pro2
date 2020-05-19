var db = require("../models");

module.exports = function(app) {
  // Get all hoots
  app.get("/api/Hoots", function(req, res) {
    console.log("Hit API hoots get");
    db.Hoot.findAll({}).then(function(dbhoots) {
      res.json(dbhoots);
    });
  });

  // Create a new Hoot
  app.post("/api/Hoots", function(req, res) {
    console.log("Hit hoots Post");
    db.Hoot.create(req.body).then(function(dbHoot) {
      res.json(dbHoot);
    });
  });

  // Delete an Hoot by id
  app.delete("/api/Hoots/:id", function(req, res) {
    console.log("Hit Hoots delete");
    db.Hoot.destroy({ where: { id: req.params.id } }).then(function(dbHoot) {
      res.json(dbHoot);
    });
  });
};
