import { api, configHeader } from './api';

export async function getClients() {
  try {
    const response = await api.get('/clients', configHeader());
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export async function getClientById(id) {
  try {
    const response = await api.get(`/clients/${id}`, configHeader());
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export async function updateClient(id, data) {
  try {
    const response = await api.put(`/clients/${id}`, data, configHeader());
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createClient(data) {
  try {
    const response = await api.post('/clients', data, configHeader());
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

export async function deleteClient(id) {
  try {
    const response = await api.delete(`/clients/${id}`, configHeader());
    return response;
  } catch (error) {
    return error.response;
  }
}
