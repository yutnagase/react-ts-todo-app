import { useState, useEffect } from "react";
import axios from "axios";
import "./css/Todo.css";

import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import { EditTodoModal } from "./components/EditTodoModal";
import { PRIORITY_LEVELS, Priority } from "./constants/PriorityLevels";
import { TodoType } from "./types/TodoType";

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [todoDueDate, setTodoDueDate] = useState("");
  const [todoPriority, setTodoPriority] = useState<Priority>(
    PRIORITY_LEVELS.MEDIUM
  );
  const [incompleteTodos, setIncompleteTodos] = useState<TodoType[]>([]);
  const [completeTodos, setCompleteTodos] = useState<TodoType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodoText, setEditTodoText] = useState("");
  const [editTodoDueDate, setEditTodoDueDate] = useState("");
  const [editTodoPriority, setEditTodoPriority] = useState<Priority>(
    PRIORITY_LEVELS.MEDIUM
  );

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todos");
      const todos: TodoType[] = response.data;
      setIncompleteTodos(todos.filter((todo) => !todo.completed));
      setCompleteTodos(todos.filter((todo) => todo.completed));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!todoText.trim()) return;
    const newTodo: Omit<TodoType, "id"> = {
      text: todoText,
      dueDate: todoDueDate,
      priority: todoPriority,
      completed: false,
    };
    try {
      await axios.post("http://localhost:8000/todos", newTodo);
      setTodoText("");
      setTodoDueDate("");
      setTodoPriority(PRIORITY_LEVELS.MEDIUM);
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async () => {
    if (!editTodoText.trim() || !currentTodo) return;
    const updatedTodo: TodoType = {
      ...currentTodo,
      text: editTodoText,
      dueDate: editTodoDueDate,
      priority: editTodoPriority,
    };
    try {
      await axios.put(
        `http://localhost:8000/todos/${currentTodo.id}`,
        updatedTodo
      );
      setEditTodoText("");
      setEditTodoDueDate("");
      setEditTodoPriority(PRIORITY_LEVELS.MEDIUM);
      setIsEditing(false);
      setCurrentTodo(null);
      setIsModalOpen(false);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const completeTodo = async (index: number) => {
    const todo = incompleteTodos[index];
    const updatedTodo: TodoType = { ...todo, completed: true };
    try {
      await axios.put(`http://localhost:8000/todos/${todo.id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  const removeTodo = async (index: number, completed = false) => {
    const todo = completed ? completeTodos[index] : incompleteTodos[index];
    try {
      await axios.delete(`http://localhost:8000/todos/${todo.id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const backToIncomplete = async (index: number) => {
    const todo = completeTodos[index];
    const updatedTodo: TodoType = { ...todo, completed: false };
    try {
      await axios.put(`http://localhost:8000/todos/${todo.id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error moving todo back to incomplete:", error);
    }
  };

  const editTodo = (todo: TodoType) => {
    setEditTodoText(todo.text);
    setEditTodoDueDate(todo.dueDate);
    setEditTodoPriority(todo.priority);
    setIsEditing(true);
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <div className="todo-container">
      <h1 className="apptitle">To-Do List</h1>
      <InputTodo
        todoText={todoText}
        todoDueDate={todoDueDate}
        todoPriority={todoPriority}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodoText(e.target.value)
        }
        onChangeDueDate={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodoDueDate(e.target.value)
        }
        onChangePriority={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setTodoPriority(e.target.value as Priority)
        }
        onClick={isEditing ? updateTodo : addTodo}
        disabled={isMaxLimitIncompleteTodos}
        isEditing={isEditing}
      />
      {isMaxLimitIncompleteTodos && (
        <p style={{ color: "red" }}>登録できるTODOは5個までです。</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={completeTodo}
        onClickRemove={removeTodo}
        onClickEdit={editTodo}
      />
      <CompleteTodos
        todos={completeTodos}
        onClick={backToIncomplete}
        onClickEdit={editTodo}
      />
      <EditTodoModal
        isOpen={isModalOpen}
        todoText={editTodoText}
        todoDueDate={editTodoDueDate}
        todoPriority={editTodoPriority}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEditTodoText(e.target.value)
        }
        onChangeDueDate={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEditTodoDueDate(e.target.value)
        }
        onChangePriority={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setEditTodoPriority(e.target.value as Priority)
        }
        onSave={updateTodo}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
