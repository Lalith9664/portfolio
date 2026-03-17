import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Mail, Send, MapPin, Phone, Linkedin, Github, Twitter, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import LightRays from './LightRays';

const contactInfo = [
    { icon: Mail, label: 'Email', value: 'lalith8302@gmail.com', href: 'mailto:lalith8302@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'India', href: '#' },
    { icon: Phone, label: 'Phone', value: '+91 8778767644', href: 'tel:+918778767644' },
];

const socialLinks = [
    { icon: Github, href: 'https://github.com/Lalith9664/', label: 'GitHub', color: 'hover:text-white hover:border-white/30' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/lalith-kumar-2a124b331/', label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400/30' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-sky-400 hover:border-sky-400/30' },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Contact() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            const res = await fetch('http://localhost:8000/api/v1/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 4000);
            } else {
                // Parse error from FastAPI (422 validation errors or 4xx/5xx details)
                let msg = 'Something went wrong. Please try again.';
                try {
                    const data = await res.json();
                    if (Array.isArray(data?.detail)) {
                        // Pydantic validation errors — pick the first one
                        msg = data.detail.map((e: { msg: string }) =>
                            e.msg.replace(/^Value error, /, '')
                        ).join(' · ');
                    } else if (typeof data?.detail === 'string') {
                        msg = data.detail;
                    }
                } catch { /* use default msg */ }
                setErrorMsg(msg);
                setStatus('error');
                setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 5000);
            }
        } catch {
            setErrorMsg('Could not reach the server. Make sure the backend is running.');
            setStatus('error');
            setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 5000);
        }
    };

    return (
        <section id="contact" className="py-24 relative bg-dark-800/20">
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
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/4 right-0 w-56 h-56 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-6" ref={ref}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-16 text-center">
                        <div className="section-badge mx-auto w-fit">
                            <Mail size={13} />
                            contact
                        </div>
                        <h2 className="section-title">Get In Touch</h2>
                        <div className="section-divider mx-auto" />
                        <p className="text-dark-300 max-w-xl mx-auto">
                            Have a project in mind? I'd love to hear from you. Let's build something great together.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Left info */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-bold text-white mb-6">Let's work together</h3>
                                <p className="text-dark-300 text-sm leading-relaxed mb-8">
                                    I'm currently available for freelance projects, full-time roles, and exciting collaborations. Whether it's a startup idea, a complex platform, or a redesign — I'm in.
                                </p>

                                {/* Contact info */}
                                <div className="space-y-4 mb-8">
                                    {contactInfo.map(({ icon: Icon, label, value, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark-700/60 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-primary-500/15 border border-primary-500/25 flex items-center justify-center flex-shrink-0">
                                                <Icon size={16} className="text-primary-400" />
                                            </div>
                                            <div>
                                                <p className="text-dark-400 text-xs">{label}</p>
                                                <p className="text-white text-sm font-medium group-hover:text-primary-300 transition-colors">{value}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                {/* Social links */}
                                <div className="flex items-center gap-3">
                                    <span className="text-dark-400 text-xs font-mono">// social</span>
                                    {socialLinks.map(({ icon: Icon, href, label, color }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className={`w-10 h-10 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center text-dark-400 transition-all duration-200 ${color}`}
                                        >
                                            <Icon size={17} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact form */}
                        <motion.div variants={itemVariants} className="lg:col-span-3">
                            <div className="glass-card p-8">
                                <h3 className="text-lg font-bold text-white mb-6">Send a Message</h3>

                                <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        {/* Name */}
                                        <div className="space-y-2">
                                            <label className="text-dark-300 text-xs font-medium uppercase tracking-wider" htmlFor="contact-name">
                                                Name
                                            </label>
                                            <input
                                                id="contact-name"
                                                name="name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                className="w-full bg-dark-800/60 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-400 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                            />
                                        </div>
                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-dark-300 text-xs font-medium uppercase tracking-wider" htmlFor="contact-email">
                                                Email
                                            </label>
                                            <input
                                                id="contact-email"
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="your@email.com"
                                                className="w-full bg-dark-800/60 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-400 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone + Subject row */}
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <label className="text-dark-300 text-xs font-medium uppercase tracking-wider" htmlFor="contact-phone">
                                                Phone <span className="text-dark-500 normal-case font-normal">(optional)</span>
                                            </label>
                                            <input
                                                id="contact-phone"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+91 98765 43210"
                                                className="w-full bg-dark-800/60 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-400 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                            />
                                        </div>
                                        {/* Subject */}
                                        <div className="space-y-2">
                                            <label className="text-dark-300 text-xs font-medium uppercase tracking-wider" htmlFor="contact-subject">
                                                Subject
                                            </label>
                                            <input
                                                id="contact-subject"
                                                name="subject"
                                                type="text"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="What's this about?"
                                                className="w-full bg-dark-800/60 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-400 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <label className="text-dark-300 text-xs font-medium uppercase tracking-wider" htmlFor="contact-message">
                                            Message
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell me about your project..."
                                            className="w-full bg-dark-800/60 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-dark-400 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <motion.button
                                        type="submit"
                                        disabled={status === 'loading' || status === 'success'}
                                        className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                                        whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                                        whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                                        id="contact-submit"
                                    >
                                        {status === 'idle' && <><Send size={18} /> Send Message</>}
                                        {status === 'loading' && <><Loader size={18} className="animate-spin" /> Sending...</>}
                                        {status === 'success' && <><CheckCircle size={18} /> Message Sent!</>}
                                        {status === 'error' && <><AlertCircle size={18} /> Try Again</>}
                                    </motion.button>

                                    {status === 'error' && errorMsg && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm text-center"
                                        >
                                            ⚠️ {errorMsg}
                                        </motion.p>
                                    )}

                                    {status === 'success' && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-green-400 text-sm text-center"
                                        >
                                            🎉 Thanks! I'll get back to you within 24 hours.
                                        </motion.p>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
