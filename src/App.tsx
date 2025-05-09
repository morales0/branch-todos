import { useState } from "react";
import "./App.css";
import { useTodoStore, type Todo } from "./store";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [deletedTodos, setDeletedTodos] = useState<Todo[]>([]);
  const todos = useTodoStore((store) => store.todos);
  const addTodo = useTodoStore((store) => store.addTodo);
  const deleteTodo = useTodoStore((store) => store.deleteTodo);

  const handleAddTodo = () => {
    addTodo(newTodo);
    setNewTodo("");
  };

  const handleDeleteTodo = (id: string) => {
    const deletedTodo = deleteTodo(id);

    // could use this for undoing
    if (deletedTodo) {
      setDeletedTodos((prev) => [...prev, deletedTodo]);
    }
  };

  const handleUndo = () => {
    if (deleteTodo.length === 0) return;
    const lastTodo = [...deletedTodos].pop();
    if (lastTodo) {
      addTodo(lastTodo.text, lastTodo.id);
      setDeletedTodos((prev) => prev.slice(0, -1));
    }
  };

  return (
    <>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button disabled={newTodo === ""} onClick={handleAddTodo}>
        Add Todo
      </button>

      {deletedTodos.length > 0 && <button onClick={handleUndo}>Undo</button>}

      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.text}</p>
          <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
