/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "vitest-browser-react";
import { Control } from "./Control";

// Create mock functions
const mockClearTodos = vi.fn();
const mockUndoLastAction = vi.fn();

// Mutable impl function
let mockUseTodoStoreImpl: any = null;

vi.mock("../../store", async () => {
  const actual = await vi.importActual<typeof import("../../store")>(
    "../../store"
  );
  return {
    ...actual,
    useTodoStore: (selector: any) => selector(mockUseTodoStoreImpl),
  };
});

describe("Control", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should disable Clear when todos are empty", () => {
    mockUseTodoStoreImpl = {
      todos: [],
      clearTodos: mockClearTodos,
      lastAction: undefined,
      undoLastAction: mockUndoLastAction,
    };

    const { getByRole } = renderControl();
    const clearButton = getByRole("button", { name: /clear/i });
    expect(clearButton).toBeDisabled();
  });
  test("should disable Undo when last action is undefined", () => {
    mockUseTodoStoreImpl = {
      todos: [],
      clearTodos: mockClearTodos,
      lastAction: undefined,
      undoLastAction: mockUndoLastAction,
    };

    const { getByRole } = renderControl();
    const clearButton = getByRole("button", { name: /undo/i });
    expect(clearButton).toBeDisabled();
  });

  test("should call clearTodos when Clear is clicked and enabled", async () => {
    // set up mock state with todos
    mockUseTodoStoreImpl = {
      todos: [{ id: "1", text: "Need to clear", complete: false }],
      clearTodos: mockClearTodos,
      lastAction: undefined,
      undoLastAction: mockUndoLastAction,
    };

    const { getByRole } = renderControl();
    const clearButton = getByRole("button", { name: /clear/i });

    await clearButton.click();
    expect(mockClearTodos).toHaveBeenCalled();
  });

  test("should call undoLastAction when Undo is clicked", async () => {
    mockUseTodoStoreImpl = {
      todos: [],
      clearTodos: mockClearTodos,
      lastAction: {
        action: "delete",
        todo: { id: "1", text: "Test", complete: false },
      },
      undoLastAction: mockUndoLastAction,
    };

    const { getByRole } = renderControl();
    const undoButton = getByRole("button", { name: /undo/i });

    await undoButton.click();
    expect(mockUndoLastAction).toHaveBeenCalled();
  });
});

const renderControl = () => render(<Control />);
