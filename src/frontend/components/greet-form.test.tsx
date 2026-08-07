import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GreetForm from "./greet-form";
import "@testing-library/jest-dom";

describe("GreetForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches default greeting when no name is provided", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Hello, friend!" }),
      }),
    ) as jest.Mock;

    render(<GreetForm />);

    const button = screen.getByRole("button", { name: /Get greeting/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Hello, friend!")).toBeInTheDocument();
    });
  });

  it("fetches personalized greeting when name is provided", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Hello, 6730243021!" }),
      }),
    ) as jest.Mock;

    render(<GreetForm />);

    const input = screen.getByLabelText(/Your name/i);
    fireEvent.change(input, { target: { value: "6730243021" } });

    const button = screen.getByRole("button", { name: /Get greeting/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Hello, 6730243021!")).toBeInTheDocument();
    });
  });

  it("handles error gracefully", async () => {
    global.fetch = jest.fn(() => Promise.reject("API is down")) as jest.Mock;

    render(<GreetForm />);
    const button = screen.getByRole("button", { name: /Get greeting/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Error fetching data")).toBeInTheDocument();
    });
  });
});
