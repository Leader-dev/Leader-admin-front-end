import { Image } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

export default ({ width, url }: { width: number; url: string }) => {
  const { initialState } = useModel('@@initialState');

  const start = initialState?.accessStartUrl || '';
  return <Image width={width} src={start + url} />;
};
