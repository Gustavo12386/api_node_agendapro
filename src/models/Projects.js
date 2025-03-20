import mongoose from "mongoose";
import Service from "../models/Service.js";
import Category from "../models/Category.js";

const projectSchema = new mongoose.Schema({
    budget: {
        type: Number,    
        required: true,    
    },
    cost: {
        type: String,
        required: true,        
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',        
    }],
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;