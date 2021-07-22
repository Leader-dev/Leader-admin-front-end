import { request } from 'umi';

export async function getOrganizationList() {
  return (await request<{ list: any[] }>('/admin/org/list')).list;
}

export async function updateOrganization(info: {
  id: string;
  status: string;
  instituteAuth: string;
}) {
  return await request('/admin/org/update', { data: { info } });
}

export async function getOrganizationTypes() {
  return (await request<{ types: any[] }>('/admin/org/type/list')).types;
}

export async function saveType(type: { id?: string }) {
  return await request('/admin/org/type/save', { data: { type } });
}

export async function deleteType(id: any) {
  return await request('/admin/org/type/delete', { data: { typeId: id } });
}

export async function moveUpType(id: any) {
  return await request('/admin/org/type/move-up', { data: { typeId: id } });
}

export async function moveDownType(id: any) {
  return await request('/admin/org/type/move-down', { data: { typeId: id } });
}

export async function getReportList() {
  return (await request<{ reports: any }>('/admin/org/report/list')).reports;
}

export async function getReportDetail(id: any) {
  return (await request('/admin/org/report/detail', { data: { reportId: id } })).detail;
}
