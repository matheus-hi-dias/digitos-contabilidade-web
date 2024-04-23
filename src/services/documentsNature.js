import { api, configHeader } from './api';

export async function getNatures() {
  const response = await api.get('/nature', configHeader());
  return response.data;
}

export async function getNatureById(id) {
  const response = await api.get(`/nature/${id}`, configHeader());
  return response.data;
}

export async function updateNature(id, data) {
  const response = await api.put(`/nature/${id}`, data, configHeader());
  return response.data;
}

export async function createNature(data) {
  const response = await api.post('/nature', data, configHeader());
  return response.data;
}

export async function deleteNature(id) {
  const response = await api.delete(`/nature/${id}`, configHeader());
  return response.data;
}
