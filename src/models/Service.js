import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  cost: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
