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
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({ error: error.message })
            }
            res.json(project)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error al obtener el proyecto' })
        }
    }
}
