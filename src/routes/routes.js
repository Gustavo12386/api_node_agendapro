import express from "express";
import {getProject, getCategories, createProject, deleteProject, updateProject} from "../controllers/ProjectsController.js";

const router = express.Router();

// Rota para criar um novo projeto
router.post('/projects', createProject);
router.get('/projects', getProject);
router.get('/categories', getCategories);
router.delete('/projects/:id', deleteProject);
router.patch('/projects/:id', updateProject);

export default router;
