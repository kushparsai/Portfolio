import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
  PaperPlaneTilt,
} from "phosphor-react";

const ContactSection = () => {
  const formRef = useRef(null);
  const socialRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!formRef.current || !socialRef.current) return;

    gsap.fromTo(
      formRef.current,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );

    gsap.fromTo(
      socialRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.6 }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      setStatus("Message sent successfully ✅");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("❌ Frontend error:", err);
      setStatus("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 text-white"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 text-white"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded flex justify-center items-center gap-2"
            >
              <PaperPlaneTilt size={20} />
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p className="text-center text-sm mt-2">{status}</p>
            )}
          </form>

          {/* Social & Info */}
          <div ref={socialRef} className="space-y-6">
            <p>Email: kushparsai1@gmail.com</p>
            <p>Phone: +91 8112218853</p>
            <p>Location: Udaipur, Rajasthan</p>

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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
