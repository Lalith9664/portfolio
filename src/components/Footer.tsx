import { Terminal, Heart, Github, Linkedin, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavClick = (href: string) => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="relative border-t border-dark-700/50 bg-dark-900/50">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center shadow-lg">
                                <Terminal size={18} className="text-white" />
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-white text-lg">lalith</span>
                                <span className="text-primary-400 font-mono text-lg">.dev</span>
                            </div>
                        </div>
                        <p className="text-dark-400 text-sm leading-relaxed">
                            Full Stack Developer crafting elegant digital experiences from India.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-dark-700 border border-dark-600 flex items-center justify-center text-dark-400 hover:text-white hover:border-dark-400 transition-all">
                                <Github size={16} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-dark-700 border border-dark-600 flex items-center justify-center text-dark-400 hover:text-blue-400 hover:border-blue-400/40 transition-all">
                                <Linkedin size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.map(link => (
                                <li key={link.href}>
                                    <button
                                        onClick={() => handleNavClick(link.href)}
                                        className="text-dark-400 hover:text-primary-300 text-sm transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Status */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Status</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="glow-dot" />
                                <span className="text-dark-300 text-sm">Open to work</span>
                            </div>
                            <div className="bg-dark-800 rounded-xl p-4 border border-dark-600 font-mono text-xs">
                                <p className="text-green-400">$ status --check</p>
                                <p className="text-dark-300 mt-1">→ Available: <span className="text-white">Yes</span></p>
                                <p className="text-dark-300">→ Location: <span className="text-white">India</span></p>
                                <p className="text-dark-300">→ Mode: <span className="text-primary-300">Remote/Hybrid</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent mb-6" />

                {/* Bottom */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-dark-400 text-sm flex items-center gap-1.5">
                        Made with <Heart size={13} className="text-rose-400 fill-rose-400" /> by{' '}
                        <span className="text-primary-400 font-medium">Lalith Kumar</span>
                        <span className="text-dark-600 mx-1">·</span>
                        <span>{new Date().getFullYear()}</span>
                    </p>

                    <motion.button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-500/40 transition-all"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Scroll to top"
                        id="footer-scroll-top"
                    >
                        <ArrowUp size={17} />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
