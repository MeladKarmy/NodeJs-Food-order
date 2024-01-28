const express = require("express");
const router = express.Router();
const pizza = require("../Controllers/pizza");

router.route("/").get(pizza.getAllPizza).post(pizza.createPizza);
router
  .route("/:id")
  .get(pizza.getPizza)
  .post(pizza.updatePizza)
  .delete(pizza.deletePizza);

module.exports = router;
