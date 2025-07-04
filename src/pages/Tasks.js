import React from 'react';
import { Row, Col } from 'antd';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={24}>
        <Col span={8}>
          <TaskForm />
        </Col>
        <Col span={16}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '20px' }}>Your Tasks</h2>
            {/* Sample tasks - these would normally come from your backend */}
            <TaskCard 
              title="Complete Project Documentation"
              description="Write comprehensive documentation for the new features implemented in the project."
              dueDate="2024-03-20"
              status="IN_PROGRESS"
            />
            <TaskCard 
              title="Review Pull Requests"
              description="Review and provide feedback on pending pull requests from the team."
              dueDate="2024-03-18"
              status="TODO"
            />
            <TaskCard 
              title="Setup Testing Environment"
              description="Configure and setup the testing environment for the new microservice."
              dueDate="2024-03-22"
              status="COMPLETED"
            />
          
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Tasks; 