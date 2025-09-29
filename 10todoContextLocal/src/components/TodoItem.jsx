import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import DateTimePicker from 'react-datetime-picker';

// Import the CSS for the pickers
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';
import 'react-calendar/dist/Calendar.css';


function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    // State to manage the due date while editing
    const [editableDueDate, setEditableDueDate] = useState(todo.dueDate ? new Date(todo.dueDate) : null);

    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const editTodo = () => {
        // Pass the updated due date along with the message
        updateTodo(todo.id, { ...todo, todo: todoMsg, dueDate: editableDueDate });
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    // Check if the due date has passed
    const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

    // Formatting options to exclude seconds
    const dateTimeFormatOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
    };

    return (
        <div
            className={`flex flex-col border border-black/10 rounded-lg px-3 py-1.5 gap-y-2 shadow-sm shadow-white/50 duration-300 text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            } ${isOverdue ? "!bg-red-400 text-white" : ""}`}
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
                    } ${todo.completed ? "line-through" : ""} ${isOverdue ? "text-white" : ""}`}
                    value={todoMsg}
                    onChange={(e) => setTodoMsg(e.target.value)}
                    readOnly={!isTodoEditable}
                />
                <div className={`text-xs italic whitespace-nowrap ${isOverdue ? "text-white font-semibold" : "text-gray-600"}`}>
                    {todo.dueDate && `Due: ${new Date(todo.dueDate).toLocaleString([], dateTimeFormatOptions)}`}
                </div>
                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                    onClick={() => {
                        if (todo.completed) return;
                        if (isTodoEditable) {
                            editTodo();
                        } else {
                            setEditableDueDate(todo.dueDate ? new Date(todo.dueDate) : new Date());
                            setIsTodoEditable((prev) => !prev);
                        }
                    }}
                    disabled={todo.completed}
                >
                    {isTodoEditable ? "📁" : "✏️"}
                </button>
                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                    onClick={() => deleteTodo(todo.id)}
                >
                    ❌
                </button>
            </div>

            {/* Editable Date/Time Picker Row */}
            {isTodoEditable && (
                <div className="flex items-center gap-x-2 p-2 bg-white/50 rounded-lg">
                    <DateTimePicker 
                        onChange={setEditableDueDate} 
                        value={editableDueDate}
                        className="w-full"
                    />
                </div>
            )}
        </div>
    );
}

export default TodoItem;