import { api, configHeader } from './api';

export async function getDocumentTypes() {
  const response = await api.get('/document-type', configHeader());
  return response.data;
}

export async function getDocumentTypeById(id) {
  const response = await api.get(`/document-type/${id}`, configHeader());
  return response.data;
}

export async function updateDocumentType(id, data) {
  const response = await api.put(`/document-type/${id}`, data, configHeader());
  return response.data;
}

export async function createDocumentType(data) {
  const response = await api.post('/document-type', data, configHeader());
  return response.data;
}

export async function deleteDocumentType(id) {
  const response = await api.delete(`/document-type/${id}`, configHeader());
  return response.data;
}
