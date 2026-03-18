import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Terminal } from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Update active section based on scroll position
            const sections = navLinks.map(l => l.href.replace('#', ''));
            for (const section of sections.reverse()) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                className="fixed z-50 transition-all duration-500 top-0 left-0 right-0 py-5"
                style={scrolled ? { background: 'transparent', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' } : { background: 'transparent' }}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
                        className="flex items-center gap-2.5 group cursor-pointer"
                        whileHover={{ scale: 1.03 }}
                    >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <Terminal size={18} className="text-white" />
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-white text-lg tracking-tight">lalith</span>
                            <span className="text-primary-400 font-mono text-lg">.dev</span>
                        </div>
                    </motion.a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${activeSection === link.href.replace('#', '')
                                    ? 'text-white'
                                    : 'text-dark-300 hover:text-white'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {activeSection === link.href.replace('#', '') && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-primary-500/20 rounded-lg border border-primary-500/30"
                                        transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* CTA + Hamburger */}
                    <div className="flex items-center gap-3">
                        <motion.a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                            className="hidden md:flex btn-primary py-2.5 px-5 text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Hire Me
                        </motion.a>

                        {/* Mobile Hamburger */}
                        <motion.button
                            className="md:hidden relative w-10 h-10 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center text-white"
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.9 }}
                            id="nav-hamburger"
                            aria-label="Toggle navigation"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X size={20} />
                                    </motion.span>
                                ) : (
                                    <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu size={20} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                        <motion.div
                            className="absolute top-0 right-0 h-full w-72 bg-dark-800 border-l border-dark-600 p-6 pt-20 flex flex-col gap-2"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-dark-600">
                                <Code2 size={18} className="text-primary-400" />
                                <span className="text-dark-300 text-sm font-mono">navigation.tsx</span>
                            </div>
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-base font-medium transition-colors ${activeSection === link.href.replace('#', '')
                                        ? 'bg-primary-500/15 text-primary-300 border border-primary-500/25'
                                        : 'text-dark-200 hover:bg-dark-700 hover:text-white'
                                        }`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <span className="text-primary-500 font-mono text-xs">{String(i + 1).padStart(2, '0')}.</span>
                                    {link.label}
                                </motion.button>
                            ))}
                            <div className="mt-auto">
                                <button
                                    onClick={() => handleNavClick('#contact')}
                                    className="btn-primary w-full justify-center mt-4"
                                >
                                    Hire Me
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
