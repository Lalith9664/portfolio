import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { User, MapPin, Coffee, Zap, BookOpen, HeartHandshake } from 'lucide-react';

const highlights = [
    { icon: MapPin, label: 'Location', value: 'India' },
    { icon: Coffee, label: 'Status', value: 'Open to Work' },
    { icon: BookOpen, label: 'Education', value: 'B.Tech CSE' },
    { icon: HeartHandshake, label: 'Interests', value: 'Open Source' },
];

const funFacts = [
    { emoji: '🚀', text: 'Shipped 15+ production projects' },
    { emoji: '☕', text: 'Fueled by coffee & curiosity' },
    { emoji: '🌙', text: 'Night-owl coder' },
    { emoji: '🌍', text: 'Remote-first mindset' },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="about" className="py-24 relative">
            {/* Dot-grid BG accent */}
            <div className="absolute top-0 right-0 w-96 h-96 dot-grid opacity-40 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6" ref={ref}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="section-badge">
                            <User size={13} />
                            about_me.json
                        </div>
                        <h2 className="section-title">Who I Am</h2>
                        <div className="section-divider" />
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left - Bio */}
                        <div className="space-y-8">
                            <motion.div variants={itemVariants} className="glass-card p-8">
                                {/* Code comment decoration */}
                                <p className="text-primary-400 font-mono text-sm mb-4">// about_me.tsx</p>

                                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                                    Passionate developer, lifelong learner, and problem solver.
                                </h3>

                                <div className="space-y-4 text-dark-300 leading-relaxed">
                                    <p>
                                        Hi! I'm <span className="text-white font-semibold">Lalith Kumar</span>, a passionate Full Stack Developer with a love for building things that live on the internet. I specialize in creating responsive, performant, and accessible web applications.
                                    </p>
                                    <p>
                                        With expertise in <span className="text-primary-300 font-medium">React, TypeScript, Python, and FastAPI</span>, I bridge the gap between design and engineering. I enjoy the full spectrum of web development — from crafting intuitive UIs to architecting efficient backend systems.
                                    </p>
                                    <p>
                                        When I'm not writing code, I'm exploring the latest in web technologies, contributing to open source, or designing systems that scale.
                                    </p>
                                </div>

                                {/* Terminal-style quote */}
                                <div className="mt-6 bg-dark-900/60 rounded-xl p-4 border border-dark-600 font-mono">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                        <span className="text-dark-400 text-xs ml-2">terminal</span>
                                    </div>
                                    <p className="text-green-400 text-sm">$ echo $MY_PHILOSOPHY</p>
                                    <p className="text-dark-200 text-sm mt-1">"Clean code, elegant design, scalable architecture."</p>
                                    <p className="text-primary-400 text-sm mt-1 animate-pulse">▋</p>
                                </div>
                            </motion.div>

                            {/* Highlights Grid */}
                            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                                {highlights.map(({ icon: Icon, label, value }) => (
                                    <div
                                        key={label}
                                        className="glass-card p-4 flex items-center gap-3"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-primary-500/15 border border-primary-500/25 flex items-center justify-center flex-shrink-0">
                                            <Icon size={16} className="text-primary-400" />
                                        </div>
                                        <div>
                                            <p className="text-dark-400 text-xs">{label}</p>
                                            <p className="text-white text-sm font-medium">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right - Fun Facts & Values */}
                        <div className="space-y-8">
                            {/* Fun Facts */}
                            <motion.div variants={itemVariants} className="glass-card p-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <Zap size={18} className="text-primary-400" />
                                    <h3 className="text-lg font-bold text-white">Fun Facts</h3>
                                </div>
                                <div className="space-y-4">
                                    {funFacts.map((fact, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex items-center gap-4 p-3 rounded-xl bg-dark-800/40 border border-dark-600 hover:border-primary-500/30 transition-colors"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={inView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                        >
                                            <span className="text-2xl">{fact.emoji}</span>
                                            <span className="text-dark-200 text-sm">{fact.text}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Values */}
                            <motion.div variants={itemVariants} className="glass-card p-8">
                                <h3 className="text-lg font-bold text-white mb-6">What I Value</h3>
                                <div className="space-y-4">
                                    {[
                                        { title: 'User Experience First', desc: 'Every pixel matters. I design with empathy and build for real users.', pct: 95 },
                                        { title: 'Clean, Readable Code', desc: 'Code is read more than written. Clarity > cleverness.', pct: 92 },
                                        { title: 'Continuous Learning', desc: 'Technology evolves. So do I. Always exploring, always growing.', pct: 98 },
                                    ].map((val, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-white text-sm font-semibold">{val.title}</p>
                                                    <p className="text-dark-400 text-xs">{val.desc}</p>
                                                </div>
                                                <span className="text-primary-400 text-xs font-mono ml-4">{val.pct}%</span>
                                            </div>
                                            <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="skill-bar-fill"
                                                    initial={{ width: 0 }}
                                                    animate={inView ? { width: `${val.pct}%` } : { width: 0 }}
                                                    transition={{ duration: 1.5, delay: 0.3 + i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
