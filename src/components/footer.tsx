"use client"
import { motion } from 'motion/react';

interface FooterProps {
  data: {
    instagramURL: string;
    cellNumber: number;
    email: string;
    address: string;
  };
}

export default function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-emerald-800 text-white py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl text-center font-semibold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        LE DUO DU BISTRO
      </motion.h2>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <motion.div 
            className="flex flex-col text-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="mb-2">Telefon: {data.cellNumber}</p>
            <p className="mb-2">Epost:
              <span>
                <a href={`mailto:${data.email}`} className="mb-2 hover:underline decoration-2 transition-colors cursor-pointer">
                  {" "}{data.email}
                </a>
              </span>
            </p>
            <p className="mb-2">{data.address}</p>
          </motion.div>
          <motion.a 
            href={data.instagramURL}
            className="p-4 border-2 rounded-lg flex items-center gap-2 
              hover:bg-white hover:text-emerald-700 hover:border-white
              transition-all duration-300 ease-in-out"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>Instagram</span>
          </motion.a>
        </div>
      </div>
      <motion.div 
        className="mt-8 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="text-sm text-white opacity-70 text-center">
          <p>© {currentYear} Le Duo Du Bistro</p>
          <p className="mt-1">
            Built by <a href="https://sanan.no" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Sanan Maarouf</a>
          </p>
        </div>
      </motion.div>
    </motion.footer>
  );
}