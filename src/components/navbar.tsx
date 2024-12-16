// TypeScript
'use client';
import { motion } from 'motion/react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
export default function Navbar() {

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center py-4 bg-[#E9EEEC]">
      <LanguageSwitcher />
      <motion.a
        href="/"
        className="text-2xl md:text-3xl uppercase text-green-800 font-bold mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{
          color: '#2F6B46',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
          letterSpacing: '0.05em',
        }}
      >
        Le duo du bistro
      </motion.a>
    </nav>
  );
}