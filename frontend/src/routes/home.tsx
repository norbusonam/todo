import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { ListView } from '../components/list-view';
import { TimeView } from '../components/time-view';
import { useAuth } from '../hooks';
import { useTasks } from '../hooks';

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { tasks, onGetTasks } = useTasks();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const currentTime = new Date();
  const firstName = user && user.name.split(' ')[0];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllTasks = () => {
    setIsLoading(true);
    api
      .getTasks()
      .then(res => {
        onGetTasks(res.data.tasks);
      })
      .catch(() => {
        console.log('Could not get tasks');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <div className="prose">
          <h2>
            {currentTime.getHours() < 12
              ? `☕️ Good morning${firstName ? ', ' + firstName : ''}`
              : currentTime.getHours() >= 12 && currentTime.getHours() <= 17
              ? `☀️ Good afternoon${firstName ? ', ' + firstName : ''}`
              : `🌕 Good evening${firstName ? ', ' + firstName : ''}`}
          </h2>
        </div>
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {tasks && <TimeView tasks={tasks.filter(task => task.due)} />}
      </div>
      <div className="flex justify-center mb-4">
        <div className="prose">
          <h2>Your Lists</h2>
        </div>
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {tasks && <ListView tasks={tasks.filter(task => task.listId)} />}
      </div>
    </div>
  );
};
