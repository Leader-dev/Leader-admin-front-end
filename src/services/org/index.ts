import { request } from 'umi';

export async function getOrganizationList() {
  return (await request<{ list: any[] }>('/org/list')).list;
}

export async function updateOrganization(info: {
  id: string;
  status: string;
  instituteAuth: string;
}) {
  return await request('/org/update', { data: { info } });
}

export async function getOrganizationTypes() {
  return (await request<{ types: any[] }>('/org/type/list')).types;
}

export async function saveType(type: { id?: string }) {
  return await request('/org/type/save', { data: { type } });
}

export async function deleteType(id: any) {
  return await request('/org/type/delete', { data: { typeId: id } });
}

export async function moveUpType(id: any) {
  return await request('/org/type/move-up', { data: { typeId: id } });
}

export async function moveDownType(id: any) {
  return await request('/org/type/move-down', { data: { typeId: id } });
}
