import axios from "./axios";

export const getBecasRequest = () => axios.get("/becas");

export const createBecaRequest = (beca) => axios.post("/becas", beca);

export const updateBecaRequest = (beca) =>
  axios.put(`/becas/${task._id}`, beca);

export const deleteBecaRequest = (id) => axios.delete(`/becas/${id}`);

export const getBecaRequest = (id) => axios.get(`/becas/${id}`);