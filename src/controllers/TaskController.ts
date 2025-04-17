import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
    // Crear una tarea : POST /api/:projectId/tasks
    static createProject = async (req: Request, res: Response) => {

        try {
            const task = new Task(req.body);
            task.project = req.project.id;
            req.project.tasks.push(task.id);
            await Promise.allSettled([
                task.save(),
                req.project.save()
            ])
            res.send('Tarea creada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }

    // Obtener todas las tareas de un proyecto : GET /api/:projectId/tasks
    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate("project");
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }

    // Obtener una tarea por id : GET /api/:projectId/tasks/:taskId
    static getTaskById = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId);
            if (!task) {
                const error = new Error('No se encontro la tarea');
                res.status(404).json({ error: error.message });
                return
            }
            if (task.project.toString() !== req.project.id) {
                const error = new Error('Acción no permitida, la tarea no pertenece al proyecto');
                res.status(400).json({ error: error.message });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }

    // Actualizar una tarea por id : PUT /api/:projectId/tasks/:taskId
    static updateTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId);
            if (!task) {
                const error = new Error('No se encontro la tarea');
                res.status(404).json({ error: error.message });
                return
            }
            if (task.project.toString() !== req.project.id) {
                const error = new Error('Acción no permitida, la tarea no pertenece al proyecto');
                res.status(400).json({ error: error.message });
            }

            task.name = req.body.name
            task.description = req.body.description
            await task.save()
            res.send('Tarea actualizada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }
    // Eliminar una tarea por id : DELETE /api/:projectId/tasks/:taskId
    static deleteTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId);
            if (!task) {
                const error = new Error('No se encontro la tarea');
                res.status(404).json({ error: error.message });
                return
            }
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== taskId)
            await Promise.allSettled([task.deleteOne(), req.project.save()])
            res.send('Tarea eliminada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la tarea' });
        }
    }
}