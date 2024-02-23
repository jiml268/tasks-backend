const router = require("express").Router();
const { getHeader } = require("../controllers");
const { createTitle } = require("../controllers");
const { createTask } = require("../controllers");
const { getTasks } = require("../controllers");
const { editTask } = require("../controllers");
const { deleteTask } = require("../controllers");

const { editHeader } = require("../controllers");

router;
router.route("/getTasks").get(getTasks);
router.route("/createTask").post(createTask);
router.route("/editTask").post(editTask);
router.route("/deleteTask").post(deleteTask);
router.route("/getHeader").post(getHeader);
router.route("/createTitle").post(createTitle);
router.route("/editHeader").post(editHeader);

module.exports = router;
