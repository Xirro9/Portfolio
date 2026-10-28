import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../src/App";
import { allRoutes } from "../src/routes";
import { ExternalLink } from "../src/components/Content";

describe("routes and interaction", () => {
  it.each(allRoutes())("renders $path with a single main heading", (route) => {
    render(<App path={route.path} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(
      screen.getByRole("navigation", { name: "Main" }),
    ).toBeInTheDocument();
  });
  it.each([
    "/work/missing",
    "/workshop/missing",
    "/labs/missing",
    "/not-a-page",
  ])("handles an invalid slug: %s", (path) => {
    render(<App path={path} />);
    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute(
      "href",
      "/Portfolio/",
    );
  });
  it("searches, combines category filters, announces emptiness, and resets", async () => {
    const user = userEvent.setup();
    render(<App path="/work" />);
    await user.type(screen.getByRole("searchbox"), "Rust");
    expect(screen.getByRole("status")).toHaveTextContent("1 project shown");
    await user.selectOptions(screen.getByRole("combobox"), "ai-infrastructure");
    expect(screen.getByRole("status")).toHaveTextContent("0 projects shown");
    expect(screen.getByText(/No projects match/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent("5 projects shown");
  });
  it("opens mobile navigation and returns focus when Escape closes it", async () => {
    const user = userEvent.setup();
    render(<App path="/workshop" />);
    const button = screen.getByRole("button", { name: "Menu" });
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    const nav = screen.getByRole("navigation", { name: "Main" });
    const link = within(nav).getByRole("link", { name: "The Workshop" });
    expect(link).toHaveAttribute("aria-current", "page");
    link.focus();
    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
    await user.click(button);
    link.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(link);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
  it("shows status boundaries and a graceful media failure", () => {
    render(<App path="/work/agenthq" />);
    expect(
      screen.getByText(/Hermes integration documented live/),
    ).toBeInTheDocument();
    expect(screen.getByText(/OpenCode live event support/)).toHaveTextContent(
      "experimental",
    );
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByText(/Image unavailable/)).toBeInTheDocument();
  });
  it("rejects unsafe external schemes and uses ordinary navigation for valid evidence", () => {
    render(
      <>
        <ExternalLink url="javascript:alert(1)">Unsafe</ExternalLink>
        <ExternalLink url="https://github.com/Xirro9">GitHub</ExternalLink>
      </>,
    );
    expect(
      screen.queryByRole("link", { name: "Unsafe" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/Xirro9",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).not.toHaveAttribute(
      "target",
    );
  });
});
