"use client"
import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from "@/context/LanguageContext";
import type { LandingProps } from "@/lib/types";
import Image from 'next/image';

export default function Landing({ data }: { data: LandingProps }) {
	const [isMuted, setIsMuted] = useState(true);
	const videoRef = useRef<HTMLVideoElement>(null);
	const { language } = useLanguage();
	const { image, ctaText, ctaBtnText, video } = data;

	// Handle video mute toggle
	const handleMuteToggle = () => {
		if (videoRef.current) {
			videoRef.current.muted = !videoRef.current.muted;
			setIsMuted(videoRef.current.muted);
		}
	};
	return (
		<div className="relative w-full h-screen overflow-clip">
			{/* fallback image */}
			<motion.div
				initial={{ opacity: 1 }}
				animate={{ opacity: 0 }}
				transition={{ duration: 1.5, delay: 1.5 }}
				className="absolute w-full h-full z-10">
				<Image
					src={image}
					width={1000}
					height={1000}
					alt="Maxim & Sondre"
					className="h-full w-full object-cover"
				/>
			</motion.div>
			<video
			ref={videoRef}
				className="absolute inset-0 w-full h-full object-cover"
				autoPlay
				loop
				muted
				playsInline
				preload={'auto'}
				controlsList={'nodownload'}
				disablePictureInPicture
			>
				<source src={video} type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			{/* overlay */}
			<div className="absolute inset-0 bg-black/40" />

			{/* landing content */}
			<motion.div
				className="relative z-10 flex flex-col items-center justify-center text-center mb-16 mx-auto lg:w-1/3 h-full"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<motion.h1
					className="text-6xl font-bold text-white whitespace-pre-line text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					{ctaText[language]}
				</motion.h1>
				<a href="mailto:duo@leduodubistro.no?subject=Booking">
					<motion.button
						className='
						px-4 py-2 
						transition duration-300
						mt-10 rounded-lg text-3xl mx-24 
						bg-white text-green-900 uppercase 
						hover:bg-green-900 hover:text-white'
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						{ctaBtnText[language]}
					</motion.button>
				</a>
			</motion.div>

			{/* mute button */}
			<motion.button
				className="absolute bottom-12 right-2 md:right-12 z-20 p-4 rounded-full bg-white/50 backdrop-blur-sm"
				onClick={handleMuteToggle}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				{isMuted ? (
					<img src="/volume-x.svg" alt="Muted" className="w-6 h-6" />
				) : (
					<img src="/volume-2.svg" alt="Unmuted" className="w-6 h-6" />
				)}
			</motion.button>
		</div>
	);
}