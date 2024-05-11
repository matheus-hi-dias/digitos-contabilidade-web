/* eslint-disable import/prefer-default-export */
import { api, configHeader } from './api';

export async function getEmployeeProfile() {
  const response = await api.get('/my-profile', configHeader());
  return response.data;
}
