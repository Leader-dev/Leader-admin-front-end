import { request } from 'umi';
import { uploadFile } from '@/services/service';

export async function getUserList() {
  return (await request<{ list: any[] }>('/admin/user/list')).list;
}

export async function getOfficialNotifications({ toAll }: { toAll?: boolean }) {
  return (
    await request<{ list: any[] }>('/admin/user/official-notification/list', {
      data: { toAll },
    })
  ).list;
}

export async function getUserInfo(uid: string) {
  return (
    await request<{ info: any }>('/admin/user/official-notification/user-info', {
      data: { uid },
    })
  ).info;
}

export async function sendOfficialNotification(params: any) {
  const url = params.cover ? await uploadFile(params.cover[0]) : undefined;
  return await request('/admin/user/official-notification/send', {
    data: {
      ...params,
      cover: undefined,
      coverUrl: url,
    },
  });
}

export async function updateOfficialNotification(params: any) {
  const url = params.cover ? await uploadFile(params.cover[0]) : undefined;
  return await request('/admin/user/official-notification/update', {
    data: {
      ...params,
      cover: undefined,
      coverUrl: url,
    },
  });
}

export async function getOfficialNotificationDetail(notificationId: string) {
  return (
    await request('/admin/user/official-notification/detail', {
      data: { notificationId },
    })
  ).detail;
}

export async function deleteOfficialNotification(notificationId: string) {
  return await request('/admin/user/official-notification/delete', {
    data: { notificationId },
  });
}
