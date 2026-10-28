import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { allRoutes, href } from "../../src/routes";

test("every route loads directly with metadata, content, and no accessibility violations", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of allRoutes()) {
    const response = await page.goto(href(route.path));
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(`${route.title} | Mahin Moon`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      route.description,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://xirro9.github.io${href(route.path)}`,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"])
      .analyze();
    expect(audit.violations, JSON.stringify(audit.violations, null, 2)).toEqual(
      [],
    );
  }
  expect(errors).toEqual([]);
});
test("navigation, filters, disclosures, and mobile keyboard dismissal", async ({
  page,
}, testInfo) => {
  await page.goto("/Portfolio/work/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  if (testInfo.project.name === "mobile") {
    await expect(
      page.getByRole("navigation", { name: "Main", exact: true }),
    ).toBeHidden();
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page
      .getByRole("navigation", { name: "Main", exact: true })
      .getByRole("link", { name: "Work", exact: true })
      .focus();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  }
  await page.getByRole("searchbox").fill("Rust");
  await expect(page.getByRole("status")).toHaveText("1 project shown");
  await page.getByRole("combobox").selectOption("ai-infrastructure");
  await expect(page.getByRole("status")).toHaveText("0 projects shown");
  await page.getByRole("button", { name: "Reset filters" }).click();
  await page
    .getByRole("link", { name: "Read ControlGauge case study" })
    .click();
  await expect(page).toHaveURL(/\/Portfolio\/work\/controlgauge\/$/);
  await expect(page.locator("h1")).toHaveText("ControlGauge");
  await page.reload();
  await expect(page.locator("h1")).toHaveText("ControlGauge");
  await page.goto("/Portfolio/experience/");
  const disclosure = page.locator("summary").first();
  await disclosure.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
});
test("static output works without JavaScript and screenshot evidence loads", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/Portfolio/work/agenthq/");
  await expect(page.locator("h1")).toHaveText("AgentHQ");
  expect(
    await page
      .locator("img")
      .evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
  ).toBe(true);
  await context.close();
});
test("404 state, skip link, sitemap, and base assets", async ({
  page,
  request,
}) => {
  await page.goto("/Portfolio/404.html");
  await expect(page.locator("h1")).toHaveText("Page not found");
  await page.goto("/Portfolio/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  for (const path of ["sitemap.xml", "favicon.svg", "robots.txt"])
    expect((await request.get(`/Portfolio/${path}`)).status()).toBe(200);
});

test("desktop and mobile visual review captures", async ({ page }, testInfo) => {
  for (const [name, path] of [["home", "/"], ["case-study", "/work/controlgauge"], ["workshop", "/workshop"]]) {
    await page.goto(href(path));
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: true });
  }
});
