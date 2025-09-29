import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import DatePicker from 'react-date-picker';
import DateTimePicker from 'react-datetime-picker';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [pickerType, setPickerType] = useState('date');
    const [pickerValue, setPickerValue] = useState(new Date()); // Temp state for picker

    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        if (!todo) return;

        // Corrected function call: passing the todo object and dueDate separately
        addTodo({ todo, completed: false }, dueDate);

        setTodo("");
        setDueDate(null);
    };

    const handleOpenPicker = (type) => {
        setPickerType(type);
        setPickerValue(dueDate || new Date()); // Reset picker to current due date or now
        setIsPickerOpen(true);
    };

    const handleConfirmDateTime = () => {
        setDueDate(pickerValue);
        setIsPickerOpen(false);
    };
    
    const handleDateOnlyChange = (date) => {
        const newDate = new Date(date);
        // Set time to 11:59 PM of the selected day
        newDate.setHours(23, 59, 59, 999);
        setDueDate(newDate);
        setIsPickerOpen(false);
    };

    return (
        <form onSubmit={add} className="flex flex-col gap-y-3">
            <div className="flex">
                <input
                    type="text"
                    placeholder="Write Todo..."
                    className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                    Add
                </button>
            </div>

            <div className="flex items-center gap-x-4">
                <div className="flex items-center gap-x-2">
                    <button type="button" onClick={() => handleOpenPicker('date')} className="text-sm bg-white/10 p-2 rounded-md hover:bg-white/20">📅 Set Date</button>
                    <button type="button" onClick={() => handleOpenPicker('datetime')} className="text-sm bg-white/10 p-2 rounded-md hover:bg-white/20">⏰ Set Date & Time</button>
                </div>
                {dueDate && (
                    <div className="text-sm bg-black/30 p-2 rounded-md flex items-center gap-x-2 text-white">
                        <span>Due: {new Date(dueDate).toLocaleString()}</span>
                        <button onClick={() => setDueDate(null)} className="text-red-400 font-bold">✕</button>
                    </div>
                )}
            </div>

            {isPickerOpen && (
                <div className="p-2 bg-white rounded-lg flex items-center gap-x-2">
                    {pickerType === 'date' ? (
                        <DatePicker onChange={handleDateOnlyChange} value={dueDate || new Date()} />
                    ) : (
                        <>
                            <DateTimePicker onChange={setPickerValue} value={pickerValue} />
                            <button type="button" onClick={handleConfirmDateTime} className="bg-green-500 text-white p-2 rounded-md">✅</button>
                        </>
                    )}
                </div>
            )}
        </form>
    );
}

export default TodoForm;