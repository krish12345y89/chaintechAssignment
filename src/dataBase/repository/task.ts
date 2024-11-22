import { ErrorSend } from "../../utils/errorHandle.js";
import { Task } from "../models/task.js";

class RepositoryTask {
    async addTask(taskName: string, title: string, description: string, isCompleted: boolean, next: Function) {
        try {
            const task = {
                taskName,
                title,
                isCompleted,
                description
            };
            const result = new Task(task);
            await result.save();
            return result;
        } catch (err) {
            next(new ErrorSend("Failed to add task", 400, false, true));
        }
    }

    async getTask(_id: string) {
        try {
            const result = await Task.findById(_id);
            if (!result) {
                throw new ErrorSend("Task not found", 404, false, true);
            }
            return result;
        } catch (err) {
            throw new ErrorSend("Error fetching task", 500, false, true);
        }
    }

    async getAllTasks() {
        try {
            const result = await Task.find({});
            return result;
        } catch (err) {
            throw new ErrorSend("Error fetching tasks", 500, false, true);
        }
    }

    async updateTask(_id: string, taskName?: string, title?: string, isCompleted?: boolean, description?: string) {
        try {
            const updatedTask: { taskName?: string; title?: string; description?: string; isCompleted?: boolean } = {};
            if (taskName) updatedTask.taskName = taskName;
            if (title) updatedTask.title = title;
            if (description) updatedTask.description = description;
            if (isCompleted !== undefined) updatedTask.isCompleted = isCompleted; // Check for undefined

            const result = await Task.findByIdAndUpdate(_id, updatedTask, { new: true });
            if (!result) {
                throw new ErrorSend("Task not found", 404, false, true);
            }
            return result;
        } catch (err) {
            throw new ErrorSend("Error updating task", 500, false, true);
        }
    }

    async deleteTask(_id: string) {
        try {
            const result = await Task.findByIdAndDelete(_id);
            if (!result) {
                throw new ErrorSend("Task not found", 404, false, true);
            }
            return result;
        } catch (err) {
            throw new ErrorSend("Error deleting task", 500, false, true);
        }
    }
}

export default RepositoryTask;