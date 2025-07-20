'use client';

import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaPython, FaDatabase, FaGitAlt, FaDocker,
  FaHtml5, FaCss3Alt, FaJs, FaAws
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiMongodb, SiPostgresql, 
  SiTailwindcss, SiExpress, SiRedis, SiGraphql,
  SiFirebase, SiVercel
} from 'react-icons/si';

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: FaReact, level: 90 },
        { name: "Next.js", icon: SiNextdotjs, level: 85 },
        { name: "TypeScript", icon: SiTypescript, level: 80 },
        { name: "JavaScript", icon: FaJs, level: 95 },
        { name: "HTML5", icon: FaHtml5, level: 95 },
        { name: "CSS3", icon: FaCss3Alt, level: 90 },
        { name: "Tailwind CSS", icon: SiTailwindcss, level: 85 }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: FaNodeJs, level: 85 },
        { name: "Python", icon: FaPython, level: 80 },
        { name: "Express.js", icon: SiExpress, level: 85 },
        { name: "GraphQL", icon: SiGraphql, level: 75 }
      ]
    },
    {
      title: "Database & Cloud",
      skills: [
        { name: "MongoDB", icon: SiMongodb, level: 80 },
        { name: "PostgreSQL", icon: SiPostgresql, level: 75 },
        { name: "Redis", icon: SiRedis, level: 70 },
        { name: "Firebase", icon: SiFirebase, level: 80 },
        { name: "AWS", icon: FaAws, level: 70 },
        { name: "Vercel", icon: SiVercel, level: 85 }
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", icon: FaGitAlt, level: 90 },
        { name: "Docker", icon: FaDocker, level: 75 },
        { name: "Database Design", icon: FaDatabase, level: 80 }
      ]
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-purple-400"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <h3 className="text-2xl font-semibold mb-6 text-purple-300">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon className="text-2xl text-blue-400" />
                        <span className="text-gray-800 dark:text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-purple-300 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + skillIndex * 0.05 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-white/70 text-lg">
            Always learning and exploring new technologies to stay at the forefront of web development.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
