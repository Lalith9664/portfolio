import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import profilePic from './profile.png';
import LightRays from './LightRays';

// Typewriter hook — types through an array of strings sequentially
function useTypewriter(words: string[], speed = 100, pause = 500) {
    const [displayed, setDisplayed] = useState<string[]>(words.map(() => ''));
    const [done, setDone] = useState(false);

    useEffect(() => {
        let wordIndex = 0;
        let charIndex = 0;
        let timeout: ReturnType<typeof setTimeout>;

        const type = () => {
            if (wordIndex >= words.length) {
                setDone(true);
                return;
            }
            const currentWord = words[wordIndex];
            if (charIndex <= currentWord.length) {
                setDisplayed(prev => {
                    const next = [...prev];
                    next[wordIndex] = currentWord.slice(0, charIndex);
                    return next;
                });
                charIndex++;
                timeout = setTimeout(type, speed);
            } else {
                // Move to next word after a pause
                charIndex = 0;
                wordIndex++;
                timeout = setTimeout(type, pause);
            }
        };

        timeout = setTimeout(type, 400); // initial delay
        return () => clearTimeout(timeout);
    }, []);

    return { displayed, done };
}

const socialLinks = [
    { icon: Github, href: 'https://github.com/Lalith9664/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/lalith-kumar-2a124b331/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:[EMAIL_ADDRESS]', label: 'Email' },
];

const stats = [
    // { value: '2+', label: 'Years Exp.' },
    // { value: '15+', label: 'Projects' },
    // { value: '10+', label: 'Technologies' },
];
// Sub-component that renders the typed name
function NameTyped() {
    const { displayed, done } = useTypewriter(['Lalith', 'Kumar M'], 90, 180);
    return (
        <>
            <span className="text-white">{displayed[0]}</span>
            <br />
            <span className="gradient-text">
                {displayed[1]}
                {/* blinking cursor — visible only while typing */}
                {!done && (
                    <span className="inline-block w-[3px] h-[0.85em] ml-1 align-middle bg-primary-400 rounded-sm animate-[blink_0.75s_step-end_infinite]" />
                )}
            </span>
        </>
    );
}

export default function Hero() {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
            {/* Animated Background */}
            <div className="hero-bg" />
            <div className="absolute inset-0 grid-pattern opacity-100" />

            {/* Floating orbs */}
            <div className="absolute top-20 right-10 md:right-32 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl float-anim" />
            <div className="absolute bottom-20 left-10 md:left-20 w-56 h-56 bg-accent/5 rounded-full blur-3xl" style={{ animationDelay: '2s', animation: 'float 8s ease-in-out infinite' }} />

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="order-2 lg:order-1">
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="section-badge w-fit mb-6"
                        >
                            <span className="glow-dot" />
                            Available for opportunities
                        </motion.div>

                        {/* Greeting */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-dark-300 font-mono text-base mb-3"
                        >
                            Hi there, I'm
                        </motion.p>

                        {/* Name — typewriter */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-4"
                        >
                            <NameTyped />
                        </motion.h1>

                        {/* Role */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-primary-500 to-transparent" />
                            <span className="text-primary-300 font-mono font-medium text-lg">Full Stack Developer</span>
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-dark-300 text-lg leading-relaxed max-w-md mb-8"
                        >
                            I craft <span className="text-white font-medium">elegant digital experiences</span> — from pixel-perfect interfaces to scalable server architectures. Turning ideas into{' '}
                            <span className="gradient-text font-medium">production-ready code</span>.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-4 mb-10"
                        >
                            <motion.button
                                onClick={() => scrollToSection('projects')}
                                className="btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                id="hero-view-projects"
                            >
                                <Sparkles size={18} />
                                View Projects
                            </motion.button>
                            <motion.a
                                href="/resume.pdf"
                                className="btn-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                id="hero-download-resume"
                            >
                                <Download size={18} />
                                Download CV
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-center gap-4"
                        >
                            <span className="text-dark-400 text-sm font-mono">// connect</span>
                            <div className="flex gap-3">
                                {socialLinks.map(({ icon: Icon, href, label }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-10 h-10 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center text-dark-300 hover:text-primary-400 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all duration-200"
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Icon size={17} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Profile */}
                    <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-8">
                        {/* Profile Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                            className="relative float-anim"
                        >
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 via-accent to-violet-500 blur-xl opacity-30 scale-110" />

                            {/* Spinning border */}
                            <div className="profile-ring relative w-56 h-56 md:w-64 md:h-64">
                                <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-dark-700 z-10">
                                    <img
                                        src={profilePic}
                                        alt="Lalith Kumar - Full Stack Developer"
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                            </div>

                            {/* Tech badge floating elements */}
                            <motion.div
                                className="absolute -top-4 -right-4 glass-card px-3 py-2 flex items-center gap-2 shadow-xl"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <span className="text-lg">⚛️</span>
                                <span className="text-xs font-semibold text-white">React Dev</span>
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 -left-4 glass-card px-3 py-2 flex items-center gap-2 shadow-xl"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            >
                                <span className="text-lg">🐍</span>
                                <span className="text-xs font-semibold text-white">Python</span>
                            </motion.div>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-3 gap-4 w-full max-w-sm"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="glass-card p-4 text-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                >
                                    <div className="text-2xl font-black gradient-text">{stat.value}</div>
                                    <div className="text-dark-400 text-xs mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}
