const router = require("express").Router();
const { getHeader, editHeader, } = require("../controllers");
const {  getTasks } = require("../controllers");

router;
router.route("/getHeader").post(getHeader);
router.route("/editHeader").post(editHeader);
router.route("/getTasks").post(getTasks);

module.exports = router;
