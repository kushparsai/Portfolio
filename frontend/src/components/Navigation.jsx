import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { List, X } from "phosphor-react";

const navItems = [
  { name: "Home", href: "#hero", type: "scroll" },
  { name: "About", href: "#about", type: "scroll" },
  { name: "Projects", href: "#projects", type: "scroll" },
  { name: "Resume", href: "/resume.pdf", type: "resume" },
  { name: "Contact", href: "#contact", type: "scroll" },
  { name: "Experience", href: "#experience", type: "scroll" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const openResume = () => {
    window.open(
      `${window.location.origin}/resume.pdf`,
      "_blank",
      "noopener,noreferrer"
    );
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "glass-card" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">KUSH</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) =>
                item.type === "scroll" ? (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-foreground hover:text-primary transition-colors duration-300 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                ) : (
                  <button
                    key={item.name}
                    onClick={openResume}
                    className="text-foreground hover:text-primary transition-colors duration-300 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </button>
                )
              )}

              <Button
                onClick={() => scrollToSection("#contact")}
                className="bg-primary hover:bg-primary/80 text-primary-foreground glow-primary"
              >
                Hire Me
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <List size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="fixed inset-0 bg-background/95 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-20 left-0 right-0 bottom-0 bg-card p-6">
            <div className="flex flex-col space-y-6">
              {navItems.map((item) =>
                item.type === "scroll" ? (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-2xl text-foreground hover:text-primary transition-colors duration-300 text-left"
                  >
                    {item.name}
                  </button>
                ) : (
                  <button
                    key={item.name}
                    onClick={openResume}
                    className="text-2xl text-foreground hover:text-primary transition-colors duration-300 text-left"
                  >
                    {item.name}
                  </button>
                )
              )}

              <Button
                onClick={() => scrollToSection("#contact")}
                className="bg-primary hover:bg-primary/80 text-primary-foreground w-fit mt-8"
              >
                Hire Me
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navigation;