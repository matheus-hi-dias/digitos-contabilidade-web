import { api, configHeader } from './api';

export async function getDocumentStorageLocal() {
  const response = await api.get('/document-location', configHeader());
  return response.data;
}

export async function getDocumentStorageLocalById(id) {
  const response = await api.get(`/document-location/${id}`, configHeader());
  return response.data;
}

export async function updateDocumentStorageLocal(id, data) {
  const response = await api.put(`/document-location/${id}`, data, configHeader());
  return response.data;
}

export async function createDocumentStorageLocal(data) {
  const response = await api.post('/document-location', data, configHeader());
  return response.data;
}

export async function deleteDocumentStorageLocal(id) {
  const response = await api.delete(`/document-location/${id}`, configHeader());
  return response.data;
}
