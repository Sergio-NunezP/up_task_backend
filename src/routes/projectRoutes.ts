import { Router } from 'express';
import { body } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputError } from '../middleware/validation';

const router = Router();

// Crear un proyecto : POST /api/projects
router.post('/',
    body('projectName')
        .notEmpty().withMessage('El Nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La description del proyecto es obligatorio'),
    handleInputError,
    ProjectController.createProject);

// Obtener todos los proyectos : GET /api/projects
router.get('/', ProjectController.getAllProjects);
export default router;