'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Repository {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/MasterYoav/repos');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="min-h-screen bg-black/20 backdrop-blur-sm py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-orange-300">Projects</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-600/10 to-orange-600/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:from-purple-600/20 hover:to-orange-600/20 transition-all duration-300"
              >
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block p-6">
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">{repo.name}</h3>
                  <p className="text-white/70 mb-4 h-20 overflow-hidden">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300">
                      {repo.language || 'N/A'}
                    </span>
                    <span className="flex items-center text-orange-300">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {repo.stargazers_count}
                    </span>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 