import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getUserList } from '@/services/user';
import { Popover } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

type User = {
  id: string;
  uid: string;
  nickname: string;
  avatarUrl: string;
  phone: string;
  registrationDate: string;
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const copyPhone = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (copied) {
    return <CheckOutlined style={{ color: '#52c41a' }} />;
  }
  return <a onClick={copyPhone}>拷贝</a>;
};

const TableList: React.FC = () => {
  // @ts-ignore
  const columns: ProColumns<User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: '用户 ObjectId',
      copyable: true,
      ellipsis: true,
      width: '300px',
    },
    {
      title: 'UID',
      dataIndex: 'uid',
      tip: '用户数字 ID',
      valueType: 'textarea',
      copyable: true,
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      copyable: true,
      valueType: 'option',
      render: (_, row) => [
        `${row.phone.substr(0, 3)}****${row.phone.substr(7, 4)}`,
        <Popover content={row.phone}>
          <a>显示</a>
        </Popover>,
        <CopyButton text={row.phone} />,
      ],
    },
    {
      title: '注册时间',
      sorter: true,
      dataIndex: 'registrationDate',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [<a>待实现</a>],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={'所有用户'}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async () => {
          const list = await getUserList();
          return {
            data: list,
            success: true,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
