'use client';

import { motion } from 'motion/react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Navbar() {

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center md:justify-center py-4 bg-[#E9EEEC]">
      <motion.a
        href="/"
        className="text-2xl md:text-3xl ml-4 md:ml-0 uppercase text-green-800 font-bold"
        initial={{ opacity: 0, x:-50 }}
        animate={{ opacity: 1, x:0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{
          color: '#2F6B46',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
          letterSpacing: '0.05em',
        }}
      >
        Le duo du bistro
      </motion.a>
      <LanguageSwitcher />
    </nav>
  );
}