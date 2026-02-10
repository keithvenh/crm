import { render, screen } from "@testing-library/react";

import App from "../../App";

test("User can see their dashboard", () => {

  render(<App />);

  expect(
    screen.getByRole("heading", {level: 1, name: "Dashboard", selector: "pageTitle"})
  ).toBeInTheDocument();
  
});