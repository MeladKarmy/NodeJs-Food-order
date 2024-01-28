const express = require("express");
const router = express.Router();
const catagory = require("../Controllers/category");

router.route("/").get(catagory.getAllCategory).post(catagory.createCategory);
router
  .route("/:id")
  .get(catagory.getCategory)
  .post(catagory.updateCategory)
  .delete(catagory.deleteCategory);

module.exports = router;
