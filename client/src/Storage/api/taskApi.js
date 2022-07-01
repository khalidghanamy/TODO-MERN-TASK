import axios from 'axios';

const url = 'http://localhost:4000/tasks/';

export const getTasks = () => axios.get(`${url}/read/${userId}`);
export const createTask = (newTask) => axios.post(`${url}/create/${userId}`, newTask);

export const updateTask = (id, updateTask) => axios.patch(`${url}/${id}`, updateTask);

export const deleteTask = (id) => axios.delete(`${url}/${id}`);
export const getTask = (id) => axios.get(`${url}/${id}`);

