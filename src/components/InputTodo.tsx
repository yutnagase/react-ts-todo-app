// import React from "react";
import { Priority, PRIORITY_LEVELS } from "../constants/PriorityLevels";

interface InputTodoProps {
  todoText: string;
  todoDueDate: string;
  todoPriority: Priority;
  onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDueDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePriority: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick: () => void;
  disabled: boolean;
  isEditing: boolean;
}

const InputTodo = ({
  todoText,
  todoDueDate,
  todoPriority,
  onChangeText,
  onChangeDueDate,
  onChangePriority,
  onClick,
  disabled,
  isEditing,
}: InputTodoProps) => (
  <div className="input-area">
    <input
      type="text"
      placeholder="Enter a task"
      value={todoText}
      onChange={onChangeText}
      disabled={disabled}
    />
    <input
      type="date"
      value={todoDueDate}
      onChange={onChangeDueDate}
      disabled={disabled}
    />
    <select
      value={todoPriority}
      onChange={onChangePriority}
      disabled={disabled}
    >
      <option value={PRIORITY_LEVELS.HIGH}>High</option>
      <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
      <option value={PRIORITY_LEVELS.LOW}>Low</option>
    </select>
    <button onClick={onClick} disabled={disabled}>
      Add
    </button>
  </div>
);

export { InputTodo };
