import { useState } from "react";
import "./App.css";

function Task(props) {
  return (
    <li className={props.completed ? "completed" : ""}>
      {props.name}
      <div className="task-buttons">
        <button className="complete-btn" onClick={props.onComplete}>
          {props.completed ? "undo" : "completed"}
        </button>
        <button className="delete-btn" onClick={props.onDelete}>
          delete
        </button>
      </div>
    </li>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObject = {
        id: Date.now(),
        name: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <div className="container">
      <h1>To Do App</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="enter new task"
      ></input>
      <button onClick={addTask}>add task</button>
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            name={task.name}
            completed={task.completed}
            onComplete={() => completeTask(task.id)} // Fixed here
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
