import { render, screen, fireEvent } from "@testing-library/react";
import AddInput from "../AddInput";

//mock function with empty function
const mockedSetTodo = jest.fn();

describe("AddInput", () => {
  it("should render input element", () => {
    render(
      <AddInput
        // set toDos with empty array
        todos={[]}
        setTodos={mockedSetTodo}
      />
    );
    //grab placeholder
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should be able to type into input", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.click(inputElement);
    //type into input
    fireEvent.change(inputElement, {
      target: { value: "Go Grocery Shopping" },
    });
    expect(inputElement.value).toBe("Go Grocery Shopping");
  });

  it("should be able to add into input", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, {
      target: { value: "Go Grocery Shopping" },
    });
    //grab the button
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(buttonElement);
    //expect mock function to be called
    expect(mockedSetTodo).toBeCalled();
  });

  it("should have empty input when add button is cliked", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, {
      target: { value: "Go Grocery Shopping" },
    });
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(buttonElement);
    //once added, expect input value to be empty
    expect(inputElement.value).toBe("");
  });
});
