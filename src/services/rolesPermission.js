import { api, configHeader } from './api';

export async function getPermissionByRoleId(roleId) {
  const response = await api.get(`/roles-permissions/role/${roleId}`, configHeader());
  return response.data;
}

export async function createRolePermission(data) {
  const response = await api.post('/roles-permissions', data, configHeader());
  return response.data;
}

export async function deleteRolePermission(roleId, permissionId) {
  const response = await api.delete(`/roles-permissions/role/${roleId}/permission/${permissionId}`, configHeader());
  return response.data;
}
