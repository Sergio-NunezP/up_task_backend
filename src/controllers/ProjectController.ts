import type { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {

    // Crear un proyecto : POST 
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
        try {
            await project.save()
            res.send('Proyecto creado correctamente')
        } catch (error) {
            console.error(error)
        }
    }


    // Obtener todos los proyectos : GET 
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.error(error)
        }
    }
    // Obtener los proyectos por ID : GET 
    static getProjectByID = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id).populate('tasks')
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({ error: error.message })
            }
            res.json(project)
        } catch (error) {
            console.error(error)
        }
    }

    // Actualizar un proyecto por id: PUT
    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findByIdAndUpdate(id, req.body)

            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({ error: error.message })
            }
            await project.save()
            res.send('Proyecto actualizado correctamente')
        } catch (error) {
            console.error(error)
        }
    }

    // Eliminar un proyecto por id: DELETE
    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await (await Project.findById(id))
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({ error: error.message })
            }
            await project.deleteOne()
            res.send('Proyecto eliminado correctamente')

        } catch (error) {
            console.error(error)
        }
    }
}
