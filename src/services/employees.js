import { api, configHeader } from './api';

export async function getEmployees() {
  const response = await api.get('/employee', configHeader());
  return response.data;
}

export async function getEmployeeById(id) {
  const response = await api.get(`/employee/${id}`, configHeader());
  return response.data;
}

export async function updateEmployee(id, data) {
  const response = await api.put(`/employee/${id}`, data, configHeader());
  return response.data;
}

export async function createEmployee(data) {
  const response = await api.put('/employee', data, configHeader());
  return response.data;
}

export async function deleteEmployee(id) {
  const response = await api.delete(`/employee/${id}`, configHeader());
  return response.data;
}
