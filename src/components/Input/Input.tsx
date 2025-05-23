import { useState } from "react";
import { useTodoStore } from "../../store";

// renders the input field for todos
export const Input = () => {
  const [newTodo, setNewTodo] = useState("");
  const addTodo = useTodoStore((store) => store.addTodo);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(newTodo);
        setNewTodo("");
      }}
    >
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Let it out..."
          className="flex-1 px-4 py-2 rounded-l-md border border-green-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={newTodo === ""}
          className="px-4 py-2 bg-green-500 text-white rounded-r-md transition-colors cursor-pointer hover:bg-green-600 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Add It
        </button>
      </div>
    </form>
  );
};
