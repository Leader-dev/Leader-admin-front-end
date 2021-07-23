import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const { ENV_NAME } = process.env;

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '麟者管理后台' + (!ENV_NAME || ENV_NAME === '' ? '' : `（${ENV_NAME}）`),
  pwa: true,
  logo: '/logo_640.png',
  iconfontUrl: '',
};

export default Settings;
