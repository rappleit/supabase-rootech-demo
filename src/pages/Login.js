import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { error } = await signIn(values.email, values.password);
      if (error) throw error;
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
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>Login</Title>
        <Form 
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
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
              Log in
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            Don't have an account? <Link to="/register">Register now!</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 