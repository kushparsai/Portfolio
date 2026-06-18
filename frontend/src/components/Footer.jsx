import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  Heart,
} from "phosphor-react";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(".footer-particle", {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          amount: 2,
          from: "random",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-6 border-t border-border/50"
    >
      <div
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="footer-particle floating-orb w-12 h-12 top-10 left-1/4 opacity-20" />
        <div className="footer-particle floating-orb w-8 h-8 top-20 right-1/3 opacity-30" />
        <div className="footer-particle floating-orb w-16 h-16 bottom-20 left-1/2 opacity-15" />
        <div className="footer-particle floating-orb w-10 h-10 top-1/2 right-1/4 opacity-25" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div
              className="text-3xl font-bold text-gradient cursor-pointer"
              onClick={scrollToTop}
            >
              KUSH
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Crafting digital experiences with cutting-edge technology and
              creative innovation. Let&apos;s build the future together.
            </p>
            <div className="flex gap-5">
              <a
                href="https://github.com/kushparsai?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
              >
                <GithubLogo size={28} />
              </a>

               <a
                href="https://www.linkedin.com/in/kush-parsai-6696a624b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
              >
                <LinkedinLogo size={28} />
              </a>

               <a
                href="https://x.com/ParsaiKush58303"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition"
              >
                <TwitterLogo size={28} />
              </a>
             </div>
            </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 text-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Get In Touch
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>kushparsai1@gmail.com</p>
              <p>+91 8112218853</p>
              <p>Udaipur, Rajasthan</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Kush Parsai. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span>using React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
