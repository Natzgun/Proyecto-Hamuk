import Task from '../models/task.model.js';

export const getTasks = async (request, response) => {
  const tasks = await Task.find({
    user: request.user.id,
  }).populate('user');
  response.json(tasks);
};

export const createTask = async (request, response) => {
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

export const getTask = async (request, response) => {
  const task = await Task.findById(request.params.id).populate('user');
  if (!task) return response.status(404).json({ message: 'Task not found' });
  response.json(task);
};

export const deleteTask = async (request, response) => {
  const task = await Task.findByIdAndDelete(request.params.id);
  if (!task) return response.status(404).json({ message: 'Task not found' });
  response.sendStatus(204);
};

export const updateTask = async (request, response) => {
  const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  if (!task) return response.status(404).json({ message: 'Task not found' });
  response.json(task);
};
