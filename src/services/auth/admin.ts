import { request } from 'umi';
import { JSEncrypt } from 'jsencrypt';

async function getKey() {
  return await request('/key');
}

async function encryptPassword(password: string) {
  const { publicKey } = await getKey();
  const encrypt = new JSEncrypt({});
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(password);
}

export async function login(username: string, password: string) {
  return await request('/login', {
    data: {
      username,
      password: await encryptPassword(password),
    },
  });
}

export async function changePassword(password: string) {
  return await request('/change-password', {
    data: {
      password: await encryptPassword(password),
    },
  });
}

export async function info() {
  return await request('/info');
}

export async function logout() {
  return await request('/logout');
}
