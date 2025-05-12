import { render } from "vitest-browser-react";
import { Todo } from "./Todo";

// Create mock functions for the store actions
const mockToggleComplete = vi.fn();
const mockDeleteTodo = vi.fn();

// Mock Zustand store
vi.mock("../../store", async () => {
  const actual = await vi.importActual<typeof import("../../store")>(
    "../../store"
  );
  return {
    ...actual,
    useTodoStore: vi.fn((selector) =>
      selector({
        toggleComplete: mockToggleComplete,
        deleteTodo: mockDeleteTodo,
      })
    ),
  };
});

describe("Todo", () => {
  test("should render with text", async () => {
    const { getByText } = renderTodo();

    await expect.element(getByText("Good todo")).toBeInTheDocument();
  });

  test("should call toggleComplete when clicked", async () => {
    const { getByRole } = renderTodo();

    const completeButton = getByRole("button", {
      name: /complete todo/i,
    });

    await completeButton.click();

    expect(mockToggleComplete).toHaveBeenCalledWith("1");
  });

  test("should call deleteTodo when delete button is clicked", async () => {
    const { getByRole } = renderTodo();

    const deleteButton = getByRole("button", {
      name: /delete todo/i,
    });
    await deleteButton.click();

    expect(mockDeleteTodo).toHaveBeenCalledWith("1");
  });
});

// Component props mock
const mockTodo = {
  id: "1",
  text: "Good todo",
  complete: false,
};

const renderTodo = () => {
  return render(<Todo {...mockTodo} />);
};
