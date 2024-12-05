import React, { useState, useEffect } from "react";
import "./index.css"; // Import CSS for blinking effect

const TodoApp = () => {
  const defaultData = [
    {
      category: "Car detailing",
      items: [
        { id: 1, text: "(Atlanta GA)", completed: false },
        { id: 2, text: "(Columbia SC)", completed: false },
        { id: 3, text: "(Boston MA)", completed: false },
        { id: 4, text: "(Chicago IL)", completed: false },
        { id: 5, text: "(Dallas TX)", completed: false },
        { id: 6, text: "(Austin TX)", completed: false },
        { id: 7, text: "(San Antonio TX)", completed: false },
        { id: 8, text: "(Las Vegas NV)", completed: false },
        { id: 9, text: "(Bakersfield CA)", completed: false },
        { id: 10, text: "(Los Angeles CA)", completed: false },
        { id: 11, text: "(San Diego CA)", completed: false },
        { id: 12, text: "(Sacramento CA)", completed: false },
        { id: 13, text: "(Oklahoma City OK)", completed: false },
        { id: 14, text: "(Vacaville CA)", completed: false },
        { id: 15, text: "(Kennewick WA)", completed: false },
        { id: 16, text: "(Spokane WA)", completed: false },
        { id: 17, text: "(Phoenix AZ)", completed: false },
        { id: 18, text: "(Tallahassee FL)", completed: false },
      ],
    },
    {
      category: "Car Detailing Services Areas",
      items: [
        { id: 19, text: "Little Rock Arkansas (50 Miles)", completed: false },
        { id: 20, text: "Cloverdale California (50 Miles)", completed: false },
        { id: 21, text: "Sacramento California (70 Miles)", completed: false },
        { id: 22, text: "San Jose California (70 Miles)", completed: false },
        { id: 23, text: "Bakersfield California (70 Miles)", completed: false },
        {
          id: 24,
          text: "San Bernardino California (70 Miles)",
          completed: false,
        },
        {
          id: 25,
          text: "Cathedral City California (70 Miles)",
          completed: false,
        },
        { id: 26, text: "San Diego California (70 Miles)", completed: false },
        { id: 27, text: "Fayetteville, NC (50 Miles)", completed: false },
        { id: 28, text: "Denver Colorado (50 Miles)", completed: false },
        { id: 29, text: "Salt Lake City Utah (50 Miles)", completed: false },
        { id: 30, text: "Tallahassee FL (50 Miles)", completed: false },
        { id: 31, text: "Atlanta GA (50 Miles)", completed: false },
        { id: 32, text: "Columbia SC (50 Miles)", completed: false },
        { id: 33, text: "Charlotte NC (50 Miles)", completed: false },
        { id: 34, text: "Norfolk VA (50 Miles)", completed: false },
        { id: 35, text: "Virginia Beach VA (50 Miles)", completed: false },
        { id: 36, text: "Springfield MA (50 Miles)", completed: false },
        { id: 37, text: "New Haven CT (50 Miles)", completed: false },
        { id: 38, text: "Boston MA (50 Miles)", completed: false },
        { id: 39, text: "New Brunswick NJ (50 Miles)", completed: false },
        { id: 40, text: "New Ramsey NJ (50 Miles)", completed: false },
      ],
    },
    {
      category: "Technicians Without Water & Power",
      items: [
        { id: 59, text: "(Tallahassee FL)", completed: false },
        { id: 60, text: "(San Antonio TX)", completed: false },
        { id: 61, text: "(Columbia SC)", completed: false },
        { id: 62, text: "(Charlotte NC)", completed: false },
        { id: 63, text: "(Atlanta GA)", completed: false },
        { id: 64, text: "(Bakersfield CA)", completed: false },
        { id: 65, text: "(Las Vegas NV)", completed: false },
      ],
    },
    {
      category: "House Cleaning Services Areas",
      items: [
        {
          id: 66,
          text: " North Attleborough, MA (60 Miles)",
          completed: false,
        },
        { id: 67, text: "Toledo Ohio (70 miles)", completed: false },
        { id: 68, text: "San Francisco, CA (60 Miles)", completed: false },
        { id: 69, text: "San Bernardino CA (70 Miles )", completed: false },
        { id: 70, text: "Nashville TN (60 miles)", completed: false },
      ],
    },
  ];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : defaultData;
  });
  const [taskInput, setTaskInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  const addTask = (categoryIndex) => {
    if (!taskInput.trim()) return;

    const taskExists = tasks[categoryIndex].items.some(
      (task) => task.text.toLowerCase() === taskInput.toLowerCase()
    );
    if (taskExists) {
      alert("Task already exists!");
      return;
    }

    const newTask = { id: Date.now(), text: taskInput, completed: false };
    const updatedTasks = [...tasks];
    updatedTasks[categoryIndex].items.push(newTask);
    setTasks(updatedTasks);

    setTaskInput("");
    setIsBlinking(true);

    setTimeout(() => {
      setIsBlinking(false);
    }, 1000);
  };

  const updateTask = (categoryIndex, taskId) => {
    if (!taskInput.trim()) return;

    const updatedTasks = [...tasks];
    updatedTasks[categoryIndex].items = updatedTasks[categoryIndex].items.map(
      (task) => (task.id === taskId ? { ...task, text: taskInput } : task)
    );
    setTasks(updatedTasks);
    setTaskInput("");
    setEditingTask(null);
  };

 

  const toggleTaskCompletion = (categoryIndex, taskId) => {
    const updatedTasks = [...tasks];
    updatedTasks[categoryIndex].items = updatedTasks[categoryIndex].items.map(
      (task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setTaskInput(task.text);
  };

  const filteredTasks = (categoryIndex) =>
    tasks[categoryIndex].items.filter((task) =>
      task.text.toLowerCase().includes(searchInput.toLowerCase())
    );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editingTask) {
        updateTask(editingTask.categoryIndex, editingTask.id);
      } else {
        addTask(editingTask.categoryIndex);
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

      {tasks.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h2>{category.category}</h2>
          <button
            onClick={() => addTask(categoryIndex)}
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "8px",
              background: "#6666ff",
              color: "white",
              border: "1px solid",
              borderRadius: "27px",
            }}
          >
            Add Area
          </button>

          <ul style={{ listStyle: "none", padding: "0" }}>
  {filteredTasks(categoryIndex).map((task) => (
    <li
      key={task.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        background: task.completed ? "#55d955" : "#888",
        border: "1px solid #444",
        marginBottom: "5px",
        cursor: "pointer",
      }}
      onClick={() => toggleTaskCompletion(categoryIndex, task.id)}
    >
      <span>{task.text}</span>
      <button
        style={{ marginLeft: "auto" }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering task completion
          startEditing(task);
        }}
      >
        Edit
      </button>
    </li>
  ))}
</ul>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
