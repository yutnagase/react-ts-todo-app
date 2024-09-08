// import React from "react";

import { TodoType } from "../types/TodoType";
import { Priority, PRIORITY_LEVELS } from "../constants/PriorityLevels";

interface IncompleteTodosProps {
  todos: TodoType[];
  onClickComplete: (index: number) => void;
  onClickRemove: (index: number) => void;
  onClickEdit: (todo: TodoType) => void;
}

const IncompleteTodos = (props: IncompleteTodosProps) => {
  const { todos, onClickComplete, onClickRemove, onClickEdit } = props;

  const getPriorityClass = (priority: Priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.HIGH:
        return "priority-high";
      case PRIORITY_LEVELS.MEDIUM:
        return "priority-medium";
      case PRIORITY_LEVELS.LOW:
        return "priority-low";
      default:
        return "";
    }
  };

  return (
    <div className="todo-area">
      <p className="title">Incomplete Tasks</p>
      <ul>
        {todos.map((todo: TodoType, index: number) => (
          <li key={todo.id} className="todo-item">
            <span className={`priority ${getPriorityClass(todo.priority)}`}>
              {todo.priority}
            </span>
            <p>{todo.text}</p>
            {todo.dueDate && <span className="due-date">{todo.dueDate}</span>}
            <button className="complete" onClick={() => onClickComplete(index)}>
              Complete
            </button>
            <button className="edit" onClick={() => onClickEdit(todo)}>
              Edit
            </button>
            <button className="remove" onClick={() => onClickRemove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { IncompleteTodos };
