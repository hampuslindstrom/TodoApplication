import axios from 'axios';

// const baseUrl = 'http://localhost:5000/api/Todos';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todos`;

export const loadTodos = () => {
  return axios.get(baseUrl).then(response => response.data);
}

export const getTodo = (id: number) => {
  return axios.get(`${baseUrl}/${id}`).then(response => response.data);
}

export const createTodo = (todo: { title: string; completed: boolean; }) => {
  return axios.post(baseUrl, {
    title: todo.title,
    completed: todo.completed
  }).then(response => response.data);
}

export const updateTodo = (todo: { id: number; title: string; completed: boolean; }) => {
  return axios.put(`${baseUrl}/${todo.id}`, {
    id: todo.id,
    title: todo.title,
    completed: todo.completed
  }).then(response => response.data);
}

export const deleteTodo = (id: number) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
}