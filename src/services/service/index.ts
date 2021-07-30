import { request } from 'umi';
import type { UploadFile } from 'antd/lib/upload/interface';

const fullToShort = (url: string) => {
  return url.match(/(v1_[A-Za-z0-9]+)\?/)![1];
};

export async function getAccessStartUrl() {
  return (await request<{ start: any }>('/service/image/access-start-url')).start;
}

export async function getUploadUrl() {
  return (await request<{ url: string }>('/service/image/get-upload-url')).url;
}

export async function uploadFile(file: UploadFile) {
  const url = await getUploadUrl();
  await request(url, {
    prefix: '',
    method: 'put',
    data: file.originFileObj,
    headers: {
      'Content-Type': '',
    },
  });
  return fullToShort(url);
}
