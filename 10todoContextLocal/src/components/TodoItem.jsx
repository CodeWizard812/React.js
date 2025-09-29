import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import DateTimePicker from 'react-datetime-picker';
import { LuCheck, LuX, LuPencil, LuTrash2 } from "react-icons/lu";

// Import the CSS for the pickers
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';
import 'react-calendar/dist/Calendar.css';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const [editableDueDate, setEditableDueDate] = useState(todo.dueDate ? new Date(todo.dueDate) : null);

    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const saveChanges = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg, dueDate: editableDueDate });
        setIsTodoEditable(false);
    };
    
    const cancelEdit = () => {
        setIsTodoEditable(false);
        setTodoMsg(todo.todo);
        setEditableDueDate(todo.dueDate ? new Date(todo.dueDate) : null);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

    const dateTimeFormatOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
    };

    return (
        <div
            className={`flex flex-col rounded-lg px-3 py-1.5 gap-y-2 shadow-sm duration-300 ${
                isOverdue
                    ? 'bg-rose-50 text-rose-900 border-l-4 border-rose-400'
                    : `border ${todo.completed ? 'bg-emerald-50 text-gray-500 border-emerald-200' : 'bg-white text-black border-gray-200'}`
            }`}
        >
            {/* Main Todo Row */}
            <div className="flex items-center gap-x-3 w-full">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={todo.completed}
                    onChange={toggleCompleted}
                />
                <input
                    type="text"
                    className={`border outline-none w-full bg-transparent rounded-lg ${
                        isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                    value={todoMsg}
                    onChange={(e) => setTodoMsg(e.target.value)}
                    readOnly={!isTodoEditable}
                />
                <div className={`text-xs italic whitespace-nowrap ${isOverdue ? "font-semibold" : ""}`}>
                    {todo.dueDate && !isTodoEditable && `Due: ${new Date(todo.dueDate).toLocaleString([], dateTimeFormatOptions)}`}
                </div>

                {/* Action Buttons */}
                <div className='flex items-center gap-x-2'>
                    {isTodoEditable ? (
                        <>
                            <button onClick={saveChanges} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"><LuCheck size={16}/></button>
                            <button onClick={cancelEdit} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"><LuX size={16}/></button>
                        </>
                    ) : (
                        <>
                            <button
                                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                                onClick={() => setIsTodoEditable(true)}
                                disabled={todo.completed}
                            >
                                <LuPencil size={16} />
                            </button>
                            <button
                                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                <LuTrash2 size={16} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Editable Date/Time Picker Row */}
            {isTodoEditable && (
                <div className="flex items-center gap-x-2 p-2 bg-white/20 rounded-lg">
                    <DateTimePicker 
                        onChange={setEditableDueDate} 
                        value={editableDueDate}
                        className="w-full"
                        minDate={new Date()}
                    />
                </div>
            )}
        </div>
    );
}

export default TodoItem;