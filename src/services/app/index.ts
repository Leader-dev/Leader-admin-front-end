import { request } from 'umi';

export async function getUserAgreement() {
  return (await request('/app/agreement')).data.md;
}

export async function setUserAgreement(md: string) {
  return await request('/admin/app/set-agreement', { data: { md } });
}

export async function getUserPrivacy() {
  return (await request('/app/privacy')).data.md;
}

export async function setUserPrivacy(md: string) {
  return await request('/admin/app/set-privacy', { data: { md } });
}
