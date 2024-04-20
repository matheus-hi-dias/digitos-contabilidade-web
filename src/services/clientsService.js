import { api, configHeader } from './api';

export async function getClients() {
  const response = await api.get('/clients', configHeader());
  return response.data;
}

export async function getClientById(id) {
  const response = await api.get(`/clients/${id}`, configHeader());
  return response.data;
}

export async function updateClient(id, data) {
  const response = await api.put(`/clients/${id}`, data, configHeader());
  return response.data;
}

export async function createClient(data) {
  const response = await api.post('/clients', data, configHeader());
  return response.data;
}

export async function deleteClient(id) {
  const response = await api.delete(`/clients/${id}`, configHeader());
  return response.data;
}
