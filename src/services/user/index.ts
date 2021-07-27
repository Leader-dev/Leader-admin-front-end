import { request } from 'umi';

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
  return await request('/admin/user/official-notification/send', {
    data: params,
  });
}

export async function updateOfficialNotification(params: any) {
  return await request('/admin/user/official-notification/update', {
    data: params,
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
