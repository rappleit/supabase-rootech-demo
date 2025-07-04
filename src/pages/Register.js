import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { error } = await signUp(values.email, values.password);
      if (error) throw error;
      message.success('Registration successful! Please check your email to verify your account.');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, padding: '20px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>Register</Title>
        <Form 
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username" 
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            Already have an account? <Link to="/login">Login now!</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register; 