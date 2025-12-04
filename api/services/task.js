const Task = require("../models/task.model");

class TaskService {
    
    static async createTask(data) {
        const task = new Task(data);
        return await task.save();
    }

    static async getAllTasks() {
        return await Task.find({ isDeleted: false });
    }

    static async getTaskById(id) {
        const task = await Task.findOne({ _id: id, isDeleted: false });
        if (!task) throw new Error("Task not found");
        return task;
    }

    static async updateTask(id, data) {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, isDeleted: false },
            data,
            { new: true }
        );

        if (!updatedTask) throw new Error("Task not found or deleted");
        return updatedTask;
    }

    static async deleteTask(id) {
        const deletedTask = await Task.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedTask) throw new Error("Task not found or already deleted");
        return deletedTask;
    }

    static async updateType(id, value, type) {
        const task = await Task.findOne({ _id: id, isDeleted: false });
        if (!task) throw new Error("Task not found");

        if (type === "status") {
            const allowedStatus = ["TODO", "INPROGESS", "DONE"];
            if (!allowedStatus.includes(value)) {
                throw new Error("Invalid status value");
            }
            task.status = value;
        } 
        else if (type === "priority") {
            const allowedPriorities = ["LOW", "MEDIUM", "HIGH"];
            if (!allowedPriorities.includes(value)) {
                throw new Error("Invalid priority value");
            }
            task.priority = value;
        }
        else {
            throw new Error("Invalid type. Use 'status' or 'priority'");
        }

        return await task.save();
    }
}

module.exports = TaskService;
