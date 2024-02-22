import { useState } from 'react';
import data from '../data';

const TodoList = () => {
  const [todos, setTodos] = useState(data);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = () => {
    if (newTodo !== '') {
      const newTask = {
        userId: 1,
        id: todos.length + 1,
        title: newTodo,
        completed: false
      };
      setTodos([newTask, ...todos]);
      setNewTodo('');
    }
  };

  const handleInputChange = (evt) => {
    setNewTodo(evt.target.value);
  };

  const deleteTodo = (taskId) => {
    setTodos(todos.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTodos(todos.map(todo =>
      todo.id === taskId ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (taskId) => {
    const todoToEdit = todos.find(todo => todo.id === taskId);
    setEditingId(taskId);
    setEditingText(todoToEdit.title);
  };

  const handleEditInputChange = (evt) => {
    setEditingText(evt.target.value);
  };

  const save = (taskId) => {
    setTodos(todos.map(todo =>
      todo.id === taskId ? { ...todo, title: editingText } : todo
    ));
    setEditingId(null);
    setEditingText('');
  };

  return (
    <>
      <h1>Todo List</h1>
      <input
        type='text'
        placeholder='Add new task'
        value={newTodo}
        onChange={handleInputChange}
      />
      <button onClick={addTodo}>Add</button>
      {todos.map((task) => (
        <div key={task.id}>
          {editingId === task.id ? (
            <>
              <input
                type='text'
                value={editingText}
                onChange={handleEditInputChange}
              />
              <button onClick={() => save(task.id)}>Save</button>
            </>
          ) : (
            <>
              <label>
                <input
                  type='checkbox'
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                {task.title}
              </label>
              <button onClick={() => deleteTodo(task.id)} disabled={!task.completed}>Delete</button>
              <button onClick={() => editTodo(task.id)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default TodoList;
