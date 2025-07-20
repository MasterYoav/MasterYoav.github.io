'use client';

import { motion } from 'framer-motion';
import { FaCode, FaLightbulb, FaRocket, FaUsers } from 'react-icons/fa';

/**
 * About Section Component
 * 
 * Displays information about the developer including:
 * - Personal introduction
 * - Experience statistics
 * - Core values/features
 * 
 * @component
 * @returns {JSX.Element} The About section
 */
export default function About() {
  /**
   * Features/values array
   * Each item represents a core value or skill with an icon and description
   */
  const features = [
    {
      icon: FaCode,
      title: "Clean Code Advocate",
      description: "I believe in writing maintainable, scalable code that follows best practices and industry standards."
    },
    {
      icon: FaLightbulb,
      title: "Problem Solver",
      description: "I enjoy tackling complex challenges and finding innovative solutions to technical problems."
    },
    {
      icon: FaRocket,
      title: "Fast Learner",
      description: "Always eager to learn new technologies and frameworks to stay current in the ever-evolving tech landscape."
    },
    {
      icon: FaUsers,
      title: "Team Player",
      description: "I thrive in collaborative environments and believe great products are built by great teams."
    }
  ];

  return (
    <section id="about" className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-purple-400"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-purple-300">Passionate Full Stack Developer</h3>
            <p className="text-gray-700 dark:text-white/80 mb-4">
              Hi! I'm Yoav Peretz, a dedicated full stack developer with a passion for creating 
              beautiful, functional web applications. With expertise in modern web technologies, 
              I transform ideas into reality through clean, efficient code.
            </p>
            <p className="text-gray-700 dark:text-white/80 mb-4">
              My journey in software development has equipped me with a diverse skill set spanning 
              front-end frameworks like React and Next.js, back-end technologies including Node.js 
              and Python, and database management systems.
            </p>
            <p className="text-gray-700 dark:text-white/80">
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 font-semibold">Experience</span>
                  <span className="text-blue-400">3+ Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 font-semibold">Projects Completed</span>
                  <span className="text-blue-400">20+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 font-semibold">Technologies</span>
                  <span className="text-blue-400">15+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 font-semibold">Open Source Contributions</span>
                  <span className="text-blue-400">10+</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm rounded-xl p-6 hover:from-purple-600/20 hover:to-blue-600/20 transition-all duration-300"
            >
              <feature.icon className="text-4xl text-blue-400 mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-purple-300">{feature.title}</h4>
              <p className="text-gray-600 dark:text-white/70 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
