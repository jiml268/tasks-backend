const router = require("express").Router();
const { getHeader } = require("../controllers");
const { createTitle } = require("../controllers");
const { createTask } = require("../controllers");
const { getTasks } = require("../controllers");
const { editTask } = require("../controllers");
const { deleteTask } = require("../controllers");
const { getSingleTask } = require("../controllers");

const { editHeader } = require("../controllers");

router;
router.route("/getHeader").get(getHeader);
router.route("/getHeader/:id").get(getHeader);
router.route("/createTitle").post(createTitle);
router.route("/createTask").post(createTask);
router.route("/getTasks").get(getTasks);
router.route("/getTasks/:id").get(getTasks);
router.route("/editTask").post(editTask);
router.route("/deleteTask").post(deleteTask);
router.route("/editHeader").post(editHeader);
router.route("/getSingleTask").post(getSingleTask);

module.exports = router;
