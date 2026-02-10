import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from '../../App';

test("User can navigate to Accounts from main navigation", async () => {
  const user = userEvent.setup();
  render(<App />);
  
  await user.click(
    screen.getByRole("menuitem", {name: "Accounts"})
  )

  expect (
    screen.getByRole("heading", {level: 1, name: "Accounts", selector: ".pageTitle"})
  ).toBeInTheDocument();

})