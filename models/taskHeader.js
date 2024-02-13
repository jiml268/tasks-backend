const { Schema, model } = require('mongoose');

const taskHeaderSchema = new Schema({
    user_id: {
        type: Number,
        require: true,
    },
    boardName: {
        type: String,
        require: true,
    },
    boardDescription: {
        type: String,
        require: true,
    },  
})

module.exports = model('TaskHeader', taskHeaderSchema);