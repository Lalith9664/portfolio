import { Heart, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative border-t border-dark-700/50 bg-dark-900/50">
            <div className="max-w-6xl mx-auto px-6 py-5">
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
