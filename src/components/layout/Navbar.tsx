import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Classic", to: "/classic" },
  { label: "About", to: "/about" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    // GSAP entrance animation on route change for desktop links
    if (linksRef.current) {
      gsap.fromTo(
        linksRef.current.querySelectorAll("li"),
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [location.pathname]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname === to;

  return (
    <nav className={`nav-root ${scrolled ? "nav-scrolled" : ""}`}>
      {/* Logo */}
      <Link to="/" className="nav-logo" style={{ textDecoration: "none" }}>
        <span className="nav-logo-dot" />
        <span style={{ fontSize: 24, paddingBottom: 2 }}>Ashwin</span>
        <span style={{ color: "var(--cyan)", marginLeft: -8, fontSize: 28, lineHeight: 0 }}>.</span>
      </Link>

      {/* Desktop links */}
      <ul ref={linksRef} className="nav-links" style={{ display: "flex", margin: 0, padding: 0 }}>
        {LINKS.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className={`nav-link ${isActive(l.to) ? "active" : ""}`}
              style={{
                padding: "8px 16px",
                borderRadius: 50,
                background: isActive(l.to) ? "rgba(255,255,255,0.06)" : "transparent",
                color: isActive(l.to) ? "var(--white)" : "var(--muted)",
                transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <a href="mailto:ashwin@gmail.com" className="nav-cta" style={{ display: window.innerWidth < 640 ? "none" : "inline-block", padding: "10px 28px", fontSize: 14 }}>
          Hire Me <span style={{ color: "#fff" }}>✦</span>
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            borderRadius: "50%",
            width: 44,
            height: 44,
            cursor: "pointer",
            color: "var(--white)",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            left: 0,
            right: 0,
            background: "rgba(6,4,15,0.95)",
            backdropFilter: "blur(24px)",
            border: "1px solid var(--border)",
            borderRadius: 24,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                padding: "14px 20px",
                borderRadius: 16,
                color: isActive(l.to) ? "var(--white)" : "var(--muted)",
                textDecoration: "none",
                fontFamily: "var(--font-head)",
                fontSize: 18,
                fontWeight: 600,
                background: isActive(l.to) ? "rgba(168,85,247,0.1)" : "transparent",
                border: isActive(l.to) ? "1px solid rgba(168,85,247,0.2)" : "1px solid transparent",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {l.label}
              {isActive(l.to) && <span style={{ color: "var(--accent-2)" }}>✦</span>}
            </Link>
          ))}
          <a
            href="mailto:ashwin@gmail.com"
            className="nav-cta"
            style={{ marginTop: 12, textAlign: "center", padding: "16px", borderRadius: 16, fontSize: 16 }}
          >
            Hire Me ✦
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          a[href="mailto:ashwin@gmail.com"].nav-cta { display: none !important; }
        }
        .nav-link::after { display: none !important; } /* remove old underline */
      `}</style>
    </nav>
  );
};

export default Navbar;
