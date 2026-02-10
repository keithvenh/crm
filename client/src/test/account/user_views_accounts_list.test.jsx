import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Accounts from '../../features/Accounts';

import React from "react";
import { vi } from "vitest";

test("User can see a loading state while accounts are being fetched", () => {
  vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {}))); // never resolves

  render(<Accounts />);

  // Prefer role or text; selector isn't supported on getByRole
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("User can see a list of accounts", async () => {
  vi.mock("../../services/AccountService", () => ({
    AccountService: {
      all: vi.fn().mockResolvedValue([
        { id: 1, name: "VenHuizen" },
        { id: 2, name: "C6 Church" },
      ]),
    },
  }));

  render(<Accounts />);

  expect(await screen.findByText("VenHuizen")).toBeInTheDocument();
  expect(screen.getByText("C6 Church")).toBeInTheDocument();
});

test("User can see an empty state when there are no accounts", () => {});
test("User can see an error message when accounts fail to load", () => {});