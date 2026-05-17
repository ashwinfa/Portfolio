import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ 
      background: "var(--bg-2)", 
      padding: "80px var(--pad) 40px",
      borderTop: "1px solid var(--border)",
      position: "relative",
      overflow: "hidden",
      zIndex: 50
    }}>
      {/* Background Glow */}
      <div className="orb orb-v" style={{ width: 600, height: 600, bottom: -300, left: "50%", transform: "translateX(-50%)", opacity: 0.05 }} />

      <div style={{ 
        maxWidth: 1200, 
        margin: "0 auto", 
        display: "flex", 
        flexDirection: "column", 
        gap: 60,
        position: "relative",
        zIndex: 1
      }}>
        
        {/* Top Section */}
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
          
          {/* Brand */}
          <div style={{ flex: "1 1 300px" }}>
            <Link to="/" className="nav-logo" style={{ textDecoration: "none", marginBottom: 20 }}>
              <span className="nav-logo-dot" />
              <span style={{ fontSize: 28, paddingBottom: 2 }}>Ashwin</span>
              <span style={{ color: "var(--cyan)", marginLeft: -8, fontSize: 32, lineHeight: 0 }}>.</span>
            </Link>
            <p className="text-body" style={{ maxWidth: 320, marginTop: 16 }}>
              Crafting immersive, high-performance web experiences. Available for freelance opportunities.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h4 style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 600, color: "var(--white)" }}>Navigation</h4>
              <Link to="/" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 15, transition: "color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--white)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}>Home</Link>
              <Link to="/about" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 15, transition: "color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--white)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}>About</Link>
              <Link to="/work" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 15, transition: "color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--white)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}>Work</Link>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h4 style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 600, color: "var(--white)" }}>Socials</h4>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 15, transition: "color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--white)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}>GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 15, transition: "color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--white)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}>LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 15, transition: "color 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--white)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}>Instagram</a>
            </div>
          </div>

        </div>

        {/* Big Text */}
        <div style={{ textAlign: "center", width: "100%" }}>
          <h1 style={{ 
            fontFamily: "var(--font-head)", 
            fontWeight: 700, 
            fontSize: "clamp(60px, 15vw, 250px)", 
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.08)",
            userSelect: "none",
            whiteSpace: "nowrap"
          }}>
            ASHWIN.
          </h1>
        </div>

        {/* Bottom Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, paddingTop: 30, borderTop: "1px solid var(--border)" }}>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            © {new Date().getFullYear()} Ashwin. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--muted)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
              Available for work
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
