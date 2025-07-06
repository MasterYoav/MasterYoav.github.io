'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Menu, X, Code, Palette, Zap, Star, GitFork } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GitHub API configuration
  const GITHUB_USERNAME = 'MasterYoav';
  const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

  // Fetch GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const response = await fetch(GITHUB_API_URL);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Filter and process repositories
        const filteredRepos = repos
          .filter(repo => !repo.fork && !repo.private) // Only original, public repos
          .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
          .slice(0, 6); // Get top 6 repos

        // Transform repos to project format
        const projectsData = filteredRepos.map(repo => ({
          title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: repo.description || 'No description available',
          tech: repo.language ? [repo.language] : ['JavaScript'], // GitHub only gives primary language
          image: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
          link: repo.homepage || repo.html_url,
          github: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          updated: new Date(repo.updated_at).toLocaleDateString()
        }));

        setProjects(projectsData);

        // Calculate skills based on languages used
        const languageStats = {};
        repos.forEach(repo => {
          if (repo.language) {
            languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
          }
        });

        // Convert to skills format
        const totalRepos = Object.values(languageStats).reduce((a, b) => a + b, 0);
        const topLanguages = Object.entries(languageStats)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 6)
          .map(([lang, count]) => ({
            name: lang,
            level: Math.round((count / totalRepos) * 100),
            icon: getLanguageIcon(lang),
            count: count
          }));

        setSkills(topLanguages);
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError('Failed to load GitHub data. Using sample data.');
        
        // Fallback to sample data
        setProjects([
          {
            title: "Sample Project",
            description: "Unable to fetch from GitHub. This is sample data.",
            tech: ["JavaScript", "React"],
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
            link: "#",
            github: "#",
            stars: 0,
            forks: 0
          }
        ]);
        
        setSkills([
          { name: "JavaScript", level: 85, icon: Code, count: 10 },
          { name: "React", level: 80, icon: Palette, count: 8 },
          { name: "Node.js", level: 75, icon: Zap, count: 6 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Get icon for programming language
  const getLanguageIcon = (language) => {
    const icons = {
      'JavaScript': Code,
      'TypeScript': Code,
      'Python': Code,
      'Java': Code,
      'C++': Code,
      'C#': Code,
      'HTML': Palette,
      'CSS': Palette,
      'React': Palette,
      'Vue': Palette,
      'Angular': Palette,
      'Node.js': Zap,
      'Express': Zap,
      'MongoDB': Zap,
      'PostgreSQL': Zap,
      'MySQL': Zap
    };
    return icons[language] || Code;
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MasterYoav
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section
                      ? 'text-purple-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                {['home', 'about', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="capitalize text-left py-2 text-slate-300 hover:text-white transition-colors"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className={`transition-all duration-1000 ${
            isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Hello, I'm
              </span>
              <br />
              <span className="text-white">Yoav</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Full-Stack Developer & Creative Technologist building innovative 
              digital experiences with code and creativity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-slate-400" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`transition-all duration-1000 ${
            isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Passionate about creating amazing digital experiences
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  I'm a dedicated developer who loves turning complex problems into 
                  simple, beautiful solutions. With expertise in both frontend and 
                  backend development, I create full-stack applications that make 
                  a real impact.
                </p>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, 
                  contributing to open-source projects, or experimenting with creative 
                  coding and digital art.
                </p>
                
                <div className="flex space-x-4">
                  <a href="https://github.com/MasterYoav" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors">
                    <Github size={24} />
                  </a>
                  <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                    <Mail size={24} />
                  </a>
                </div>
              </div>
              
              <div className="space-y-6">
                {loading ? (
                  // Loading skeleton for skills
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="bg-slate-900/50 p-6 rounded-lg animate-pulse">
                      <div className="flex items-center mb-4">
                        <div className="w-6 h-6 bg-slate-700 rounded mr-3"></div>
                        <div className="h-4 bg-slate-700 rounded w-32"></div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mb-2"></div>
                      <div className="h-3 bg-slate-700 rounded w-16"></div>
                    </div>
                  ))
                ) : (
                  skills.map((skill, index) => (
                    <div key={skill.name} className="bg-slate-900/50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <skill.icon className="text-purple-400 mr-3" size={24} />
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{skill.name}</h4>
                          <span className="text-slate-400 text-sm">
                            {skill.count} {skill.count === 1 ? 'project' : 'projects'}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: isVisible.about ? `${skill.level}%` : '0%',
                            transitionDelay: `${index * 200}ms`
                          }}
                        />
                      </div>
                      <span className="text-slate-400 text-sm mt-2 block">{skill.level}%</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`transition-all duration-1000 ${
            isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                // Loading skeleton
                Array(6).fill(0).map((_, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-lg overflow-hidden animate-pulse">
                    <div className="w-full h-48 bg-slate-700"></div>
                    <div className="p-6">
                      <div className="h-4 bg-slate-700 rounded mb-2"></div>
                      <div className="h-3 bg-slate-700 rounded mb-4"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-slate-700 rounded-full"></div>
                        <div className="h-6 w-20 bg-slate-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                projects.map((project, index) => (
                  <div
                    key={project.title}
                    className={`group bg-slate-800/50 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 ${
                      isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full transition-colors"
                        >
                          <Github size={16} />
                        </a>
                      </div>
                      
                      {/* GitHub stats overlay */}
                      <div className="absolute top-4 left-4 flex space-x-2">
                        {project.stars > 0 && (
                          <span className="bg-slate-900/80 text-white px-2 py-1 rounded-full text-xs flex items-center">
                            <Star size={12} className="mr-1" />
                            {project.stars}
                          </span>
                        )}
                        {project.forks > 0 && (
                          <span className="bg-slate-900/80 text-white px-2 py-1 rounded-full text-xs flex items-center">
                            <GitFork size={12} className="mr-1" />
                            {project.forks}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-slate-300 mb-4 text-sm">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.language && (
                          <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                            {project.language}
                          </span>
                        )}
                        {project.tech && project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.updated && (
                        <p className="text-slate-400 text-xs">Updated: {project.updated}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {error && (
              <div className="mt-8 p-4 bg-amber-900/20 border border-amber-500/50 rounded-lg">
                <p className="text-amber-300 text-center">{error}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 ${
            isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. 
              Let's create something amazing together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:your.email@example.com"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <Mail className="mr-2" size={20} />
                Send Email
              </a>
              <a
                href="https://github.com/MasterYoav"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
              >
                <Github className="mr-2" size={20} />
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2025 Yoav. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;