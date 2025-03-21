import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Routes from './routes/routes.js';  

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect("mongodb+srv://calderarogustavo:T2nXnffwz6AjsxyO@cluster0.k3uul6z.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Banco de dados conectado"))
  .catch(() => console.log("Erro"));

app.use('/api', Routes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
