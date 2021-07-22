import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { getReportDetail, getReportList } from '@/services/org';
import { Modal } from 'antd';
import { Image } from 'antd';
import OSSImage from '@/components/OSSImage';

const ReportDetail = ({ reportId }: { reportId: any }) => {
  const columns: ProDescriptionsItemProps[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: '举报信息 ObjectId',
    },
    {
      title: '举报社团',
      editable: false,
      renderText: (_, row) => row.orgInfo.name,
    },
    {
      title: '社团数字 ID',
      editable: false,
      renderText: (_, row) => row.orgInfo.numberId,
    },
    {
      title: '举报人',
      editable: false,
      renderText: (_, row) => row.senderUserInfo.nickname,
    },
    {
      title: 'UID',
      editable: false,
      renderText: (_, row) => row.senderUserInfo.uid,
    },
    {
      title: '举报日期',
      dataIndex: 'sendDate',
      editable: false,
      valueType: 'dateTime',
    },
    {
      title: '举报描述',
      dataIndex: 'description',
      editable: false,
    },
    {
      render: (_, row) => {
        let images = [];
        if (row.imageUrls) {
          images = row.imageUrls.map((url: string) => <OSSImage width={100} url={url} />);
        }
        return <Image.PreviewGroup>{images}</Image.PreviewGroup>;
      },
    },
  ];

  return (
    <>
      <ProDescriptions
        column={1}
        columns={columns}
        params={{ reportId }}
        request={async ({ reportId: id }) => {
          if (id == null) {
            return {
              data: {},
              success: true,
            };
          }
          const detail = await getReportDetail(id);
          return {
            data: detail,
            success: true,
          };
        }}
      />
    </>
  );
};

const TableList: React.FC = () => {
  const [reportId, setReportId] = useState(null);

  const columns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: '举报信息 ObjectId',
      copyable: true,
      ellipsis: true,
      editable: false,
      width: '300px',
    },
    {
      title: '举报社团',
      editable: false,
      renderText: (_, row) => row.orgInfo.name,
    },
    {
      title: '社团数字 ID',
      editable: false,
      copyable: true,
      renderText: (_, row) => row.orgInfo.numberId,
    },
    {
      title: '举报人',
      editable: false,
      renderText: (_, row) => row.senderUserInfo.nickname,
    },
    {
      title: 'UID',
      editable: false,
      copyable: true,
      renderText: (_, row) => row.senderUserInfo.uid,
    },
    {
      title: '举报日期',
      dataIndex: 'sendDate',
      editable: false,
      valueType: 'dateTime',
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
      render: (_, row) => [
        <a
          key="editable"
          onClick={() => {
            setReportId(row.id);
          }}
        >
          查看详情
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle={'社团举报'}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async () => {
          const list = await getReportList();
          return {
            data: list,
            success: true,
          };
        }}
        columns={columns}
      />
      <Modal title={'举报详情'} visible={reportId != null} onCancel={() => setReportId(null)}>
        <ReportDetail reportId={reportId} />
      </Modal>
    </PageContainer>
  );
};

export default TableList;
