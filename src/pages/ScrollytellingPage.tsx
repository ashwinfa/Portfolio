import ScrollyCanvas from "../components/scrollytelling/ScrollyCanvas";
import Projects from "../components/scrollytelling/Projects";
import { useEffect } from "react";

export default function ScrollytellingPage() {
  useEffect(() => {
    document.title = "Ashwin | Scrollytelling Portfolio";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#121212", minHeight: "100vh" }}>
      <ScrollyCanvas />
      <Projects />
    </div>
  );
}
