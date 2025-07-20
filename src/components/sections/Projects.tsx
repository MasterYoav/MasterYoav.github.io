'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PixelCard from '@/components/ui/PixelCard';

/**
 * Repository interface for GitHub API response
 */
interface Repository {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  homepage?: string;
}

/**
 * Static project data for featured projects
 * These are manually curated projects with custom images and descriptions
 */
const featuredProjects = [
  {
    title: 'Interactive Portfolio',
    description: 'A modern portfolio website built with Next.js, TypeScript, and Framer Motion',
    image: '/projects/portfolio.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    demoUrl: 'https://yoavperetz.com',
    githubUrl: 'https://github.com/MasterYoav/interactive-portfolio'
  },
  // Add more featured projects here
];

/**
 * Projects Section Component
 * 
 * Displays a grid of projects using the PixelCard component.
 * Features:
 * - Projects showcase with GitHub integration
 * - Fetches repositories from GitHub API
 * - Displays featured projects with custom data
 * - Responsive grid layout
 * - Loading state
 * 
 * @component
 * @returns {JSX.Element} Projects section
 */
export default function Projects() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches repositories from GitHub API
   * Filters and sorts repositories for display
   */
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/MasterYoav/repos');
        const data = await response.json();
        
        // Filter out forked repos and sort by stars
        const filteredRepos = data
          .filter((repo: any) => !repo.fork)
          .sort((a: Repository, b: Repository) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6); // Limit to top 6 repos
        
        setRepos(filteredRepos);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-orange-300">Projects</h2>
          <p className="text-lg text-white/70">Here are some of my recent works</p>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <>
                <h3 className="text-2xl font-semibold text-purple-300 mb-6">Featured</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PixelCard {...project} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
            
            {/* GitHub Repositories */}
            <h3 className="text-2xl font-semibold text-purple-300 mb-6">Open Source</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PixelCard
                    title={repo.name}
                    description={repo.description || 'No description available'}
                    image={`https://opengraph.githubassets.com/1/${repo.html_url.replace('https://github.com/', '')}`}
                    tags={repo.language ? [repo.language] : []}
                    demoUrl={repo.homepage}
                    githubUrl={repo.html_url}
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
} 