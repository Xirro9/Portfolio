import { useRef, useState, type ReactNode } from "react";
import { navigation, site } from "../content/site";
import { href, themeForPath } from "../routes";
import { Monogram } from "./visual/Monogram";
import { useSiteMotion } from "../motion/useSiteMotion";
export function SiteHeader({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="header-inner">
        <a className="site-name" href={href("/")} aria-label="Mahin Moon home">
          <Monogram
            className="site-mark"
            variant={
              themeForPath(path) === "technomancer-workshop"
                ? "arcane"
                : "signal"
            }
          />
          <span className="site-name-text">
            Mahin Moon<span>Cybersecurity & engineering</span>
          </span>
        </a>
        <button
          ref={trigger}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
        <nav
          id="primary-navigation"
          aria-label="Main"
          className={open ? "navigation is-open" : "navigation"}
          onKeyDown={(event) => {
            if (event.key === "Escape" && open) {
              setOpen(false);
              trigger.current?.focus();
            }
          }}
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.path}>
                <a
                  href={href(item.path)}
                  aria-current={
                    (
                      item.path === "/"
                        ? path === "/"
                        : path === item.path || path.startsWith(`${item.path}/`)
                    )
                      ? "page"
                      : undefined
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
export function SiteLayout({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  const shell = useRef<HTMLDivElement>(null);
  useSiteMotion(shell, path);
  return (
    <div
      ref={shell}
      className="portfolio-shell"
      data-theme={themeForPath(path)}
      data-route={path}
    >
      <SiteHeader path={path} />
      <main
        id="main-content"
        tabIndex={-1}
        className="page-shell"
        data-motion-slot="route-content"
      >
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-brand">
          <Monogram className="footer-mark" />
          <a href={href("/")}>Mahin Moon</a>
          <p>
            Cybersecurity, software systems, and practical experimentation.
            <span className="footer-handle"> Xirro9 on GitHub.</span>
          </p>
        </div>
        <p>
          Content as of {site.asOf}.<br />
          <a href={href("/contact")}>Get in touch</a>
        </p>
      </footer>
    </div>
  );
}
