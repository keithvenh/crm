import { Route } from "react-router-dom";
import Accounts from "./index";
import AccountsNew from "./AccountNew";
import AccountShow from "./AccountShow";
import AccountEdit from "./AccountEdit";

export default function AccountsRoutes() {
  return (
    <>
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/accounts/new" element={<AccountsNew />} />
      <Route path="/accounts/:id" element={<AccountShow />} />
      <Route path="/accounts/:id/edit" element={<AccountEdit />} />
    </>
  );
}