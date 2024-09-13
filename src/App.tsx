  import { Header } from './components/Header';
  import { MainHeader } from './components/MainHeader';
  import { List } from './components/List';
  import { Task } from './components/Task';

  import { useEffect, useState } from 'react';
  import './App.css';

  export function App() {
    const [tasks, setTasks] = useState<string[]>(() => {
      const storedTasks = localStorage.getItem("@ToDo:tasks");
      return storedTasks ? JSON.parse(storedTasks) : []
    });
    const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
      const storedCompletedTasks = localStorage.getItem("@ToDo:completedTasks");
      return storedCompletedTasks ? JSON.parse(storedCompletedTasks): [];
    });
    const [filteredTasks, setFilteredTasks] = useState<string[]>(tasks);

    function handleDeleteTask(taskToDelete: string){
      const tasksWithoutDeletedOne = tasks.filter(task => {
        return task !== taskToDelete;
      });

      const tasksCompletedWithoutDeletedOne = completedTasks.filter(task => {
        return task !== taskToDelete;
      })

      setTasks(tasksWithoutDeletedOne);
      setCompletedTasks(tasksCompletedWithoutDeletedOne);
    }

    function handleCheckTask(taskToCheck: string, taskIsChecked: boolean){
      const tasksWithChecked = tasks.find(task => task === taskToCheck)
      
      if(!taskIsChecked){
        const completedTasksWithoutNoCheckedOne = completedTasks.filter(task => task !== taskToCheck);
        setCompletedTasks(completedTasksWithoutNoCheckedOne);
        return;
      }

      if(tasksWithChecked && !completedTasks.includes(taskToCheck)){
        const taskWithoutChecked = tasks.filter(task => task !== taskToCheck);
        setTasks([...taskWithoutChecked, tasksWithChecked]);
        setCompletedTasks([...completedTasks, tasksWithChecked]);
      }
    }

    function showCompletedTasks(){
      setFilteredTasks(completedTasks);
    }

    function showAllTasks(){
      setFilteredTasks(tasks);
    }

    useEffect(() => {
      localStorage.setItem("@ToDo:tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
      localStorage.setItem("@ToDo:completedTasks", JSON.stringify(completedTasks));
    }, [completedTasks]);

    useEffect(() => {
      setFilteredTasks(tasks);
    }, [tasks]);
    
    return (
      <div>
        <Header tasks={tasks} setTasks={setTasks}/>
        <main>
          <MainHeader 
            createdTasks={tasks} 
            completedTasks={completedTasks} 
            showFilteredTasks={showCompletedTasks} 
            showAllTasks={showAllTasks}
          />
          {
            filteredTasks.length > 0 ? 
            <div className="tasks">
              {filteredTasks.map((task) => (
                <Task 
                  key={task} 
                  task={task}
                  isChecked={completedTasks.includes(task)}
                  onDeleteTask={handleDeleteTask} 
                  onCheckTask={handleCheckTask}/>
              ))
            }
            </div> 
            : <List />
          }
        </main>
      </div>
    )
  }