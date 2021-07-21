import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getUserList } from '@/services/user';

const TableList: React.FC = () => {
  const columns: ProColumns<API.RuleListItem>[] = [
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
      renderText: (text) => {
        return `${text.substr(0, 3)}****${text.substr(7, 4)}`;
      },
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
