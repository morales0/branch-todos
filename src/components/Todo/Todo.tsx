import { Check } from "../../icons/check";
import { XmarkCircle } from "../../icons/xmarkcircle";
import { useTodoStore, type Todo as TodoType } from "../../store";

// single todo with options to complete, uncomplete, and delete
export const Todo = ({ id, text, complete }: TodoType) => {
  const deleteTodo = useTodoStore((store) => store.deleteTodo);
  const toggleComplete = useTodoStore((store) => store.toggleComplete);

  return (
    <div className="flex items-center gap-3 p-3">
      <button
        onClick={() => toggleComplete(id)}
        className={`group flex-1 p-4 border border-green-600 cursor-pointer rounded-bl-2xl rounded-tr-2xl rounded-br-lg rounded-tl-lg ${
          complete
            ? "bg-green-50 line-through backdrop-blur-md text-gray-500"
            : "bg-white/30 text-black"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-5 h-5 flex items-center justify-center rounded-full border ${
              complete ? "border-green-700" : "border-gray-300"
            }`}
            aria-label="Complete Todo"
          >
            <div
              className={
                !complete
                  ? "opacity-0 group-hover:opacity-100 transition-opacity"
                  : ""
              }
            >
              <Check />
            </div>
          </div>
          <p className="text-left">{text}</p>
        </div>
      </button>

      <button
        onClick={() => deleteTodo(id)}
        className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-sm p-1  hover:bg-gray-200"
        aria-label="Delete Todo"
      >
        <XmarkCircle />
      </button>
    </div>
  );
};
