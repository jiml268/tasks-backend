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
    


      const data = await tasksDetails.find({ user_id: user_id });
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
      res.status(400).json({
        code: 400,
        Massage: `No tasks were found for user ${req.params.id}`,
        error: err,
      });
    }
  },
async editTask(req, res) {
    try {
      const { task_id, user_id, taskTitle, task_description, icon, stat } = req.body;

      const filter = { _id: task_id };
      const editTask = {
        user_id: user_id,
        taskTitle: taskTitle,
        task_description: task_description,
        icon: icon,
        stat: stat,
      };

      const updateTask = await tasksDetails.findByIdAndUpdate(
        filter,
        editTask,
        {
          new: true,
        }
      );
      return res.status(200).json({
        code: 200,
        message: "Task updated",
        data: updateTask,
      });
    } catch (err) {
      return res.status(400).json({
        code: 400,
        Massage: err,
        error: err,
      });
    }
  },

  

  async deleteTask(req, res) {
    try {
      const { task_id } = req.body;
      const filter = { _id: task_id };
     
      const deleteTask = await tasksDetails.findByIdAndDelete(filter);
      if (deleteTask) {
        return res.status(200).json({
          code: 200,
          message: "Task deleted",
          data: deleteTask,
        });
      } else {
        return res.status(404).json({
          code: 404,
          message: "Task not deleted",
          data: deleteTask,
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        code: 400,
        Massage: err,
        error: err,
      });
    }
  },

  async createTask(req, res) {
    try {
      const { user_id } = req.body;
      const randomIcon = Math.floor(Math.random() * 6);
      let iconName = "";
      switch (randomIcon) {
        case 0:
          iconName = "iconName";
          break;
        case 1:
          iconName = "message";
          break;
        case 2:
          iconName = "coffee";
          break;
        case 3:
          iconName = "weightlift";
          break;
        case 4:
          iconName = "books";
          break;
        case 5:
          iconName = "alarm";
          break;
        default:
          iconName = "alarm";
      }
      console.log('iconName', iconName)
      const createTask = {
        user_id,
        taskTitle: "New Task",
        task_description: "New Task",
        icon:  iconName ,
        stat: "none",
      };

      const newTask = await tasksDetails.create(createTask);
      return res.status(201).json({
        code: 201,
        message: "Task was created",
        data: newTask,
      });
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        code: 400,
        Massage: err,
        error: err,
      });
    }
  },

};

module.exports = taskBoardController;
