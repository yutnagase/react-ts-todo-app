import "../css/EditTodoModal.css";
import React, { ChangeEvent } from "react";

import { TodoType } from "../types/TodoType";
import { Priority, PRIORITY_LEVELS } from "../constants/PriorityLevels";

interface EditTodoModalProps {
  isOpen: boolean;
  todoText: string;
  todoDueDate: string;
  todoPriority: Priority;
  onChangeText: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDueDate: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePriority: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSave: () => void;
  onClose: () => void;
}

const EditTodoModal = (props: EditTodoModalProps) => {
  const {
    isOpen,
    todoText,
    todoDueDate,
    todoPriority,
    onChangeText,
    onChangeDueDate,
    onChangePriority,
    onSave,
    onClose,
  } = props;
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit TODO</h2>
        <input type="text" value={todoText} onChange={onChangeText} />
        <input type="date" value={todoDueDate} onChange={onChangeDueDate} />
        <select value={todoPriority} onChange={onChangePriority}>
          <option value={PRIORITY_LEVELS.HIGH}>{PRIORITY_LEVELS.HIGH}</option>
          <option value={PRIORITY_LEVELS.MEDIUM}>
            {PRIORITY_LEVELS.MEDIUM}
          </option>
          <option value={PRIORITY_LEVELS.LOW}>{PRIORITY_LEVELS.LOW}</option>
        </select>
        <div className="modal-buttons">
          <button onClick={onSave}>保存</button>
          <button onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export { EditTodoModal };
