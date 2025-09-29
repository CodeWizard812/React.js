import React, { useState, useRef, useEffect } from 'react';
import { useTodo } from '../contexts/TodoContext';
import DatePicker from 'react-date-picker';
import DateTimePicker from 'react-datetime-picker';
import { LuCalendarDays, LuAlarmClock, LuX, LuCheck, LuTrash2 } from "react-icons/lu";

// CSS for pickers
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';

const MenuItem = ({ onClick, children, className = "" }) => (
    <button
        type="button"
        onClick={onClick}
        className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-x-3 ${className}`}
    >
        {children}
    </button>
);

function TodoForm() {
    const [todo, setTodo] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const [isCustomPickerOpen, setIsCustomPickerOpen] = useState(false);
    const [pickerValue, setPickerValue] = useState(new Date());

    const { addTodo } = useTodo();
    const menuRef = useRef(null);

    const add = (e) => {
        e.preventDefault();
        if (!todo.trim()) return;
        addTodo({ todo, completed: false }, dueDate);
        setTodo("");
        setDueDate(null);
    };

    const setDueDateAndTime = (date, hours, minutes) => {
        const newDate = new Date(date);
        newDate.setHours(hours, minutes, 0, 0);
        setDueDate(newDate);
        setActiveMenu(null);
    };

    const setEndOfDay = (date) => {
        const newDate = new Date(date);
        newDate.setHours(23, 59, 59, 999);
        setDueDate(newDate);
        setActiveMenu(null);
    };
    
    const getTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    };
    
    const getNextWeek = () => {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + (7 - nextWeek.getDay() % 7));
        return nextWeek;
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
                setIsCustomPickerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    const handleConfirm = () => {
        if(activeMenu === 'date') {
            setEndOfDay(pickerValue);
        } else {
            setDueDate(pickerValue);
        }
        setIsCustomPickerOpen(false);
        setActiveMenu(null);
    };

    const handleCancel = () => {
        setIsCustomPickerOpen(false);
        setActiveMenu(null);
    };

    const openCustomPicker = () => {
        // Ensure picker opens to a valid (not past) date
        const initialDate = dueDate && new Date(dueDate) > new Date() ? dueDate : new Date();
        setPickerValue(initialDate);
        setIsCustomPickerOpen(true);
    }

    const dateTimeFormatOptions = {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true
    };

    return (
        <form onSubmit={add} className="relative w-full">
            <div className="flex items-center bg-white shadow-lg rounded-lg px-3 py-2 border border-gray-200">
                <input
                    type="text"
                    placeholder="Add a task..."
                    className="w-full bg-transparent text-gray-800 outline-none"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <div className="flex items-center gap-x-3 text-gray-500">
                    <button type="button" onClick={() => setActiveMenu(activeMenu === 'date' ? null : 'date')} className="hover:text-blue-600"><LuCalendarDays size={20} /></button>
                    <button type="button" onClick={() => setActiveMenu(activeMenu === 'time' ? null : 'time')} className="hover:text-blue-600"><LuAlarmClock size={20} /></button>
                </div>
                <button
                    type="submit"
                    className="ml-4 px-5 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    disabled={!todo.trim()}
                >
                    Add
                </button>
            </div>
            
            {dueDate && (
                <div className="mt-2 ml-2 flex items-center gap-x-2 text-sm text-blue-500 font-medium">
                    <LuCalendarDays />
                    <span>Due {new Date(dueDate).toLocaleString([], dateTimeFormatOptions).replace(',', '')}</span>
                    <button onClick={() => setDueDate(null)} className="hover:text-red-500"><LuX/></button>
                </div>
            )}

            {activeMenu && (
                 <div ref={menuRef} className="absolute right-0 bottom-full mb-2 w-64 bg-white rounded-lg shadow-xl z-10 border border-gray-200 p-2">
                    {isCustomPickerOpen ? (
                        <div className="p-2">
                            {activeMenu === 'date' ? 
                                <DatePicker onChange={setPickerValue} value={pickerValue} minDate={new Date()} /> : 
                                <DateTimePicker onChange={setPickerValue} value={pickerValue} minDate={new Date()} />}
                            <div className="flex justify-end gap-x-2 mt-2">
                                <button type="button" onClick={handleConfirm} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"><LuCheck size={16}/></button>
                                <button type="button" onClick={handleCancel} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"><LuX size={16}/></button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {activeMenu === 'date' && (
                                <>
                                    <MenuItem onClick={() => setEndOfDay(new Date())}><LuCalendarDays/>Today</MenuItem>
                                    <MenuItem onClick={() => setEndOfDay(getTomorrow())}><LuCalendarDays/>Tomorrow</MenuItem>
                                    <MenuItem onClick={() => setEndOfDay(getNextWeek())}><LuCalendarDays/>Next week</MenuItem>
                                    <hr className="border-gray-200" />
                                    <MenuItem onClick={openCustomPicker}><LuCalendarDays/>Pick a date</MenuItem>
                                    <hr className="border-gray-200" />
                                    <MenuItem onClick={() => { setDueDate(null); setActiveMenu(null); }} className="text-red-500"><LuTrash2/>Remove due date</MenuItem>
                                </>
                            )}
                             {activeMenu === 'time' && (
                                <>
                                    <MenuItem onClick={() => setDueDateAndTime(new Date(), 13, 0)}><LuAlarmClock/>Later today (1:00 PM)</MenuItem>
                                    <MenuItem onClick={() => setDueDateAndTime(getTomorrow(), 9, 0)}><LuAlarmClock/>Tomorrow (9:00 AM)</MenuItem>
                                    <MenuItem onClick={() => setDueDateAndTime(getNextWeek(), 9, 0)}><LuAlarmClock/>Next week (Sun, 9:00 AM)</MenuItem>
                                    <hr className="border-gray-200" />
                                    <MenuItem onClick={openCustomPicker}><LuAlarmClock/>Pick a date & time</MenuItem>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </form>
    );
}

export default TodoForm;