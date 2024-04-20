import { api, configHeader } from './api';

export async function getNatures() {
  try {
    const response = await api.get('/nature', configHeader());
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export async function getNatureById(id) {
  try {
    const response = await api.get(`/nature/${id}`, configHeader());
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export async function updateNature(id, data) {
  try {
    const response = await api.put(`/nature/${id}`, data, configHeader());
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createNature(data) {
  try {
    const response = await api.post('/nature', data, configHeader());
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteNature(id) {
  try {
    const response = await api.delete(`/nature/${id}`, configHeader());
    return response;
  } catch (error) {
    return error.response;
  }
}
