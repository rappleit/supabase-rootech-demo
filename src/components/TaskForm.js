import React from 'react';
import { Card, Form, Input, Button, DatePicker, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const TaskForm = () => {
  return (
    <Card title="Create New Task" style={{ height: '100%' }}>
      <Form layout="vertical">
        <Form.Item
          name="title"
          label="Task Title"
          rules={[{ required: true, message: 'Please input the task title!' }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the task description!' }]}
        >
          <TextArea 
            placeholder="Enter task description" 
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: 'Please select the due date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select the task status!' }]}
          initialValue="TODO"
        >
          <Select>
            <Option value="TODO">To Do</Option>
            <Option value="IN_PROGRESS">In Progress</Option>
            <Option value="COMPLETED">Completed</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm; 