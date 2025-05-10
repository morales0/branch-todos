import { useShallow } from "zustand/shallow";
import { useTodoStore } from "../../store";

export const Control = () => {
  const isTodosEmpty = useTodoStore(useShallow((state) => state.todos.length === 0))
  const clearTodos = useTodoStore((store) => store.clearTodos);
  const lastAction = useTodoStore((store) => store.lastAction);
  const undoLastAction = useTodoStore((store) => store.undoLastAction);

  return (
    <div className="mx-auto inline-flex border border-gray-300 rounded-lg overflow-hidden">
      <button
      disabled={isTodosEmpty}
        onClick={clearTodos}
        className="cursor-pointer px-4 py-2 bg-white text-gray-800 hover:bg-gray-100 border-r border-gray-300 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
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
  );
};
