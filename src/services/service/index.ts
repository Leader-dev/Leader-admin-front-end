import { request } from 'umi';

export async function getAccessStartUrl() {
  return (await request<{ start: any }>('/service/image/access-start-url')).start;
}
