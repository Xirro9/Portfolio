import { useRef, useState, type ReactNode } from "react";
import { navigation, site } from "../content/site";
import { href } from "../routes";
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
          Mahin Moon<span>Cybersecurity & engineering</span>
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
  return (
    <>
      <SiteHeader path={path} />
      <main id="main-content" tabIndex={-1} className="page-shell">
        {children}
      </main>
      <footer className="site-footer">
        <div>
          <a href={href("/")}>Mahin Moon</a>
          <p>Cybersecurity, software systems, and practical experimentation.</p>
        </div>
        <p>
          Content as of {site.asOf}.<br />
          <a href={href("/contact")}>Get in touch</a>
        </p>
      </footer>
    </>
  );
}
