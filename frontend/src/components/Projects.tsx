import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Code2, ExternalLink, Github, Star, GitFork } from 'lucide-react';
import LightRays from './LightRays';

const projects = [
    {
        title: 'HackPath',
        description: 'A competitive programming platform with real-time MCQ rounds, coding challenges, leaderboards, and countdown timers. Built for hackathons and tech competitions.',
        image: '🏆',
        tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
        github: 'https://github.com',
        live: 'https://example.com',
        stars: 48,
        forks: 12,
        featured: true,
        color: 'from-violet-500 to-indigo-500',
    },
    {
        title: 'DevCompiler',
        description: 'An online code execution environment supporting multiple languages. Features syntax highlighting, real-time output, and secure Docker-based sandboxing.',
        image: '⚡',
        tags: ['React', 'Monaco Editor', 'Python', 'Docker', 'WebSocket'],
        github: 'https://github.com',
        live: 'https://example.com',
        stars: 35,
        forks: 8,
        featured: true,
        color: 'from-cyan-500 to-blue-500',
    },
    {
        title: 'PixelUI',
        description: 'A modern component library with glassmorphism design, dark mode support, and smooth animations built with React and Tailwind CSS.',
        image: '🎨',
        tags: ['React', 'Tailwind CSS', 'Storybook', 'TypeScript'],
        github: 'https://github.com',
        live: 'https://example.com',
        stars: 62,
        forks: 19,
        featured: false,
        color: 'from-rose-500 to-orange-500',
    },
    {
        title: 'APIForge',
        description: 'A FastAPI boilerplate with JWT authentication, role-based access control, database migrations, and Swagger documentation built-in.',
        image: '🔧',
        tags: ['FastAPI', 'Python', 'PostgreSQL', 'JWT', 'Alembic'],
        github: 'https://github.com',
        live: 'https://example.com',
        stars: 29,
        forks: 11,
        featured: false,
        color: 'from-emerald-500 to-teal-500',
    },
    {
        title: 'QuizMaster',
        description: 'A real-time quiz application with WebSocket-based multiplayer, leaderboards, and custom quiz creation tools.',
        image: '🎯',
        tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        github: 'https://github.com',
        live: 'https://example.com',
        stars: 41,
        forks: 14,
        featured: false,
        color: 'from-amber-500 to-yellow-500',
    },
    {
        title: 'NoteVault',
        description: 'A minimal, keyboard-first notes app with markdown support, search, tagging, and local-first storage using IndexedDB.',
        image: '📝',
        tags: ['React', 'TypeScript', 'IndexedDB', 'Markdown'],
        github: 'https://github.com',
        live: 'https://example.com',
        stars: 23,
        forks: 7,
        featured: false,
        color: 'from-pink-500 to-rose-500',
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Projects() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });

    const featured = projects.filter(p => p.featured);
    const others = projects.filter(p => !p.featured);

    return (
        <section id="projects" className="py-24 relative">
            {/* Light Rays WebGL Effect */}
            <LightRays
                raysOrigin="left"
                raysColor="#fcf9ffff"
                raysSpeed={0.6}
                lightSpread={0.2}
                rayLength={3}
                pulsating={false}
                fadeDistance={1}
                saturation={1}
                followMouse={false}
                mouseInfluence={0.1}
                noiseAmount={0}
                distortion={0}
            />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6" ref={ref}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="section-badge">
                            <Code2 size={13} />
                            projects
                        </div>
                        <h2 className="section-title">Featured Work</h2>
                        <div className="section-divider" />
                        <p className="text-dark-300 max-w-xl">
                            Handpicked projects that showcase my expertise in building real-world applications at scale.
                        </p>
                    </motion.div>

                    {/* Featured Projects */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {featured.map((project) => (
                            <motion.div
                                key={project.title}
                                variants={itemVariants}
                                className="glass-card overflow-hidden group cursor-pointer"
                                whileHover={{ y: -8, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Project header gradient */}
                                <div className={`h-2 bg-gradient-to-r ${project.color}`} />

                                <div className="p-8">
                                    {/* Icon + meta */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl shadow-lg`}>
                                            {project.image}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-dark-300 text-xs">
                                                <Star size={13} className="text-yellow-400" />
                                                <span>{project.stars}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-dark-300 text-xs">
                                                <GitFork size={13} />
                                                <span>{project.forks}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-dark-300 text-sm leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 rounded-lg bg-dark-700 text-dark-200 text-xs font-medium border border-dark-600"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-3">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-dark-300 hover:text-white text-sm transition-colors"
                                        >
                                            <Github size={16} /> Code
                                        </a>
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm transition-colors ml-auto"
                                        >
                                            Live Demo <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Other Projects Grid */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <h3 className="text-lg font-bold text-dark-300 font-mono mb-6">// other_projects</h3>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {others.map((project) => (
                            <motion.div
                                key={project.title}
                                variants={itemVariants}
                                className="glass-card p-5 group flex flex-col cursor-pointer"
                                whileHover={{ y: -5, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl">{project.image}</span>
                                    <div className="flex gap-3">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-white transition-colors">
                                            <Github size={15} />
                                        </a>
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-primary-400 transition-colors">
                                            <ExternalLink size={15} />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary-300 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-dark-400 text-xs leading-relaxed flex-1 mb-4">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded bg-dark-700 text-dark-300 text-xs border border-dark-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* View All */}
                    <motion.div variants={itemVariants} className="text-center mt-12">
                        <a
                            href="https://github.com/Lalith9664"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary inline-flex"
                            id="projects-view-all"
                        >
                            <Github size={18} />
                            View All Projects on GitHub
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
