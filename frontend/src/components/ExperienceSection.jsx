import { Briefcase } from "phosphor-react";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-28 px-6 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-center mb-24">
          Experience
        </h2>

        {/* Cards Wrapper */}
        <div className="space-y-24">

          {/* ===== EXPERIENCE 1 ===== */}
          <div className="border border-gray-700 rounded-2xl p-12 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
            
            <div className="space-y-8">

              {/* Title */}
              <div className="flex items-center gap-4">
                <Briefcase size={26} className="text-blue-400" />
                <h3 className="text-2xl font-bold hover:text-blue-400 transition cursor-pointer">
                  Web Developer Intern
                </h3>
              </div>

              {/* Company */}
              <p className="text-gray-400 hover:text-blue-400 transition cursor-pointer">
                Elevate Labs • Nov 2025 – Dec 2025
              </p>

              {/* Points */}
              <ul className="space-y-5 text-gray-300">
                <li className="">
                  ▸ Developed responsive UI using React & Tailwind CSS
                </li>
                <li className="">
                  ▸ Integrated REST APIs and handled form validations
                </li>
                <li className="">
                  ▸ Improved website performance and accessibility
                </li>
              </ul>
            </div>
          </div>

          {/* ===== EXPERIENCE 2 ===== */}
          <div className="border border-gray-700 rounded-2xl p-12 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
            
            <div className="space-y-8">

              <div className="flex items-center gap-4">
                <Briefcase size={26} className="text-blue-400" />
                <h3 className="text-2xl font-bold hover:text-blue-400 transition cursor-pointer">
                  AI Agent Architect Trainee (Project-Based Learning)
                </h3>
              </div>

              <p className="text-gray-400 hover:text-blue-400 transition cursor-pointer">
                IBM SkillsBuild • Jul 2025 – Aug 2025
              </p>

              <ul className="">
                <li className="">
                  ▸ Completed 4-week Project-Based Learning program focused on Agentic AI
                </li>
                <li className="">
                  ▸ Designed, built, and deployed AI agents through guided projects
                </li>
              </ul>
            </div>
          </div>

          {/* ===== EXPERIENCE 3 ===== */}
          <div className="border border-gray-700 rounded-2xl p-12 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
            
            <div className="space-y-8">

              <div className="flex items-center gap-4">
                <Briefcase size={26} className="text-blue-400" />
                <h3 className="text-2xl font-bold hover:text-blue-400 transition cursor-pointer">
                  MERN Stack Development Trainee
                </h3>
              </div>

              <p className="text-gray-400 hover:text-blue-400 transition cursor-pointer">
                Grras Training Institute • Aug 2025 – Oct 2025
              </p>

              <ul className="space-y-5 text-gray-300">
                <li className="">
                  ▸ Completed college-based training in Full Stack Web Development
                </li>
                <li className="">
                  ▸ Worked on MERN stack projects with REST APIs & database integration
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
