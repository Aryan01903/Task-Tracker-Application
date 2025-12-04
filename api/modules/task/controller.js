const TaskService = require("../../services/task");

class TaskController {
    
    static async create(req, res) {
        try {
            const task = await TaskService.createTask(req.body);
            res.status(201).json({ message: "Task created successfully", data: task });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const tasks = await TaskService.getAllTasks();
            res.status(200).json({ data: tasks, message: "Data fetched successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const task = await TaskService.getTaskById(req.params.id);
            res.status(200).json({ data: task });
        } catch (error) {
            res.status(400).json({ message: error.message, message: "Data fetched successfully" });
        }
    }

    static async update(req, res) {
        try {
            const task = await TaskService.updateTask(req.params.id, req.body);
            res.status(200).json({ message: "Task updated", data: task });
        } catch (error) {
            res.status(400).json({ message: error.message, message: "Data updated successfully" });
        }
    }

    static async delete(req, res) {
        try {
            const task = await TaskService.deleteTask(req.params.id);
            res.status(200).json({ message: "Task deleted successfully", data: task });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateType(req, res) {
        try {
            const { value, type } = req.body;
            const task = await TaskService.updateType(req.params.id, value, type);

            res.status(200).json({
                message: `${type} updated successfully`,
                data: task
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = TaskController;
