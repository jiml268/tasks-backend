const taskHeader = require("../models/taskHeader");
const tasksDetails = require("../models/tasksDetails");

const taskBoardController = {
  async createTitle(req, res) {
    try {
      const { user_id } = req.body;
      console.log('user_id', user_id)
      const createTitle = {
        user_id,
        boardName: `New Task Board for user ${user_id}`,
        boardDescription: `This is a new task boarcd for user ${user_id}`,
      };

      const newTitle = await taskHeader.create(createTitle);
      console.log('newTitle', newTitle)
      return res.status(201).json({
        code: 201,
        message: "Header was created",
        data: newTitle,
      });
    } catch (err) {
            console.log('err', err)

      return res.status(400).json({
        code: 400,
        Massage: "An error has accurred",
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
      const createTask = {
        user_id,
        taskTitle: "New Task",
        task_description: "New Task",
        icon: iconName,
        stat: "none",
      };

      const newTask = await tasksDetails.create(createTask);
      return res.status(201).json({
        code: 201,
        message: "Task was created",
        data: newTask,
      });
    } catch (err) {
      return res.status(400).json({
        code: 400,
        Massage: err,
        error: err,
      });
    }
  },

  async getHeader(req, res) {
    try {
      const { user_id } = req.body;

      const myCount = await taskHeader.countDocuments({user_id: user_id}); 
      console.log('myCount', myCount);
      if (myCount > 0) {
console.log('my count > 0');
        const data = await taskHeader.findOne({ user_id: user_id });
        console.log('data', data)
        if (data) {
          res.status(200).json({
            code: 200,
            message: "Header Received",
            data: data,
          });
         
        
        }
      }
      else {
        console.log('my count = 0');
 const createTitle = {
        user_id,
        boardName: `New Task Board for user ${user_id}`,
        boardDescription: `This is a new task boarcd for user ${user_id}`,
      };

      const newTitle = await taskHeader.create(createTitle);
        console.log('newTitle', newTitle)
        
      const data = await taskHeader.findOne({ user_id: user_id });
        console.log('data', data)
        if (data) {
          res.status(200).json({
            code: 200,
            message: "Header Received",
            data: data,
          });
         
        
        }

        }
    } catch (err) {
              console.log(err);

      res.status(400).json({
        code: 400,
        Massage: `No contact was found for id ${req.params.id}`,
        error: err,
      });
    }
  },

  async getTasks(req, res) {
    try {
      const currentUser = req.params.id ? req.params.id : 1;
      const data = await tasksDetails.find({ user_id: currentUser });

      if (data.length > 0) {
        res.status(200).json({
          code: 200,
          message: "All Tasks received",
          data: data,
        });
      } else {
        res.status(404).json({
          code: 404,
          message: `No tasks were found for user ${currentUser}`,
          data: data,
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
      if (updateTask) {
        return res.status(200).json({
          code: 200,
          message: "Task deleted",
          data: updateTask,
        });
      } else {
        return res.status(404).json({
          code: 404,
          message: "Task not deleted",
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
};

module.exports = taskBoardController;
