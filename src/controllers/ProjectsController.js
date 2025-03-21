import Project from '../models/Projects.js';  
import Service from '../models/Service.js';  
import Category from '../models/Category.js';
import { request, response } from 'express';

async function createProject(req, res){
    try {
        // Busca a categoria pelo nome
        const category = await Category.findOne({ name: req.body.category.name });
    
        if (!category) {
          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
    
        // Criação de serviços (se houver)
        let services = [];
        if (req.body.services.length > 0) {
          services = await Service.insertMany(req.body.services);
        }
    
        // Criação do projeto
        const project = new Project({
          budget: req.body.budget,
          cost: req.body.cost,
          services: services.map(service => service._id),
          name: req.body.name,
          category: category._id  
        });
    
        await project.save();
    
        // Popula os dados relacionados na resposta
        const populatedProject = await Project.findById(project._id)
          .populate('category')
          .populate('name');        
    
        res.status(201).json(populatedProject);
        
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

async function getProject(req, res) {
    try {
      // Busca todos os projetos e popula os dados relacionados
      const projects = await Project.find()
      .populate('category')
      .populate('name');     
  
      if (projects.length === 0) {
        return res.status(404).json({ error: 'Nenhum projeto encontrado' });
      }
      
      res.status(200).json(projects);
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

async function getCategories(req, res) {
    try {
      // Busca todos os projetos e popula os dados relacionados
      const categories = await Category.find()
      .populate('name')      
  
      if (categories.length === 0) {
        return res.status(404).json({ error: 'Nenhuma categoria encontrada' });
      }
      
      res.status(200).json(categories);
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

async function deleteProject(req, res) {
    const id = req.params.id

    await Project.findByIdAndDelete({_id: id})

    return res.status(200).json({response: "Projeto deletado"})
}

export {createProject, getProject, getCategories, deleteProject} 