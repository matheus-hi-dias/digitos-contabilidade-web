import { api, configHeader } from './api';

export async function getDocuments() {
  const response = await api.get('/documents', configHeader());
  console.log({ response });
  return response.data;
}

export async function getDocumentByCode(documentCode) {
  const response = await api.get(`/documents/${documentCode}`, configHeader());
  return response.data;
}

export async function updateDocument(documentCode, data) {
  const response = await api.put(`/documents/${documentCode}`, data, configHeader());
  return response.data;
}

export async function createDocument(data) {
  const response = await api.post('/documents', data, configHeader());
  console.log({ response });
  return response.data;
}

export async function deleteDocument(documentCode) {
  const response = await api.delete(`/documents/${documentCode}`, configHeader());
  return response.data;
}
