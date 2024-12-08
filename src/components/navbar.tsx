"use client";
import React from 'react';
import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <motion.nav
      className="flex items-center md:justify-center p-4 bg-[#E9EEEC] border-b border-gray-300"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        backgroundColor: "#E9EEEC",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      <motion.header
        className="text-2xl md:text-3xl uppercase text-green-800 font-bold mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ 
          color: "#2F6B46",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          letterSpacing: "0.05em"
        }}
      >
        Le duo du bistro
      </motion.header>
    </motion.nav>
  );
}