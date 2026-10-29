import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";
import { themeForPath } from "../src/routes";

describe("structural blueprint contracts", () => {
  it.each([
    ["/", "observatory"],
    ["/work", "engineering-archive"],
    ["/work/controlgauge", "engineering-archive"],
    ["/labs/wazuh-siem", "engineering-archive"],
    ["/workshop", "technomancer-workshop"],
    ["/workshop/bug-hunters-guild", "technomancer-workshop"],
    ["/experience", "observatory"],
  ])("maps %s to the shared %s theme scope", (path, scope) => {
    const { container } = render(<App path={path} />);
    expect(container.querySelector(".portfolio-shell")).toHaveAttribute(
      "data-theme",
      scope,
    );
    expect(screen.getAllByRole("navigation", { name: "Main" })).toHaveLength(1);
    expect(themeForPath(`/Portfolio${path}/`)).toBe(scope);
  });
  it("puts experience and education directly after the professional hero", () => {
    const { container } = render(<App path="/" />);
    const hero = container.querySelector('[data-hero="observatory"]')!;
    expect(hero).toHaveTextContent("Mahin Moon");
    expect(hero.querySelector('[data-scene="celestial-engine"]')).toBeNull();
    const headings = [
      "Current professional work",
      "Education & continued study",
      "Selected projects",
      "Technical expertise",
      "Labs, research & milestones",
      "A different kind of engineering practice",
    ];
    let prior: Element = hero;
    for (const name of headings) {
      const current = screen.getByRole("heading", { name, level: 2 });
      expect(
        prior.compareDocumentPosition(current) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).not.toBe(0);
      prior = current;
    }
    expect(
      container.querySelector('[data-section="technical-writing"]'),
    ).toBeNull();
  });
  it("uses a distinct Workshop hero and canonical creative project destinations", () => {
    const { container } = render(<App path="/workshop" />);
    expect(
      container.querySelector('[data-hero="workshop"]'),
    ).toBeInTheDocument();
    expect(container.querySelector('[data-hero="observatory"]')).toBeNull();
    expect(
      container.querySelector(
        '[data-hero="workshop"] [data-scene="celestial-engine"] [data-scene-fallback]',
      ),
    ).toHaveTextContent("From idea to interaction");
    for (const link of screen.getAllByRole("link", {
      name: "Read Bug Hunters Guild case study",
    }))
      expect(link).toHaveAttribute(
        "href",
        "/Portfolio/workshop/bug-hunters-guild/",
      );
    expect(
      screen.getByRole("link", { name: "Visit the Engineering Archive" }),
    ).toHaveAttribute("href", "/Portfolio/work/");
  });
  it.each([
    ["/work/controlgauge", "technical"],
    ["/workshop/bug-hunters-guild", "creative"],
  ])(
    "keeps one case-study template with an intentional %s treatment",
    (path, layout) => {
      const { container } = render(<App path={path} />);
      expect(container.querySelector(".case-study")).toHaveAttribute(
        "data-layout",
        layout,
      );
      expect(
        screen.getByRole("heading", { name: "My role & attribution" }),
      ).toBeInTheDocument();
    },
  );
});
