import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Layers } from 'lucide-react';
import LightRays from './LightRays';

const skillCategories = [
    {
        category: 'Frontend',
        icon: '🎨',
        color: 'from-blue-500 to-violet-500',
        skills: [
            { name: 'React', icon: '⚛️', level: 92 },
            { name: 'TypeScript', icon: '🔷', level: 88 },
            { name: 'Tailwind CSS', icon: '💨', level: 90 },
            { name: 'Next.js', icon: '▲', level: 82 },
            { name: 'HTML & CSS', icon: '🌐', level: 95 },
        ],
    },
    {
        category: 'Backend',
        icon: '⚙️',
        color: 'from-emerald-500 to-cyan-500',
        skills: [
            { name: 'Python', icon: '🐍', level: 90 },
            { name: 'FastAPI', icon: '⚡', level: 85 },
            { name: 'Node.js', icon: '🟢', level: 82 },
            { name: 'Express.js', icon: '🚂', level: 80 },
            { name: 'REST APIs', icon: '🔗', level: 92 },
        ],
    },
    {
        category: 'DevOps & Tools',
        icon: '🛠️',
        color: 'from-orange-500 to-rose-500',
        skills: [
            { name: 'Git & GitHub', icon: '🐙', level: 90 },
            { name: 'Docker', icon: '🐳', level: 75 },
            { name: 'Linux / Bash', icon: '🐧', level: 82 },
            { name: 'VS Code', icon: '💻', level: 95 },
            { name: 'Figma', icon: '🎯', level: 72 },
        ],
    },
];


const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Skills() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section id="skills" className="py-24 relative bg-dark-800/30">
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
            {/* bg decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary-500/5 blur-3xl" />
                <div className="absolute -bottom-20 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-6" ref={ref}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="section-badge">
                            <Layers size={13} />
                            skills
                        </div>
                        <h2 className="section-title">Technical Skills</h2>
                        <div className="section-divider" />
                        <p className="text-dark-300 max-w-xl">
                            A curated toolkit of technologies I use to build robust, scalable, and beautiful products.
                        </p>
                    </motion.div>

                    {/* Scrolling tech badges ticker */}

                    {/* Skill Categories */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skillCategories.map((category, catIndex) => (
                            <motion.div
                                key={category.category}
                                variants={itemVariants}
                                className="glass-card p-7"
                            >
                                {/* Category header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-lg shadow-lg`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="text-white font-bold text-lg">{category.category}</h3>
                                </div>

                                {/* Skills */}
                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skill.name} className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base">{skill.icon}</span>
                                                    <span className="text-dark-200 text-sm font-medium">{skill.name}</span>
                                                </div>
                                                <span className="text-primary-400 font-mono text-xs">{skill.level}%</span>
                                            </div>
                                            <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="skill-bar-fill"
                                                    initial={{ width: 0 }}
                                                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                                    transition={{
                                                        duration: 1.2,
                                                        delay: 0.3 + catIndex * 0.15 + skillIndex * 0.08,
                                                        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
}
