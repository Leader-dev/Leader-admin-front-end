import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, message, Button } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { changePassword } from '@/services/auth/admin';

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'比数据库后台更友好美观的管理后台，已经发布。'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        所谓管理后台，关键是管理后台需要如何写。从这个角度来看，生活中，若管理后台出现了，我们就不得不考虑它出现了的事实。
        问题的关键究竟为何？我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。
        管理后台，发生了会如何，不发生又会如何。每个人都不得不面对这些问题。在面对这种问题时，了解清楚管理后台到底是一种怎么样的存在，是解决一切问题的关键。
        管理后台因何而发生？在这种困难的抉择下，本人思来想去，寝食难安。我们不得不面对一个非常尴尬的事实，那就是，管理后台的发生，到底需要如何做到，
        不管理后台的发生，又会如何产生。一般来说，可是，即使是这样，管理后台的出现仍然代表了一定的意义。对我个人而言，管理后台不仅仅是一个重大的事件，还可能会改变我的人生。
      </Card>
      <Card style={{ marginTop: '20px' }} title={'管理员账号安全'}>
        <ProForm
          initialValues={{
            password: '',
          }}
          onFinish={async (value) => {
            const { code } = await changePassword(value.password);
            if (code === 200) {
              message.success('重设密码成功');
            } else {
              message.error('重设密码失败');
            }
          }}
        >
          <ProFormText.Password
            width="md"
            name="password"
            placeholder="密码"
            label="重新设置登陆密码"
          />
        </ProForm>
      </Card>
      <Card style={{ marginTop: '20px' }} title={'页面装饰'}>
        <Alert
          message={'看板娘的显示受第三方资源环境的影响，可能会有延迟。'}
          type="info"
          showIcon
          banner
          style={{
            marginBottom: 18,
          }}
        />
        {localStorage.getItem('signboard') === 'true' ? (
          <Button
            onClick={() => {
              localStorage.setItem('signboard', 'false');
              window.location.reload();
            }}
          >
            停用看板娘
          </Button>
        ) : (
          <Button
            onClick={() => {
              localStorage.setItem('signboard', 'true');
              window.location.reload();
            }}
          >
            启用看板娘
          </Button>
        )}
      </Card>
    </PageContainer>
  );
};
