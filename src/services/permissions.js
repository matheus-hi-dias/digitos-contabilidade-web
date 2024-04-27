import { api, configHeader } from './api';

export default async function getPermissions() {
  const response = await api.get('/permissions', configHeader());
  return response.data;
}
