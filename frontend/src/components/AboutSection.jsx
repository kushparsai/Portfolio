import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Globe, Palette, Rocket } from "phosphor-react";
import profileImage from "@/assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: Code, name: "Python" },
  { icon: Code, name: "SQL" },
  { icon: Palette, name: "HTML & CSS" },
  { icon: Rocket, name: "JavaScript" },
  { icon: Globe, name: "React" },
  { icon: Code, name: "Node.js" },
];

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0, rotationY: -15 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        skillsRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative w-80 h-80 rounded-full overflow-hidden glass-card p-2 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={profileImage}
                  alt="Kush Parsai"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                About Me
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Hardworking and passionate job seeker with strong organizational
                skills, eager to secure an entry-level web development position
                where I can apply my technical skills and creativity to help the
                team achieve company goals and grow professionally.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                With a keen eye for detail and a love for innovation, I transform
                ideas into powerful web applications that engage users and drive
                results.
              </p>
            </div>

            {/* Skills */}
            <div ref={skillsRef} className="grid grid-cols-2 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="glass-card p-6 hover:glow-primary transition-all duration-300 group"
                >
                  <div className="flex items-center">
                    <skill.icon
                      size={32}
                      className="text-primary mr-3 group-hover:text-accent transition-colors duration-300"
                    />
                    <span className="font-semibold text-foreground">
                      {skill.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;