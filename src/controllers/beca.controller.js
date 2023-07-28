import Task from '../models/becas.model.js';

export const getBecas = async (request, response) => {
  try {
    const tasks = await Task.find().populate('user');
  response.json(tasks);
  } catch (error) {
    return response.status(500).json({ message: "Get becas not found" });
  }
};

export const createBeca = async (request, response) => {
  try {
    const { title, description, date, image } = request.body;
  //console.log(request.user);
  const newTask = new Task({
    title,
    description,
    date,
    image,
    user: request.user.id,
  });
  const savedTask = await newTask.save();
  response.json(savedTask);
  } catch (error) {
    return response.status(500).json({ message: "Create failed" });
  }
};

export const getBeca = async (request, response) => {
  try {
    const task = await Task.findById(request.params.id).populate('user');
    if (!task) return response.status(404).json({ message: 'Beca not found' });
    response.json(task);
  } catch (error) {
    return response.status(404).json({ message: 'Beca error, not found' });
  }
};

export const deleteBeca = async (request, response) => {
  try {
    const task = await Task.findByIdAndDelete(request.params.id);
    if (!task) return response.status(404).json({ message: 'Beca not found' });
    response.sendStatus(204);
  } catch (error) {
    return response.status(404).json({ message: error.message });
  }
};

export const updateBeca = async (request, response) => {
  try {
    const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    if (!task) return response.status(404).json({ message: 'Beca not found' });
    response.json(task);
  } catch (error) {
    return response.status(404).json({ message: 'Beca error' });
  }
};
