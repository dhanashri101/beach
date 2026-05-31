import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./App.css";

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  
  // The container is 300vh, so scrollYProgress tracks from top to bottom
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Move the 200vh background up by exactly 50% of its own height (which is 100vh) 
  // Using percentages is often smoother than vh units in Framer Motion.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // SCENE 1: Fades out and moves up as you start scrolling (0% to 30% of scroll)
  const beachOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const beachY = useTransform(scrollYProgress, [0, 0.3], ["0px", "-100px"]);
  const beachSubOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const beachVisibility = useTransform(beachOpacity, (v) =>
    v <= 0.01 ? "hidden" : "visible"
  );

  // SCENE 2: Fades in and moves up right as Scene 1 finishes (30% to 60% of scroll)
  const coastalOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const coastalY = useTransform(scrollYProgress, [0.3, 0.6], ["100px", "0px"]);
  
  // The paragraph text trails slightly behind the headline for a cascading effect
  const coastalBodyOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  const coastalVisibility = useTransform(coastalOpacity, (v) =>
    v <= 0.01 ? "hidden" : "visible"
  );

  // Indicator fades out immediately
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="app-container">
      <header className="site-header">
        <a href="/" className="logo">Wandr.</a>
        <nav className="main-nav">
          <a className="active-link" href="#">The Beaches</a>
          <a href="#">Map</a>
          <a href="#">Accommodation</a>
          <a href="#">Tours</a>
        </nav>
        <div className="social-links">
          <span>Follow Us</span>
          <span className="dot" />
          <span className="dot" />
        </div>
      </header>

      <section ref={ref} className="parallax-section" style={{ height: "300vh" }}>
        <div className="sticky-wrapper" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          {/* Background Images */}
          <motion.div className="bg-motion-wrapper" style={{ y: bgY, position: "absolute", top: 0, left: 0, right: 0, height: "200vh" }}>
            <div className="image-container" style={{ position: "relative", height: "100vh", width: "100%" }}>
              <img src="/sand.png" alt="Water and Sand" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
            </div>
            <div className="image-container sand-layer" style={{ position: "relative", height: "100vh", width: "100%", marginTop: "-1px" }}>
              <img src="/beach.png" alt="Pure Sand" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
            </div>
          </motion.div>

          {/* Foreground Text */}
          <div className="content-overlay" style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", color: "white" }}>

            {/* Scene 1 — Beach Vibes */}
            <motion.div
              style={{ opacity: beachOpacity, y: beachY, visibility: beachVisibility }}
              className="scene-container absolute inset-0 flex flex-col items-center justify-center"
            >
              <h1 className="hero-heading">
                <span className="text-serif text-[clamp(3.5rem,10vw,9rem)]">Beach</span>
                <span className="text-script text-[clamp(4rem,12vw,11rem)] -ml-2">Vibes</span>
              </h1>
              <motion.p style={{ opacity: beachSubOpacity }} className="subtitle mt-6 text-[11px] tracking-[0.35em] uppercase font-medium">
                Scroll to discover the world's best beaches
              </motion.p>
            </motion.div>

            {/* Scene 2 — Coastal Escapes */}
            <motion.div
              style={{ opacity: coastalOpacity, y: coastalY, visibility: coastalVisibility }}
              className="scene-container absolute inset-0 flex flex-col items-center justify-center"
            >
              <h2 className="hero-heading">
                <span className="text-serif text-[clamp(3.5rem,10vw,9rem)]">Coastal</span>
                <span className="text-script text-[clamp(4rem,12vw,11rem)] -ml-2">Escapes</span>
              </h2>
              <motion.div style={{ opacity: coastalBodyOpacity }} className="coastal-body mt-8 max-w-xl">
                <p className="subtitle mb-spaced text-[11px] tracking-[0.35em] uppercase font-medium mb-5">The World's Top 50 Beaches</p>
                <p className="description text-sm leading-relaxed text-white/90">
                  From secluded coves and turquoise-trimmed bays to windswept, black-sand
                  coastlines carved from volcanic rock — there's just something about
                  beaches that gets our minds racing. Let's bask in the brine that will
                  blow your mind away.
                </p>
                <button className="primary-button mt-8 inline-block px-8 py-3 bg-[oklch(0.55_0.09_200)] text-white text-[11px] tracking-[0.3em] uppercase font-semibold hover:opacity-90 transition">
                  View on Map
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div style={{ opacity: indicatorOpacity }} className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white">
            <div className="pulse-line w-px h-10 bg-white/70 mb-2 animate-pulse" />
            <span className="arrow-down text-[10px] tracking-[0.3em]">↓</span>
          </motion.div>

        </div>
      </section>
    </div>
  );
}