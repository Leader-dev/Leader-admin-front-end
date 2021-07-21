import { request } from 'umi';

export async function getUserList() {
  return (await request<{ list: any[] }>('/user/list')).list;
}
