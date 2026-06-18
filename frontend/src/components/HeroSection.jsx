import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const splineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Hero animations
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out",
      }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .fromTo(
        splineRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        "-=1"
      );

    // Floating orbs animation
    gsap.to(".hero-orb", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.2,
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Spline 3D */}
      <div ref={splineRef} className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/orb-KfYS7RKD8TfzlxU7EBeIkOn4/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ opacity: 0.7 }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="hero-orb floating-orb w-24 h-24 top-20 left-20 animate-float" />
      <div
        className="hero-orb floating-orb w-32 h-32 top-1/3 right-20 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="hero-orb floating-orb w-20 h-20 bottom-40 left-1/4 animate-float"
        style={{ animationDelay: "4s" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient leading-tight"
        >
          Hi, I'm Kush Parsai
          <br />
          <span className="text-foreground">Web Developer</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting digital experiences with cutting-edge technology and creative
          innovation
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-6 text-lg glow-primary animate-pulse-glow"
          >
            Get In Touch
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const element = document.querySelector("#projects");
              if (element)
                element.scrollIntoView({ behavior: "smooth" });
            }}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
          >
            View My Work
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;