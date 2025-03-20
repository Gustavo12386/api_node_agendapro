import express, { request } from "express";
import {getUser, createUser} from "../controllers/ProjectsController.js";

const router = express.Router();

// Rota para criar um novo projeto
router.post('/projects', createUser);
router.get('/projects', getUser);


export default router;
