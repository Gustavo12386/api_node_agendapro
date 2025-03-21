import Project from '../models/Projects.js';  
import Service from '../models/Service.js';  
import Category from '../models/Category.js';

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
    
      // Popula corretamente as referências
      const populatedProject = await Project.findById(project._id)
        .populate('category')
        .populate('services'); 

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
      .populate('services');     
  
      if (projects.length === 0) {
        return res.status(404).json({ error: 'Nenhum projeto encontrado' });
      }
      
      res.status(200).json(projects);
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

async function getProjectById(req, res) {
  try {
    const project = await Project.findOne({ _id: req.params.id })
    .populate('category');

    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    res.json(project); 
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
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

async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Atualizar a categoria
    if (req.body.category?.name) {
      const category = await Category.findOne({ name: req.body.category.name });
      if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });
      updateData.category = category._id;
    }

    // Atualizar serviços
    if (req.body.services && Array.isArray(req.body.services)) {
      const newServices = await Service.insertMany(req.body.services);
      updateData.services = newServices.map(s => s._id);
    }

    // Atualização do projeto
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,      
    )
      .populate('category')
      .populate('services');

    if (!updatedProject) return res.status(404).json({ error: 'Projeto não encontrado' });

    res.status(200).json(updatedProject);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export {createProject, getProject, getProjectById, getCategories, deleteProject, updateProject} 