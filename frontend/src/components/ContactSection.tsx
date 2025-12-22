import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GithubLogo, LinkedinLogo, TwitterLogo, PaperPlaneTilt } from 'phosphor-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        socialRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: socialRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      toast({
        title: "Message sent!",
        description: "Your message has been saved successfully.",
      });

      setFormData({ name: '', email: '', message: '' });

      const submitBtn = formRef.current?.querySelector('button[type="submit"]');
      if (submitBtn) {
        gsap.to(submitBtn, {
          scale: 1.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out'
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send Message</h3>

              <div className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/80 text-primary-foreground glow-primary group"
                >
                  <PaperPlaneTilt size={20} className="mr-2" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </div>
          </form>

          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Info</h3>
              <p className="text-muted-foreground">kushparsai1@gmail.com</p>
              <p className="text-muted-foreground">+91 8112218853</p>
              <p className="text-muted-foreground">Udaipur, Raj.</p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Follow Me</h3>
              <div ref={socialRef} className="flex gap-4">
                <Button variant="outline" size="icon"><GithubLogo size={20} /></Button>
                <Button variant="outline" size="icon"><LinkedinLogo size={20} /></Button>
                <Button variant="outline" size="icon"><TwitterLogo size={20} /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
