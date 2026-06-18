import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial animation
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
      .to(progressBarRef.current, {
        width: "100%",
        duration: 2.5,
        ease: "power2.out",
      })
      .to(
        textRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in",
        },
        "-=0.5"
      )
      .to(preloaderRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <div ref={textRef} className="mb-8">
          <h1 className="text-6xl font-bold text-gradient mb-4">KUSH</h1>
          <p className="text-muted-foreground text-lg tracking-wider">
            Loading Portfolio...
          </p>
        </div>

        <div className="w-80 h-1 bg-muted rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-0 glow-primary"
          />
        </div>
      </div>

      {/* Floating orbs */}
      <div className="floating-orb w-32 h-32 top-1/4 left-1/4 animate-float" />
      <div
        className="floating-orb w-24 h-24 top-3/4 right-1/4 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="floating-orb w-20 h-20 bottom-1/4 left-1/2 animate-float"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
};
export default Preloader;