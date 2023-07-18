import Task from '../models/becas.model.js';

export const getBecas = async (request, response) => {
  const tasks = await Task.find().populate('user');
  response.json(tasks);
};

export const createBeca = async (request, response) => {
  const { title, description, date } = request.body;
  console.log(request.user);
  const newTask = new Task({
    title,
    description,
    date,
    user: request.user.id,
  });
  const savedTask = await newTask.save();
  response.json(savedTask);
};

export const getBeca = async (request, response) => {
  const task = await Task.findById(request.params.id).populate('user');
  if (!task) return response.status(404).json({ message: 'Beca not found' });
  response.json(task);
};

export const deleteBeca = async (request, response) => {
  const task = await Task.findByIdAndDelete(request.params.id);
  if (!task) return response.status(404).json({ message: 'Beca not found' });
  response.sendStatus(204);
};

export const updateBeca = async (request, response) => {
  const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  if (!task) return response.status(404).json({ message: 'Beca not found' });
  response.json(task);
};
