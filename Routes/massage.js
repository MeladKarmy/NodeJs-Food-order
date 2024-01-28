const express = require("express");
const router = express.Router();
const Massage = require("../Controllers/massages");

router.route("/").get(Massage.getAllMassage).post(Massage.createMassage);
router
  .route("/:id")
  .get(Massage.getMassage)
  .post(Massage.updateMassage)
  .delete(Massage.deleteMassage);

module.exports = router;
