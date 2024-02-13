const { Schema, model } = require('mongoose');

const tasksDetailsSchema = new Schema({
    user_id: {
        type: Number,
        require: true,
    },
    taskTitle: {
        type: String,
        require: true,
    },
    task_description: {
        type: String,
        require: true,
    },
     icon: {
        type: String,
       require: true,
    },
      stat: {
          type: String,
           require: true,
        default: "none",
    },
    
})

module.exports = model('TasksDetails', tasksDetailsSchema);