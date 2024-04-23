import { api, configHeader } from './api';

export async function getRoles() {
  const response = await api.get('/roles', configHeader());
  return response.data;
}

export async function getRoleById(id) {
  const response = await api.get(`/roles/${id}`, configHeader());
  return response.data;
}

export async function updateRole(id, data) {
  const response = await api.put(`/roles/${id}`, data, configHeader());
  return response.data;
}

export async function createRole(data) {
  const response = await api.post('/roles', data, configHeader());
  return response.data;
}

export async function deleteRole(id) {
  const response = await api.delete(`/roles/${id}`, configHeader());
  return response.data;
}
