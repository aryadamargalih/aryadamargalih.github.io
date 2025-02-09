import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Clock,
  MapPin,
  Phone,
  Award,
  Code,
  Briefcase,
  Layers,
  Book,
  ChevronDown,
} from "lucide-react";

import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiPhp,
  SiJavascript,
  SiTailwindcss,
  SiLaravel,
  SiCodeigniter,
  SiMysql,
  SiGit,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiMongodb,
  SiFirebase,
} from "react-icons/si";
import Notification from "./Notification";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [typedText, setTypedText] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const fullText = "Informatics Student | Web Developer | Digital Creative";

  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Updated handleSubmit function for Formspree
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xbldkkea", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setNotification({
          isVisible: true,
          message: "✨ Message sent successfully! We'll get back to you soon.",
          type: "success",
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      setNotification({
        isVisible: true,
        message: "🌠 Oops! Message failed to send. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this function to handle closing the notification
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  //Nav Active
  const sectionRefs = {
    home: useRef(null),
    skills: useRef(null),
    portfolio: useRef(null),
    experience: useRef(null),
    contact: useRef(null),
  };

  // Function to handle smooth scroll
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Close menu before scrolling
      setIsMenuOpen(false);
      // Add a small delay to ensure menu closing animation completes
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }, 100);
    }
  };

  // Scroll progress
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    // Handle scroll progress calculation
    const totalScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(
      100,
      Math.max(0, (window.scrollY / totalScroll) * 100)
    );
    setScrollProgress(progress);

    // Check each section's position
    Object.entries(sectionRefs).forEach(([sectionId, ref]) => {
      if (ref.current) {
        const { offsetTop, offsetHeight } = ref.current;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(sectionId);
        }
      }
    });
  }, []);

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Add refs to sections
  useEffect(() => {
    Object.keys(sectionRefs).forEach((sectionId) => {
      sectionRefs[sectionId].current = document.getElementById(sectionId);
    });
  }, []);

  // Typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Particle effect component
  const ParticleField = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Optimize canvas size and resolution
      const dpr = window.devicePixelRatio || 1;
      const resizeCanvas = () => {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(dpr, dpr);
      };
      resizeCanvas();

      const particles = [];
      // Reduce particle count for better performance
      const particleCount = Math.min(
        300,
        Math.floor((window.innerWidth * window.innerHeight) / 10000)
      );
      const mouseRadius = 100;

      class Particle {
        constructor() {
          this.init();
          // Randomize initial positions across the screen
          this.x = Math.random() * (canvas.width / dpr);
          this.y = Math.random() * (canvas.height / dpr);
        }

        init() {
          this.x = Math.random() * (canvas.width / dpr);
          this.y = Math.random() * (canvas.height / dpr);
          this.size = Math.random() * 1.5 + 0.5;
          this.speedX = (Math.random() - 0.5) * 0.5;
          this.speedY = (Math.random() - 0.5) * 0.5;
          this.glowing = false;
          // Add base opacity for smoother appearance
          this.baseOpacity = 0.3 + Math.random() * 0.4;
        }

        update() {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            const pushX = Math.cos(angle) * force * 3;
            const pushY = Math.sin(angle) * force * 3;

            this.x -= pushX;
            this.y -= pushY;
            this.glowing = true;
          } else {
            this.glowing = false;
          }

          // Update position
          this.x += this.speedX;
          this.y += this.speedY;

          // Improved edge wrapping
          if (this.x < 0) this.x = canvas.width / dpr;
          if (this.x > canvas.width / dpr) this.x = 0;
          if (this.y < 0) this.y = canvas.height / dpr;
          if (this.y > canvas.height / dpr) this.y = 0;
        }

        draw() {
          const opacity = this.glowing ? 0.8 : this.baseOpacity;
          if (this.glowing) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(100, 255, 255, 0.5)";
            ctx.fillStyle = `rgba(100, 255, 255, ${opacity})`;
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(100, 255, 255, ${opacity})`;
          }

          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Initialize particles
      const init = () => {
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
        particlesRef.current = particles;
      };

      // Optimized animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

        particlesRef.current.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      // Optimized event handlers
      const handleMouseMove = (event) => {
        mouseRef.current.x = event.clientX;
        mouseRef.current.y = event.clientY;
      };

      const handleTouchMove = (event) => {
        mouseRef.current.x = event.touches[0].clientX;
        mouseRef.current.y = event.touches[0].clientY;
      };

      // Throttled resize handler
      let resizeTimeout;
      const handleResize = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          resizeCanvas();
          particlesRef.current.forEach((particle) => particle.init());
        }, 200);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("resize", handleResize);

      // Start animation
      init();
      animate();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("resize", handleResize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (resizeTimeout) clearTimeout(resizeTimeout);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "transparent",
          zIndex: 0,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    );
  };

  // Stats data
  const stats = [
    { icon: <Layers />, value: "7+", label: "Personal Projects" }, // Layers icon lebih cocok untuk proyek
    { icon: <Book />, value: "100+", label: "Study Hours" }, // Book icon untuk jam belajar
    { icon: <Code />, value: "2+", label: "Languages Learned" }, // Code icon tetap cocok untuk bahasa pemrograman
    { icon: <Award />, value: "3+", label: "Course Certificates" }, // Award icon tetap cocok untuk sertifikat
  ];

  // Skills data
  const skills = [
    {
      name: "HTML5",
      description:
        "Creating semantic and accessible web structure with modern HTML5 features and best practices.",
      category: "Frontend",
      icon: <SiHtml5 className="w-10 h-10 text-[#E34F26]" />,
      color: "bg-[#E34F26]",
    },
    {
      name: "CSS3",
      description:
        "Styling web applications with modern CSS features, flexbox, grid, and responsive design.",
      category: "Frontend",
      icon: <SiCss3 className="w-10 h-10 text-[#1572B6]" />,
      color: "bg-[#1572B6]",
    },
    {
      name: "JavaScript",
      description:
        "Creating interactive web applications with modern ES6+ features and asynchronous programming.",
      category: "Programming Language",
      icon: <SiJavascript className="w-10 h-10 text-[#F7DF1E]" />,
      color: "bg-[#F7DF1E]",
    },
    {
      name: "PHP",
      description:
        "Server-side scripting for web applications with object-oriented programming and MVC patterns.",
      category: "Backend Language",
      icon: <SiPhp className="w-10 h-10 text-[#777BB4]" />,
      color: "bg-[#777BB4]",
    },
    {
      name: "Bootstrap",
      description:
        "Rapid UI development with responsive components and customizable design framework.",
      category: "CSS Framework",
      icon: <SiBootstrap className="w-10 h-10 text-[#7952B3]" />,
      color: "bg-[#7952B3]",
    },
    {
      name: "React",
      description:
        "Building modern, responsive web applications with component-based architecture and state management.",
      category: "Frontend Framework",
      icon: <FaReact className="w-10 h-10 text-[#61DAFB]" />,
      color: "bg-[#61DAFB]",
    },
    {
      name: "Node.js",
      description:
        "Developing server-side applications and RESTful APIs with Express.js and npm ecosystem.",
      category: "Backend Runtime",
      icon: <FaNodeJs className="w-10 h-10 text-[#339933]" />,
      color: "bg-[#339933]",
    },
    {
      name: "TailwindCSS",
      description:
        "Building responsive interfaces with utility-first CSS framework and custom design systems.",
      category: "CSS Framework",
      icon: <SiTailwindcss className="w-10 h-10 text-[#06B6D4]" />,
      color: "bg-[#06B6D4]",
    },
    {
      name: "Laravel",
      description:
        "Full-stack web development with elegant syntax, MVC architecture, and robust ecosystem.",
      category: "PHP Framework",
      icon: <SiLaravel className="w-10 h-10 text-[#FF2D20]" />,
      color: "bg-[#FF2D20]",
    },
    {
      name: "CodeIgniter",
      description:
        "Lightweight PHP framework for building dynamic web applications with MVC pattern.",
      category: "PHP Framework",
      icon: <SiCodeigniter className="w-10 h-10 text-[#EF4223]" />,
      color: "bg-[#EF4223]",
    },
    {
      name: "MySQL",
      description:
        "Database design and management with SQL queries, relationships, and optimization.",
      category: "Database",
      icon: <SiMysql className="w-10 h-10 text-[#4479A1]" />,
      color: "bg-[#4479A1]",
    },
    {
      name: "Git",
      description:
        "Version control and collaboration with branching strategies and team workflow.",
      category: "Development Tool",
      icon: <SiGit className="w-10 h-10 text-[#F05032]" />,
      color: "bg-[#F05032]",
    },
    {
      name: "MongoDB",
      description:
        "NoSQL database implementation for scalable applications with flexible document-based storage.",
      category: "Database",
      icon: <SiMongodb className="w-10 h-10 text-[#47A248]" />,
      color: "bg-[#47A248]",
    },
    {
      name: "Firebase",
      description:
        "Cloud-based platform for building web and mobile applications with real-time database and authentication.",
      category: "Database",
      icon: <SiFirebase className="w-10 h-10 text-[#FFCA28]" />,
      color: "bg-[#FFCA28]",
    },
  ];

  // Project data with enhanced details
  const projects = [
    {
      title: "Bakatku",
      description:
        "A talent discovery platform that helps users explore and identify their natural abilities and potential through interactive assessments and personalized insights",
      tech: ["React", "Node.js", "MongoDB", "TailwindCSS"],
      image: "./project1.png",
      link: "#",
      github: "#",
      featured: true,
    },
    {
      title: "News",
      description:
        "Modern news platform delivering curated, real-time information across multiple categories with an intuitive reading experience",
      tech: ["Laravel", "TailwindCSS", "MySql"],
      image: "./project2.png",
      link: "#",
      github: "#",
      featured: false,
    },
    {
      title: "Perpustakaan",
      description:
        "Digital library management system streamlining book lending, member tracking, and inventory management with a user-friendly interface",
      tech: ["Code Igniter", "CSS", "MySql"],
      image: "./project3.png",
      link: "#",
      github: "#",
      featured: false,
    },
  ];

  // Experience data
  const experiences = [];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <ParticleField />

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 z-50 transition-all duration-75"
        style={{
          width: `${scrollProgress}%`,
          willChange: "width",
          transform: "translateZ(0)",
        }}
      />

      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            >
              ADG
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["home", "skills", "portfolio", "experience", "contact"].map(
                (item) => (
                  <motion.a
                    key={item}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item);
                    }}
                    href={`#${item}`}
                    className={`capitalize cursor-pointer transition-all duration-300 ${
                      activeSection === item
                        ? "text-cyan-400 border-b-2 border-cyan-400"
                        : "text-white hover:text-cyan-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item}
                  </motion.a>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-800"
            >
              <div className="px-4 py-2 space-y-2">
                {["home", "skills", "portfolio", "experience", "contact"].map(
                  (item) => (
                    <motion.a
                      key={item}
                      onClick={() => scrollToSection(item)} // Remove preventDefault
                      href={`#${item}`}
                      className={`block py-2 capitalize cursor-pointer transition-all duration-300 ${
                        activeSection === item
                          ? "text-cyan-400 border-l-2 border-cyan-400 pl-2"
                          : "text-white hover:text-cyan-400 pl-2"
                      }`}
                      whileHover={{ x: 10 }}
                    >
                      {item}
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={sectionRefs.home}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-cyan-400 relative group"
          >
            <img
              src="./profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Arya Damar Galih
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-cyan-400 mb-8"
          >
            {typedText}
            <span className="animate-blink">|</span>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center gap-2 hover:brightness-110 transition-all group"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              Download CV
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-cyan-400 rounded-full flex items-center justify-center gap-2 hover:bg-cyan-400/20 transition-all group"
            >
              <Mail size={20} className="group-hover:animate-pulse" />
              Contact Me
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-800/50 backdrop-blur-lg rounded-xl hover:bg-slate-800/70 transition-all"
              >
                <div className="text-cyan-400 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={sectionRefs.skills} className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Skills & Expertise
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-xl hover:bg-slate-800/70 transition-all group relative overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div
                    className={`w-20 h-20 rounded-full ${skill.color}`}
                  ></div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="mr-4 p-3 bg-slate-700 rounded-full">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-1 group-hover:text-white transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-xs px-3 py-1 bg-cyan-400/20 text-cyan-300 rounded-full">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        ref={sectionRefs.portfolio}
        className="py-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden group relative"
              >
                <div className="relative aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="flex space-x-3">
                        <motion.a
                          href={project.github}
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-cyan-400/20 rounded-full hover:bg-cyan-400/30 transition-all"
                        >
                          <Github size={20} className="text-cyan-400" />
                        </motion.a>
                        <motion.a
                          href={project.link}
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-cyan-400/20 rounded-full hover:bg-cyan-400/30 transition-all"
                        >
                          <ExternalLink size={20} className="text-cyan-400" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-cyan-400/20 rounded-full text-xs text-cyan-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        ref={sectionRefs.experience}
        className="py-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Work Experience
          </motion.h2>

          {experiences.length > 0 ? (
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-xl hover:bg-slate-800/70 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-cyan-400">
                        {exp.role}
                      </h3>
                      <p className="text-gray-400">{exp.company}</p>
                    </div>
                    <div className="flex items-center text-gray-400 mt-2 md:mt-0">
                      <Clock size={16} className="mr-2" />
                      {exp.duration}
                    </div>
                  </div>
                  <p className="text-gray-300">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-12 bg-slate-800/50 backdrop-blur-lg rounded-xl"
            >
              <div className="inline-block p-4 bg-cyan-400/20 rounded-full mb-6">
                <Briefcase className="w-12 h-12 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                Coming Soon
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                My professional journey is about to begin. Stay tuned for
                updates on my work experiences and achievements.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={sectionRefs.contact}
        className="py-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-slate-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email@example.com"
                  className="w-full px-4 py-3 bg-slate-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4 p-6 bg-slate-800/50 backdrop-blur-lg rounded-xl hover:bg-slate-800/70 transition-all">
                <div className="w-12 h-12 flex items-center justify-center bg-cyan-400/20 rounded-full">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-400">damararya344@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-6 bg-slate-800/50 backdrop-blur-lg rounded-xl hover:bg-slate-800/70 transition-all">
                <div className="w-12 h-12 flex items-center justify-center bg-cyan-400/20 rounded-full">
                  <Phone className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-400">+62</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-6 bg-slate-800/50 backdrop-blur-lg rounded-xl hover:bg-slate-800/70 transition-all">
                <div className="w-12 h-12 flex items-center justify-center bg-cyan-400/20 rounded-full">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-gray-400">Medan, Indonesia</p>
                </div>
              </div>

              <div className="flex space-x-4 p-6 bg-slate-800/50 backdrop-blur-lg rounded-xl">
                <motion.a
                  href="https://github.com/aryadamargalih/"
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 flex items-center justify-center bg-cyan-400/20 rounded-full hover:bg-cyan-400/30 transition-all"
                >
                  <Github className="w-6 h-6 text-cyan-400" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/arya-damar-191229300/"
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 flex items-center justify-center bg-cyan-400/20 rounded-full hover:bg-cyan-400/30 transition-all"
                >
                  <Linkedin className="w-6 h-6 text-cyan-400" />
                </motion.a>
                <motion.a
                  href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=damararya344@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 flex items-center justify-center bg-cyan-400/20 rounded-full hover:bg-cyan-400/30 transition-all"
                >
                  <Mail className="w-6 h-6 text-cyan-400" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 Portfolio. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Notification
        isVisible={notification.isVisible}
        message={notification.message}
        type={notification.type}
        onClose={handleCloseNotification}
      />
    </div>
  );
}

export default App;
