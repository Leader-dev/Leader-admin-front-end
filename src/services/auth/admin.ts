import { request } from 'umi';
import { JSEncrypt } from 'jsencrypt';

async function getKey() {
  return await request('/admin/key');
}

async function encryptPassword(password: string) {
  const { publicKey } = await getKey();
  const encrypt = new JSEncrypt({});
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(password);
}

export async function login(username: string, password: string) {
  return await request('/admin/login', {
    data: {
      username,
      password: await encryptPassword(password),
    },
  });
}

export async function changePassword(password: string) {
  return await request('/admin/change-password', {
    data: {
      password: await encryptPassword(password),
    },
  });
}

export async function info() {
  return await request('/admin/info');
}

export async function logout() {
  return await request('/admin/logout');
}
