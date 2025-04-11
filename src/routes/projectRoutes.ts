import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';

const router = Router();

// Crear un proyecto : POST /api/projects
router.post('/', ProjectController.createProject);
// Obtener todos los proyectos : GET /api/projects
router.get('/', ProjectController.getAllProjects);
export default router;