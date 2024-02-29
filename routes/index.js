const router = require("express").Router();
const { getHeader, editHeader, } = require("../controllers");
const {  getTasks,editTask, deleteTask, createTask } = require("../controllers");

router;
router.route("/getHeader").post(getHeader);
router.route("/editHeader").post(editHeader);
router.route("/getTasks").post(getTasks);
router.route("/editTask").post(editTask);
router.route("/deleteTask").post(deleteTask);
router.route("/createTask").post(createTask);

module.exports = router;
