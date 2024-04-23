class TasksService {
    constructor({ Task, User }) {
        this.Task = Task;
        this.User = User;
    }

    async createTask(taskData) {
        const { userId } = taskData;
        const _user = await this.User.findById(userId);

        if (!_user) {
            return {
                error: 'User not found !',
            };
        }

        const _task = await this.Task.create(taskData);

        _user.tasks.push(_task);
        await _user.save();

        // await this.User.updateOne({ id: userId }, { $push: { _tasks.id } });

        return {
            message: 'Task created successfully !',
            task: _task,
        };
    }

    async updateTask(taskId, taskData) {
        const { userId } = taskData;
        const _user = await this.User.findById(userId);

        if (!_user) {
            return {
                error: 'User not found !',
            };
        }

        const _task = await this.Task.findByIdAndUpdate(taskId, taskData, { new: true });

        if (_task) {
            return {
                message: 'Task updated successfully !',
                task: _task,
            };
    }
        return {
            error: 'Task not found !',
        };
    
}

async deleteTask(taskId) {
    var _task = await this.Task.findByIdAndDelete(taskId);

    if (_task) {
        const _user = await this.User.findOne({ tasks: taskId });

        if (_user) {
            _user.tasks.pull(taskId);
        }

        return {
            message: 'Task deleted successfully !',
        };
    }

    return {
        error: 'Task not found !',
    };

}
}
module.exports = TasksService;