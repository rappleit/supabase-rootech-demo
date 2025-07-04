import React, { useEffect, useState } from 'react';
import { Row, Col, message } from 'antd';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });

      if (error) throw error;

      setTasks(data || []);
    } catch (error) {
      message.error(error.message || 'Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={24}>
        <Col span={8}>
          <TaskForm onTaskCreated={fetchTasks} />
        </Col>
        <Col span={16}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '20px' }}>Your Tasks</h2>
            {tasks.map(task => (
              <TaskCard 
                key={task.id}
                title={task.title}
                description={task.description}
                dueDate={task.due_date}
                status={task.status}
              />
            ))}
            {!loading && tasks.length === 0 && (
              <p style={{ textAlign: 'center', color: '#999' }}>
                No tasks found. Create your first task!
              </p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Tasks; 