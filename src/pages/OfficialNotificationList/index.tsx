import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Form, message, Popconfirm, Tag } from 'antd';
import {
  deleteOfficialNotification,
  getOfficialNotificationDetail,
  getOfficialNotifications,
  getUserInfo,
  sendOfficialNotification,
  updateOfficialNotification,
} from '@/services/user';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/lib/upload/interface';
import OSSImage from '@/components/OSSImage';

type NotificationDetailProps = {
  toAll?: boolean;
  notificationId?: string;
  visible: boolean;
  onClose: (updated: boolean) => void;
};

const NotificationDetail = ({
  toAll,
  notificationId,
  visible,
  onClose,
}: NotificationDetailProps) => {
  const canEditReceiver = notificationId ? notificationId.length === 0 : true;
  return (
    <ModalForm<{
      id?: string;
      toAll: boolean;
      uid?: string;
      userId?: string;
      userInfo?: any;
      title?: string;
      content?: string;
      cover?: UploadFile;
      coverUrl?: string;
    }>
      initialValues={{
        toAll: toAll ?? false,
      }}
      title={notificationId ? '通知详情' : '发送通知'}
      visible={visible}
      modalProps={{
        onCancel: () => onClose(false),
      }}
      onFinish={async (values) => {
        let response;
        if (notificationId) {
          response = await updateOfficialNotification({ ...values, notificationId });
        } else {
          response = await sendOfficialNotification(values);
        }
        if (response.code === 200) {
          onClose(true);
        }
      }}
      params={{ notificationId, r: Math.random() }}
      request={async ({ notificationId: notifId }) => {
        if (!notifId || notifId === '') {
          return {};
        }
        const detail = await getOfficialNotificationDetail(notifId);
        detail.uid = detail.userInfo?.uid;
        return detail;
      }}
    >
      <ProFormCheckbox name="toAll" disabled={!canEditReceiver}>
        发送给所有用户
      </ProFormCheckbox>
      <Form.Item noStyle shouldUpdate>
        {(form) => {
          const userInfo = form.getFieldValue('userInfo');
          if (form.getFieldValue('toAll')) {
            return null;
          }
          return (
            <ProFormText
              disabled={!canEditReceiver}
              width="xl"
              name="uid"
              label={
                <>
                  用户 UID
                  {userInfo ? (
                    <Tag style={{ marginLeft: 6 }} color="blue">
                      {userInfo.nickname} {userInfo.uid}
                    </Tag>
                  ) : null}
                </>
              }
              placeholder="请输入目标用户 UID"
              rules={[
                {
                  required: true,
                  message: '请输入目标用户 UID',
                },
                {
                  validator: async (rule, value) => {
                    form.setFieldsValue({ userInfo: null });
                    if (notificationId || !value) {
                      return;
                    }
                    const info = await getUserInfo(value);
                    if (info) {
                      form.setFieldsValue({ userInfo: info });
                      return;
                    }
                    throw Error('用户不存在');
                  },
                },
              ]}
            />
          );
        }}
      </Form.Item>
      <ProFormText
        width="xl"
        name="title"
        label="通知标题"
        placeholder="请输入标题"
        rules={[
          {
            required: true,
            message: '请输入标题',
          },
        ]}
      />
      <ProFormTextArea
        width="xl"
        name="content"
        label="通知内容"
        placeholder="请输入内容"
        rules={[
          {
            required: true,
            message: '请输入内容',
          },
        ]}
      />
      <ProFormDependency name={['cover', 'coverUrl']}>
        {({ cover, coverUrl }) => {
          if (cover || !coverUrl) {
            return null;
          }
          return <OSSImage url={coverUrl} width={500} />;
        }}
      </ProFormDependency>
      <ProFormUploadDragger
        max={1}
        width="xl"
        label={notificationId ? '替换封面图片' : '封面图片'}
        name="cover"
      />
    </ModalForm>
  );
};

const TableList: React.FC = () => {
  const [notificationId, setNotificationId] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState<any>('all');
  const actionRef = useRef<ActionType>();

  const columns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: '通知 ObjectId',
      copyable: true,
      ellipsis: true,
      width: '300px',
    },
    {
      title: '接收者',
      render: (_, row) => {
        if (row.toAll) {
          return <Tag color="orange">所有用户</Tag>;
        }
        return (
          <Tag color="blue">
            {row.userInfo.nickname} {row.userInfo.uid}
          </Tag>
        );
      },
    },
    {
      title: '通知标题',
      dataIndex: 'title',
    },
    {
      title: '发送日期',
      dataIndex: 'sendDate',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, row) => [
        <a
          onClick={() => {
            setNotificationId(row.id);
          }}
        >
          查看详情
        </a>,
        <Popconfirm
          title="是否确认删除通知？此操作不可插销"
          onConfirm={async () => {
            const close = message.loading('正在删除');
            await deleteOfficialNotification(row.id);
            close();
            message.success('删除成功');
            actionRef.current?.reload();
          }}
          okText="确认"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: selectedFilter,
            onChange: setSelectedFilter,
            items: [
              {
                key: 'all',
                label: '全部通知',
              },
              {
                key: 'to-one',
                label: '对个人通知',
              },
              {
                key: 'to-all',
                label: '群发通知',
              },
            ],
          },
          actions: [
            <Button key="primary" type="primary" onClick={() => setNotificationId('')}>
              <PlusOutlined />
              发送通知
            </Button>,
          ],
        }}
        params={{ filter: selectedFilter }}
        request={async ({ filter }) => {
          let query;
          switch (filter) {
            case 'to-one':
              query = { toAll: false };
              break;
            case 'to-all':
              query = { toAll: true };
              break;
            default:
              query = {};
          }
          const list = await getOfficialNotifications(query);
          return {
            data: list,
            success: true,
          };
        }}
        columns={columns}
      />
      <NotificationDetail
        toAll={selectedFilter === 'to-all'}
        notificationId={notificationId}
        visible={notificationId != null}
        onClose={(updated) => {
          setNotificationId(null);
          if (updated) {
            actionRef.current?.reload();
          }
        }}
      />
    </PageContainer>
  );
};

export default TableList;
