const taskHeader = require("../models/taskHeader");
const tasksDetails = require("../models/tasksDetails");

const taskBoardController = {

 async getHeader(req, res) {
    try {
      const { user_id } = req.body;

      const myCount = await taskHeader.countDocuments({user_id: user_id}); 
      if (myCount > 0) {
        const data = await taskHeader.findOne({ user_id: user_id });
          res.status(200).json({
            code: 200,
            message: "Header Received",
            data: data,
          });
        }
      else {
 const createTitle = {
        user_id,
        boardName: `New Task Board for user ${user_id}`,
        boardDescription: `This is a new task board for user ${user_id}`,
      };
      const newTitle = await taskHeader.create(createTitle);
        const data = await taskHeader.findOne({ user_id: user_id });
          res.status(200).json({
            code: 200,
            message: "Header Received",
            data: data,
          });
        }
    } catch (err) {
      res.status(400).json({
        code: 400,
        Massage: `An Error has occurred`,
        error: err,
      });
    }
  },

async editHeader(req, res) {
    try {
      const { task_id, boardName, boardDescription } = req.body;
      const filter = { _id: task_id };
      const editTask = {
        boardName: boardName,
        boardDescription: boardDescription,
      };
      const updateTask = await taskHeader.findByIdAndUpdate(filter, editTask, {
        new: true,
      });
      if (updateTask) {
        return res.status(200).json({
          code: 200,
          message: "Header updated",
          data: updateTask,
        });
      } else {
        return res.status(404).json({
          code: 404,
          message: "Header Not updated",
          data: updateTask,
        });
      }
    } catch (err) {
      return res.status(400).json({
        code: 400,
        Massage: err,
        error: err,
      });
    }
  },

  async getTasks(req, res) {
    try {
      const { user_id } = req.body;
      console.log('user_id', user_id)
            console.log(' req.body',  req.body)


      const data = await tasksDetails.find({ user_id: user_id });
 console.log('data', data)
      if (data.length > 0) {
        res.status(200).json({
          code: 200,
          message: "All Tasks received",
          data: data,
        });
      } else {
        res.json({
          code: 404,
          message: `No tasks were found for user ${user_id}`,
          data: [],
        });
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({
        code: 400,
        Massage: `No tasks were found for user ${req.params.id}`,
        error: err,
      });
    }
  },


};

module.exports = taskBoardController;
