import axios from "axios";
import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

   

    const toggleCompleted = async (id) => {
        const updatedTodo = todos.find(todo => todo.id === id);

        try {
            await axios.put(`http://127.0.0.1:8000/api/task/${id}`, { completed: !updatedTodo.completed });

            setTodos(todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !updatedTodo.completed };
                }
                return todo;
            }));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <TodoContext.Provider value={{ todos, toggleCompleted, setTodos }}>
            {children}
        </TodoContext.Provider>
    );
};
