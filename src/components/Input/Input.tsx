import { useState } from "react";
import { useTodoStore } from "../../store";

// renders the input field for todos
export const Input = () => {
  const [newTodo, setNewTodo] = useState("");
  const addTodo = useTodoStore((store) => store.addTodo);
  const clearTodos = useTodoStore((store) => store.clearTodos);
  const lastAction = useTodoStore((store) => store.lastAction);
  const undoLastAction = useTodoStore((store) => store.undoLastAction);

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center p-4 backdrop-blur-lg border-t-1 border-t-green-600">
      <div className="flex flex-col gap-2 w-full max-w-md">
        <div className="mx-auto inline-flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={clearTodos}
            className="cursor-pointer px-4 py-2 bg-white text-gray-800 hover:bg-gray-100 border-r border-gray-300"
          >
            Clear
          </button>
          <button
            onClick={undoLastAction}
            disabled={!lastAction}
            className="cursor-pointer px-4 py-2 bg-white text-gray-800 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            Undo
          </button>
        </div>

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
              placeholder="What do you desire..."
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
      </div>
    </div>
  );
};
