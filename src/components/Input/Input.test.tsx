/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "vitest-browser-react";
import { Input } from "./Input";

// Create mock functions
const mockAddTodo = vi.fn();

// Mutable impl function
let mockUseTodoStoreImpl: any = {};

vi.mock("../../store", async () => {
  const actual = await vi.importActual<typeof import("../../store")>(
    "../../store"
  );
  return {
    ...actual,
    useTodoStore: (selector: any) => selector(mockUseTodoStoreImpl),
  };
});

describe("Input", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render with placeholder text", async () => {
    const { getByPlaceholder } = renderInput();

    await expect.element(getByPlaceholder("Let it out...")).toBeInTheDocument();
  });

  test("should render disabled button when input is empty", async () => {
    const { getByRole } = renderInput();
    const button = getByRole("button", { name: /add it/i });

    await expect.element(button).toBeDisabled();
  });

  test("should call addTodo when user clicks add button with text", async () => {
    mockUseTodoStoreImpl = {
      addTodo: mockAddTodo,
    };

    const { getByPlaceholder, getByRole } = renderInput();
    const input = getByPlaceholder("Let it out...");
    const button = getByRole("button", { name: /add it/i });

    await input.fill("Another todo");
    await button.click();

    expect(mockAddTodo).toHaveBeenCalled();
  });
});

const renderInput = () => {
  return render(<Input />);
};
