import ProForm, { ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { message } from 'antd';
import { getUserAgreement, getUserPrivacy, setUserAgreement, setUserPrivacy } from '@/services/app';
import ProCard from '@ant-design/pro-card';
import { useState } from 'react';

const SingleTextFieldForm = ({ onRequest, onSubmit }: any) => {
  return (
    <ProForm
      request={async () => {
        return { md: await onRequest() };
      }}
      onFinish={async (values) => {
        onSubmit(values.md);
        message.success('修改成功');
      }}
    >
      <ProFormTextArea width="xl" name="md" />
    </ProForm>
  );
};

export default () => {
  const [key, setKey] = useState('agreement');
  return (
    <PageContainer>
      <ProCard
        tabs={{
          tabPosition: 'top',
          activeKey: key,
          onChange: setKey,
        }}
      >
        <ProCard.TabPane key="agreement" tab="用户协定">
          <SingleTextFieldForm onRequest={getUserAgreement} onSubmit={setUserAgreement} />
        </ProCard.TabPane>
        <ProCard.TabPane key="privacy" tab="隐私协定">
          <SingleTextFieldForm onRequest={getUserPrivacy} onSubmit={setUserPrivacy} />
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  );
};
