import express, { request } from "express";
import {getProject, getCategories, createProject} from "../controllers/ProjectsController.js";

const router = express.Router();

// Rota para criar um novo projeto
router.post('/projects', createProject);
router.get('/projects', getProject);
router.get('/categories', getCategories);

export default router;
