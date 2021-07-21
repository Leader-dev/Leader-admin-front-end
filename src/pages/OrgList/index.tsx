import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getOrganizationList, updateOrganization } from '@/services/org';
import { message } from 'antd';

const TableList: React.FC = () => {
  const columns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: '社团组织 ObjectId',
      copyable: true,
      ellipsis: true,
      editable: false,
      width: '300px',
    },
    {
      title: '数字 ID',
      dataIndex: 'numberId',
      tip: '社团组织数字 ID',
      editable: false,
      copyable: true,
    },
    {
      title: '社团名称',
      dataIndex: 'name',
      editable: false,
    },
    {
      title: '负责人',
      dataIndex: 'presidentName',
      editable: false,
    },
    {
      title: '院校',
      dataIndex: 'institute',
      editable: false,
    },
    {
      title: '社团认证',
      dataIndex: 'instituteAuth',
      valueEnum: {
        none: {
          text: '无认证',
          status: 'Default',
        },
        official: {
          text: '官方认证',
          status: 'Success',
        },
        self: {
          text: '自主认证',
          status: 'Processing',
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        pending: {
          text: '待审核',
          status: 'Default',
        },
        running: {
          text: '运行中',
          status: 'Success',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={'社团组织列表'}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        editable={{
          type: 'single',
          onSave: async (_, row) => {
            const { code } = await updateOrganization(row);
            if (code === 200) {
              message.success('状态修改成功');
            } else {
              message.success('状态修改失败');
            }
          },
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
        request={async () => {
          const list = await getOrganizationList();
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
