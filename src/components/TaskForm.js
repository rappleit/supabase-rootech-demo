import React, { useState } from 'react';
import { Card, Form, Input, Button, DatePicker, Select, message } from 'antd';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/AuthContext';

const { TextArea } = Input;
const { Option } = Select;

const TaskForm = ({ onTaskCreated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (values) => {
    if (!user) {
      message.error('You must be logged in to create tasks');
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('tasks')
        .insert([
          {
            title: values.title,
            description: values.description,
            due_date: values.dueDate.toISOString(),
            status: values.status,
            user_id: user.id,
          }
        ]);

      if (error) throw error;

      message.success('Task created successfully!');
      form.resetFields();
      onTaskCreated?.();
    } catch (error) {
      message.error(error.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create New Task" style={{ height: '100%' }}>
      <Form 
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
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
          <Button 
            type="primary" 
            htmlType="submit" 
            block
            loading={loading}
          >
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm; 