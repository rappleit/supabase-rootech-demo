import React from 'react';
import { Card, Tag, Space, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const getStatusColor = (status) => {
  const colors = {
    TODO: 'default',
    IN_PROGRESS: 'processing',
    COMPLETED: 'success',
  };
  return colors[status] || 'default';
};

const getStatusText = (status) => {
  const text = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
  };
  return text[status] || status;
};

const TaskCard = ({ title, description, dueDate, status = 'TODO' }) => {
  return (
    <Card
      style={{ marginBottom: 16 }}
      extra={
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong style={{ fontSize: 16 }}>{title || 'Task Title'}</Text>
        <Paragraph ellipsis={{ rows: 2 }}>
          {description || 'Task description goes here. This is a sample task description to show how it would look in the card.'}
        </Paragraph>
        <Space>
          <CalendarOutlined />
          <Text type="secondary">{dueDate || 'Due Date'}</Text>
        </Space>
      </Space>
    </Card>
  );
};

export default TaskCard; 