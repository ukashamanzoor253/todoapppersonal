import React, { useState, useEffect } from "react";
import "./index.css"; // Import CSS for blinking effect

const TodoApp = () => {
  // Initialize state from localStorage
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    return storedTasks || [];
  });
  const [taskInput, setTaskInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false); // State to control blinking

  // Update localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks"); // Clear localStorage when no tasks remain
    }
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim()) return;

    // Check if the task already exists
    const taskExists = tasks.some(
      (task) => task.text.toLowerCase() === taskInput.toLowerCase()
    );
    if (taskExists) {
      alert("Task already exists!");
      return;
    }

    setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
    setTaskInput("");
    setIsBlinking(true); // Trigger blinking effect

    // Remove blinking effect after a short delay
    setTimeout(() => {
      setIsBlinking(false);
    }, 1000);
  };

  const updateTask = () => {
    if (!taskInput.trim()) return;
    setTasks(
      tasks.map((task) =>
        task.id === editingTask ? { ...task, text: taskInput } : task
      )
    );
    setTaskInput("");
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setTaskInput(task.text);
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchInput.toLowerCase())
  );

  const completedTasks = filteredTasks.filter((task) => task.completed);
  const incompleteTasks = filteredTasks.filter((task) => !task.completed);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editingTask) {
        updateTask();
      } else {
        addTask();
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        background: "#293b46",
        color: "white",
      }}
    >
      <h1>Car Detailing Areas List</h1>

      <input
        type="text"
        placeholder="Search Area..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <input
        type="text"
        placeholder="Enter Area..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className={isBlinking ? "blinking" : ""}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <button
        onClick={editingTask ? updateTask : addTask}
        style={{
          width: "30%",
          marginBottom: "10px",
          padding: "8px",
          background: "#6666ff",
          color: "white",
          border: "1px solid",
          borderRadius: "27px",
        }}
      >
        {editingTask ? "Update Area" : "Add Area"}
      </button>

      <h2 style={{ fontSize: "13px" }}>Areas Available</h2>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {incompleteTasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
              border: "1px solid white",
              padding: "9px",
              backgroundColor: task.completed ? "#d3f8d3" : "transparent",
              cursor: "pointer",
            }}
            onClick={() => toggleTaskCompletion(task.id)} // Toggle completion on click
          >
            <span>{task.text}</span>
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering toggle
                  startEditing(task);
                }}
                style={{ marginRight: "5px" }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering toggle
                  deleteTask(task.id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 style={{ fontSize: "13px" }}>Areas Coverd</h2>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {completedTasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
              border: "1px solid white",
              padding: "9px",
              backgroundColor: task.completed ? "#d3f8d3" : "transparent",
              color: task.completed ? "black" : "white",
              cursor: "pointer",
            }}
            onClick={() => toggleTaskCompletion(task.id)} // Toggle completion on click
          >
            <span>{task.text}</span>
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering toggle
                  startEditing(task);
                }}
                style={{ marginRight: "5px" }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering toggle
                  deleteTask(task.id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
