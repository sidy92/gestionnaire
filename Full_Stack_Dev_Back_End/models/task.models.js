const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ['to do', 'doing', 'done'],
            required: false,
        },
        dueDate: {
            type: Date,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const taskSchema = mongoose.model('Task', TaskSchema);

module.exports = taskSchema;