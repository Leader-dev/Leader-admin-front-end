import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  deleteType,
  getOrganizationTypes,
  moveDownType,
  moveUpType,
  saveType,
} from '@/services/org';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const moveItem = async (record: any, action: any, call: any) => {
    const close = message.loading('正在移动');
    const { code } = await call(record.id);
    close();
    if (code === 200) {
      action?.reload();
      message.success('移动成功');
    } else {
      message.error('移动失败');
    }
  };

  const columns: ProColumns[] = [
    {
      title: '社团类型名称',
      dataIndex: 'name',
    },
    {
      title: '社团类型别称',
      dataIndex: 'alias',
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
        <a
          key="editable"
          onClick={async () => {
            await moveItem(record, action, moveUpType);
          }}
        >
          上移
        </a>,
        <a
          key="editable"
          onClick={async () => {
            await moveItem(record, action, moveDownType);
          }}
        >
          下移
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={'社团类型列表'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        editable={{
          type: 'single',
          onSave: async (_, row) => {
            const { code } = await saveType(row);
            if (code === 200) {
              message.success('编辑类型成功');
            } else {
              message.success('编辑类型失败');
            }
          },
          onDelete: async (id) => {
            const { code } = await deleteType(id);
            if (code === 200) {
              message.success('删除类型成功');
            } else {
              message.success('删除类型失败');
            }
          },
          actionRender: (row, config, dom) => [dom.save, dom.delete, dom.cancel],
        }}
        request={async () => {
          const list = await getOrganizationTypes();
          return {
            data: list,
            success: true,
          };
        }}
        columns={columns}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => actionRef.current?.addEditRecord({})}
          >
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default TableList;
