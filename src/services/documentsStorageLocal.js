import { api, configHeader } from './api';

export async function getDocumentStorageLocal() {
  const response = await api.get('/document-storage-local', configHeader());
  return response.data;
}

export async function getDocumentStorageLocalById(id) {
  const response = await api.get(`/document-storage-local/${id}`, configHeader());
  return response.data;
}

export async function updateDocumentStorageLocal(id, data) {
  const response = await api.put(`/document-storage-local/${id}`, data, configHeader());
  return response.data;
}

export async function createDocumentStorageLocal(data) {
  const response = await api.post('/document-storage-local', data, configHeader());
  return response.data;
}

export async function deleteDocumentStorageLocal(id) {
  const response = await api.delete(`/document-storage-local/${id}`, configHeader());
  return response.data;
}
