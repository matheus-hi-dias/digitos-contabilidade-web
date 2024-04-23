import { api, configHeader } from './api';

export async function getPermissionsByEmployeeId(id) {
  const response = await api.get(`/employees-permissions/${id}`, configHeader());
  return response.data;
}

export async function createEmployeePermission(data) {
  const response = await api.post('/employees-permissions', data, configHeader());
  return response.data;
}

export async function deleteEmployeePermission(employeeId, permissionId) {
  const response = await api.delete(`/employees-permissions/employee/${employeeId}/permission/${permissionId}`, configHeader());
  return response.data;
}
