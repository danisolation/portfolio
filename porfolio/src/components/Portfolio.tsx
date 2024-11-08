"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type MediaItem = {
  type: "image" | "video";
  url: string;
};

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
  description: string;
  technologies: string[];
  role: string[];
  media: MediaItem[];
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? selectedProject!.media.length - 1 : prevIndex - 1
    );
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === selectedProject!.media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleViewProject = (project: Project) => {
    setCurrentMediaIndex(0);
    setSelectedProject(project);
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "Shub",
      category: "web",
      image: "/images/shub.png",
      link: "https://github.com/AKflower/Shub",
      description: ` "Shub" is short for Secret Hub. Shub is a document storage and management system built on the Blockchain
        platform, providing a secure and transparent solution for managing your
        organization's confidential documents.`,
      technologies: [
        "Next.js",
        "NestJS",
        "IPFS",
        "Hyperledger Fabric Blockchain",
      ],
      role: ["Front-end Developer", "IPFS"],
      media: [
        { type: "image", url: "/images/shub.png" },
        { type: "image", url: "/images/MainScreen.png" },
        { type: "image", url: "/images/Setting.png" },
        { type: "image", url: "/images/UserManage.png" },
      ],
    },
    {
      id: 2,
      title: "Forsaken",
      category: "web",
      image: "/images/forsaken.png",
      link: "https://github.com/danisolation/app",
      description:
        "Design and build a smart home monitoring and control system thatautomates electronic devices and provides security monitoringand protection. The system integrates sensors, control devices, mobile applications and computers to create a smart, flexible and convenient system.",
      technologies: ["React", "Node.js", "MongoDB", "Adafruit.io"],
      role: ["Front-end Developer", "IPFS"],
      media: [
        { type: "image", url: "/images/forsaken.png" },
        { type: "image", url: "/images/webdashboard.PNG" },
        { type: "image", url: "/images/sensorweb.PNG" },
        { type: "image", url: "/images/conditionerweb.PNG" },
      ],
    },
    {
      id: 3,
      title: "EventHub",
      category: "web",
      image: "/images/EH.png",
      link: "https://github.com/AKflower/EventHub",
      description:
        "EventHub is a comprehensive solution that helps you easily manage every aspect of your event, from planning and promotion  to ticket sales and attendee engagement. With its user-friendly interface and powerful features, EventHub empowers you to create memorable experiences for both organizers and attendees.",
      technologies: ["React", "Node.js", "Express", "PostgreSQL"],
      role: ["Back-end Developer"],
      media: [
        { type: "image", url: "/images/EH.png" },
        { type: "image", url: "/images/demo.gif" },
      ],
    },
    {
      id: 4,
      title: "ClinidShed",
      category: "web",
      image: "/images/CS.jpg",
      link: "https://github.com/AKflower/Clinic-Sched",
      description: `Clinic-Sched is a clinic appointment management application
                developed to make booking and managing appointments easier for
                both patients and doctors. With Clinic-Sched, patients can
                search for doctors by specialty, book appointments online, and
                receive appointment reminders. In addition, doctors and
                administrators can easily manage their schedules, confirm,
                change, or cancel appointments.`,
      technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
      role: ["Back-end Developer"],
      media: [
        { type: "image", url: "/images/CS.jpg" },
        { type: "image", url: "/images/login.png" },
        { type: "image", url: "/images/first.png" },
        { type: "image", url: "/images/cd.png" },
        { type: "image", url: "/images/dl.png" },
        { type: "image", url: "/images/hoso.png" },
        { type: "image", url: "/images/user.png" },
      ],
    },
    {
      id: 5,
      title: "Mall",
      category: "web",
      image: "/images/mall.png",
      link: "https://github.com/AKflower/mall",
      description: `Mall is a comprehensive shopping mall management system designed
                to help managers easily monitor and operate the operations of
                booths, tenants, and revenue. The application provides optimal
                management tools for booth management, lease contracts, and
                customer service support in a modern and user-friendly
                interface.`,
      technologies: ["React", "ASP.NET", "PostgreSQL"],
      role: ["Back-end Developer"],
      media: [
        { type: "image", url: "/images/mall.png" },
        { type: "image", url: "/images/mall.gif" },
      ],
    },
  ];

  const education: Education[] = [
    {
      degree: "Bachelor of Computer Science Engineering",
      institution: "Bach Khoa University",
      year: "2020 - 2024",
      description:
        "Focused on software engineering and computer science fundamentals. Completed various projects in web development, algorithms, and data structures.",
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px", // Adjust this to change when the section is considered "active"
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4">
          <ul className="flex justify-center space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-colors duration-300 ${
                    activeSection === item.href.slice(1)
                      ? "text-blue-400 font-bold"
                      : "text-white hover:text-blue-400"
                  }`}
                  onClick={(e) => handleClick(e, item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section
          id="home"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold mb-4"
            >
              Tran Quoc Dung
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Software Developer
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a
                href="#contact"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
              >
                Get in touch
              </a>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image
                  src="/images/pro5.jpg"
                  alt="Tran Quoc Dung"
                  className="rounded-full mx-auto"
                  width={400}
                  height={400}
                />
              </div>
              <div className="md:w-1/2">
                <p className="text-lg mb-4">
                  Hello! I&apos;m Tran Quoc Dung, a passionate Software
                  Developer with a strong focus on creating efficient and
                  innovative solutions. I specialize in JavaScript (including
                  React library, NodeJS, NestJS, NextJS) and ASP.NET.{" "}
                </p>
                <p className="text-lg mb-4">
                  My journey began at Bach Khoa University, where I majored in
                  Computer Science Engineer. During my studies, I developed a
                  passion for software technology and completed various projects
                  that laid the foundation for my career, and since then, I have
                  been continuously honing my skills and expanding my knowledge.
                  I thrive in dynamic environments where I can challenge myself
                  and collaborate with others to bring ideas to life.
                </p>
                <p className="text-lg mb-4">
                  Beyond coding, I enjoy learning about new technologies, which
                  keeps me inspired and motivated to always deliver my best
                  work.{" "}
                </p>
                <p className="text-lg mb-4">
                  I&apos;m excited to share my portfolio with you, showcasing
                  some of the projects I&apos;ve been working on. Let&apos;s
                  create something amazing together!
                </p>
                <h3 className="text-2xl font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "devicon:cplusplus",
                    "devicon:javascript",
                    "devicon:csharp",
                    "devicon:html5",
                    "devicon:css3",
                    "devicon:react",
                    "devicon:nodejs",
                    "devicon:nextjs",
                    "devicon:express",
                    "devicon:nestjs",
                    "devicon:dotnetcore",
                    "devicon:mongodb",
                    "devicon:postgresql",
                    "devicon:mysql",
                  ].map((skill, index) => (
                    <span key={index}>
                      <Icon icon={skill} style={{ fontSize: "36px" }} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setActiveTab("all")}
                className={`mx-2 px-4 py-2 rounded-full ${
                  activeTab === "all" ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                All
              </button>
              {/* <button
                onClick={() => setActiveTab("game")}
                className={`mx-2 px-4 py-2 rounded-full ${
                  activeTab === "game" ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                Games
              </button> */}
              <button
                onClick={() => setActiveTab("web")}
                className={`mx-2 px-4 py-2 rounded-full ${
                  activeTab === "web" ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                Web
              </button>
              {/* <button
                onClick={() => setActiveTab("ai")}
                className={`mx-2 px-4 py-2 rounded-full ${
                  activeTab === "ai" ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                AI
              </button> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => handleViewProject(project)}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    width={10000}
                    height={10000}
                    unoptimized
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {project.description.substring(0, 100)}...
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on GitHub
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="education"
          className="min-h-screen py-20 bg-gray-800 flex items-center"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-6 shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                  <p className="text-blue-400 mb-2">{edu.institution}</p>
                  <p className="text-gray-400 mb-4">{edu.year}</p>
                  <p className="text-gray-300">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen py-20 flex items-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Get in Touch
            </h2>
            <div className="flex flex-col items-center">
              <p className="text-lg mb-6 text-center">
                I&apos;m always open to new opportunities and collaborations.
                Feel free to reach out!
              </p>
              <div className="flex space-x-6">
                <a
                  href="mailto:tranquocdungb4@gmail.com"
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Mail size={24} />
                </a>
                <a
                  href="https://github.com/danisolation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/tr%E1%BA%A7n-qu%E1%BB%91c-d%C5%A9ng-5317a1277/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="tel:+84327585534"
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Phone size={24} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Tran Quoc Dung. All rights reserved.</p>
        </div>
      </footer>

      <a
        href="#home"
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
      >
        <ChevronDown size={24} className="transform rotate-180" />
      </a>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-gray-800 p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="relative mb-4">
                <Image
                  src={selectedProject.media[currentMediaIndex].url}
                  alt={`${selectedProject.title} - Image ${
                    currentMediaIndex + 1
                  }`}
                  className="w-full h-64 object-cover rounded-lg"
                  width={10000}
                  height={10000}
                  unoptimized
                />

                {selectedProject.media.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrevMedia}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNextMedia}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
              </div>

              <p className="text-gray-300 mb-4">
                {selectedProject.description}
              </p>
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">
                  Technologies Used:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Role:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.role.map((role, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 px-3 py-1 rounded-full text-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                asChild
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors flex items-center space-x-2"
              >
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  <span>View on GitHub</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--scrollbar-track);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--scrollbar-thumb);
          border-radius: 4px;
          border: 2px solid var(--scrollbar-track);
        }

        :root {
          --scrollbar-track: rgba(255, 255, 255, 0.1);
          --scrollbar-thumb: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
