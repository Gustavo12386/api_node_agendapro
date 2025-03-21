import express, { request } from "express";
import {getProject, getCategories, createProject, deleteProject} from "../controllers/ProjectsController.js";

const router = express.Router();

// Rota para criar um novo projeto
router.post('/projects', createProject);
router.get('/projects', getProject);
router.get('/categories', getCategories);
router.delete('/projects/:id', deleteProject);

export default router;
